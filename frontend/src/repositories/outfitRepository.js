import { findClothingById } from './wardrobeRepository';
import { getOutfitImage } from './mockData';

export function addOutfitItem(payload, userId) {
  const createdAt = Date.now();

  return {
    id: `outfit-${createdAt}`,
    userId,
    name: payload.name,
    eventType: payload.eventType,
    generatedBy: payload.generatedBy || 'manual',
    usageCount: payload.usageCount || 0,
    lastWorn: new Date().toISOString(),
    weatherDesc: payload.weatherDesc || '',
    notes: payload.notes || '',
    itemIds: {
      dress: null,
      top: null,
      bottom: null,
      shoes: null,
      outerwear: null,
      accessories: [],
      ...(payload.itemIds || {}),
    },
    coverImage: payload.coverImage || getOutfitImage(createdAt),
  };
}

export function updateOutfitItem(items, id, changes) {
  return items.map((item) => (item.id === id ? { ...item, ...changes } : item));
}

export function deleteOutfitItem(items, id) {
  return items.filter((item) => item.id !== id);
}

export function getOutfitSummary(outfit, wardrobe) {
  const ids = outfit.itemIds || {};
  const items = [
    findClothingById(wardrobe, ids.dress),
    findClothingById(wardrobe, ids.top),
    findClothingById(wardrobe, ids.bottom),
    findClothingById(wardrobe, ids.shoes),
    findClothingById(wardrobe, ids.outerwear),
    ...(ids.accessories || []).map((itemId) => findClothingById(wardrobe, itemId)),
  ].filter(Boolean);

  return {
    ...outfit,
    items,
    itemsLabel: items.map((item) => item.name).slice(0, 3).join(' + '),
  };
}
