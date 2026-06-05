import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import { createMockState, DEFAULT_PROFILE_AVATAR, getOutfitImage, getWardrobeImage, isGeneratedStyleImage } from '../repositories/mockData';
import { addClothingItem, deleteClothingItem, updateClothingItem } from '../repositories/wardrobeRepository';
import { addOutfitItem, deleteOutfitItem, updateOutfitItem } from '../repositories/outfitRepository';
import { scheduleOutfitForDate, updatePlannerNote } from '../repositories/plannerRepository';
import { updateProfileRecord } from '../repositories/profileRepository';
import { updateSettingsRecord } from '../repositories/settingsRepository';

const STORAGE_KEY = 'stylevault.app.state.v1';
const AppContext = createContext(null);
const MOCK_WARDROBE_NOTE = 'Mock wardrobe item for StyleVault.';
const MOCK_OUTFIT_NOTE = 'Balanced silhouette with a calm, elevated palette.';

function usesMissingWardrobeAsset(image) {
  return !image || image.startsWith('/assets/wardrobe/');
}

function usesMissingProfileImage(image) {
  return !image || image.startsWith('/assets/wardrobe/');
}

function shouldRefreshWardrobeImage(item) {
  return usesMissingWardrobeAsset(item.image) || (
    item.notes === MOCK_WARDROBE_NOTE && isGeneratedStyleImage(item.image)
  );
}

function shouldRefreshOutfitCover(outfit) {
  return usesMissingWardrobeAsset(outfit.coverImage) || (
    outfit.notes === MOCK_OUTFIT_NOTE && isGeneratedStyleImage(outfit.coverImage)
  );
}

function withWebImages(state) {
  const profile = usesMissingProfileImage(state.profile?.avatar)
    ? { ...state.profile, avatar: DEFAULT_PROFILE_AVATAR }
    : state.profile;

  const wardrobe = (state.wardrobe || []).map((item, index) => (
    shouldRefreshWardrobeImage(item)
      ? { ...item, image: getWardrobeImage(item.category, index) }
      : item
  ));

  const outfits = (state.outfits || []).map((outfit, index) => {
    if (!shouldRefreshOutfitCover(outfit)) {
      return outfit;
    }

    return { ...outfit, coverImage: getOutfitImage(index) };
  });

  return {
    ...state,
    profile,
    auth: {
      ...state.auth,
      user: { ...(state.auth?.user || {}), ...profile },
    },
    wardrobe,
    outfits,
  };
}

function hydrateState() {
  const seed = createMockState();

  if (typeof window === 'undefined') {
    return withWebImages(seed);
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return withWebImages(seed);

    const saved = JSON.parse(raw);
    return withWebImages({
      ...seed,
      ...saved,
      auth: { ...seed.auth, ...(saved.auth || {}) },
      profile: { ...seed.profile, ...(saved.profile || {}) },
      settings: { ...seed.settings, ...(saved.settings || {}) },
      planner: { ...seed.planner, ...(saved.planner || {}) },
    });
  } catch {
    return withWebImages(seed);
  }
}

function reducer(state, action) {
  switch (action.type) {
    case 'onboarding/complete':
      return { ...state, onboardingCompleted: true };
    case 'auth/login':
      return {
        ...state,
        auth: { status: 'authenticated', user: { ...state.profile, ...action.payload } },
      };
    case 'auth/register':
      return {
        ...state,
        auth: { status: 'authenticated', user: { ...state.profile, ...action.payload } },
        onboardingCompleted: true,
      };
    case 'auth/guest':
      return {
        ...state,
        auth: { status: 'guest', user: { ...state.profile, email: 'guest@stylevault.local', fullName: 'Guest Editor' } },
      };
    case 'auth/logout':
      return {
        ...state,
        auth: { status: 'guest', user: { ...state.profile, email: 'guest@stylevault.local', fullName: 'Guest Editor' } },
      };
    case 'profile/update': {
      const profile = updateProfileRecord(state.profile, action.payload);
      return {
        ...state,
        profile,
        auth: { ...state.auth, user: { ...state.auth.user, ...profile } },
      };
    }
    case 'settings/update':
      return { ...state, settings: updateSettingsRecord(state.settings, action.payload) };
    case 'wardrobe/add':
      return { ...state, wardrobe: [addClothingItem(action.payload, state.profile.id), ...state.wardrobe] };
    case 'wardrobe/update':
      return { ...state, wardrobe: updateClothingItem(state.wardrobe, action.payload.id, action.payload.changes) };
    case 'wardrobe/delete':
      return { ...state, wardrobe: deleteClothingItem(state.wardrobe, action.payload.id) };
    case 'outfit/add':
      return { ...state, outfits: [addOutfitItem(action.payload, state.profile.id), ...state.outfits] };
    case 'outfit/update':
      return { ...state, outfits: updateOutfitItem(state.outfits, action.payload.id, action.payload.changes) };
    case 'outfit/delete':
      return {
        ...state,
        outfits: deleteOutfitItem(state.outfits, action.payload.id),
        planner: { ...state.planner, entries: state.planner.entries.filter((entry) => entry.outfitId !== action.payload.id) },
      };
    case 'planner/schedule':
      return { ...state, planner: scheduleOutfitForDate(state.planner, action.payload) };
    case 'planner/note':
      return { ...state, planner: updatePlannerNote(state.planner, action.payload) };
    case 'planner/select':
      return { ...state, planner: { ...state.planner, selectedDate: action.payload } };
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, hydrateState);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const value = useMemo(() => ({
    state,
    actions: {
      completeOnboarding: () => dispatch({ type: 'onboarding/complete' }),
      login: (payload) => dispatch({ type: 'auth/login', payload }),
      register: (payload) => dispatch({ type: 'auth/register', payload }),
      continueAsGuest: () => dispatch({ type: 'auth/guest' }),
      logout: () => dispatch({ type: 'auth/logout' }),
      updateProfile: (payload) => dispatch({ type: 'profile/update', payload }),
      updateSettings: (payload) => dispatch({ type: 'settings/update', payload }),
      addClothing: (payload) => dispatch({ type: 'wardrobe/add', payload }),
      updateClothing: (payload) => dispatch({ type: 'wardrobe/update', payload }),
      deleteClothing: (payload) => dispatch({ type: 'wardrobe/delete', payload }),
      addOutfit: (payload) => dispatch({ type: 'outfit/add', payload }),
      updateOutfit: (payload) => dispatch({ type: 'outfit/update', payload }),
      deleteOutfit: (payload) => dispatch({ type: 'outfit/delete', payload }),
      scheduleOutfit: (payload) => dispatch({ type: 'planner/schedule', payload }),
      updatePlannerNote: (payload) => dispatch({ type: 'planner/note', payload }),
      selectPlannerDate: (payload) => dispatch({ type: 'planner/select', payload }),
    },
  }), [state]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
