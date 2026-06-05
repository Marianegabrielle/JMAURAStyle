import { getWardrobeImage } from './mockData';

export function addClothingItem(payload, userId) {
  const createdAt = Date.now();

  return {
    id: `clothing-${createdAt}`,
    userId,
    name: payload.name,
    category: payload.category,
    color: payload.color,
    brand: payload.brand,
    season: payload.season,
    occasion: payload.occasion,
    wearCount: payload.wearCount || 0,
    lastWorn: new Date().toISOString(),
    image: payload.image || getWardrobeImage(payload.category, createdAt),
    favorite: false,
    notes: payload.notes || '',
  };
}

export function updateClothingItem(items, id, changes) {
  return items.map((item) => (item.id === id ? { ...item, ...changes } : item));
}

export function deleteClothingItem(items, id) {
  return items.filter((item) => item.id !== id);
}

export function findClothingById(items, id) {
  return items.find((item) => item.id === id) || null;
}
