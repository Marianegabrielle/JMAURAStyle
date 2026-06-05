import { addDays } from '../core/date';

const imageParams = 'auto=format&fit=crop&w=640&h=840&q=80';
const photoUrl = (id) => `https://images.unsplash.com/${id}?${imageParams}`;

export const DEFAULT_PROFILE_AVATAR = '/profile.png';

export const categoryImageSets = {
  tops: [
    photoUrl('photo-1515886657613-9f3515b0c78f'),
    photoUrl('photo-1529139574466-a303027c1d8b'),
    photoUrl('photo-1503342217505-b0a15ec3261c'),
    photoUrl('photo-1524504388940-b1c1722653e1'),
    photoUrl('photo-1539109136881-3be0616acf4b'),
  ],
  bottoms: [
    photoUrl('photo-1541099649105-f69ad21f3246'),
    photoUrl('photo-1539008835657-9e8e9680c956'),
    photoUrl('photo-1495385794356-15371f348c31'),
    photoUrl('photo-1545291730-faff8ca1d4b0'),
    photoUrl('photo-1542060748-10c28b62716f'),
  ],
  dresses: [
    photoUrl('photo-1483985988355-763728e1935b'),
    photoUrl('photo-1515372039744-b8f02a3ae446'),
    photoUrl('photo-1469334031218-e382a71b716b'),
    photoUrl('photo-1496747611176-843222e1e57c'),
    photoUrl('photo-1509631179647-0177331693ae'),
  ],
  shoes: [
    photoUrl('photo-1543163521-1bf539c55dd2'),
    photoUrl('photo-1516762689617-e1cffcef479d'),
    photoUrl('photo-1487412720507-e7ab37603c6f'),
    photoUrl('photo-1551232864-3f0890e580d9'),
    photoUrl('photo-1550614000-4895a10e1bfd'),
  ],
  outerwear: [
    photoUrl('photo-1520975954732-35dd22299614'),
    photoUrl('photo-1539109136881-3be0616acf4b'),
    photoUrl('photo-1495385794356-15371f348c31'),
    photoUrl('photo-1542060748-10c28b62716f'),
    photoUrl('photo-1529139574466-a303027c1d8b'),
  ],
  accessories: [
    photoUrl('photo-1584917865442-de89df76afd3'),
    photoUrl('photo-1545291730-faff8ca1d4b0'),
    photoUrl('photo-1516762689617-e1cffcef479d'),
    photoUrl('photo-1551232864-3f0890e580d9'),
    photoUrl('photo-1487412720507-e7ab37603c6f'),
  ],
};

export const categoryImages = {
  tops: categoryImageSets.tops[0],
  bottoms: categoryImageSets.bottoms[0],
  dresses: categoryImageSets.dresses[0],
  shoes: categoryImageSets.shoes[0],
  outerwear: categoryImageSets.outerwear[0],
  accessories: categoryImageSets.accessories[0],
};

export const dressImages = categoryImageSets.dresses;

export const outfitImages = [
  photoUrl('photo-1529139574466-a303027c1d8b'),
  photoUrl('photo-1503342217505-b0a15ec3261c'),
  photoUrl('photo-1524504388940-b1c1722653e1'),
  photoUrl('photo-1539109136881-3be0616acf4b'),
  photoUrl('photo-1539008835657-9e8e9680c956'),
  photoUrl('photo-1495385794356-15371f348c31'),
  photoUrl('photo-1545291730-faff8ca1d4b0'),
  photoUrl('photo-1542060748-10c28b62716f'),
  photoUrl('photo-1516762689617-e1cffcef479d'),
  photoUrl('photo-1487412720507-e7ab37603c6f'),
  photoUrl('photo-1551232864-3f0890e580d9'),
  photoUrl('photo-1550614000-4895a10e1bfd'),
  photoUrl('photo-1483985988355-763728e1935b'),
  photoUrl('photo-1515372039744-b8f02a3ae446'),
  photoUrl('photo-1469334031218-e382a71b716b'),
  photoUrl('photo-1496747611176-843222e1e57c'),
  photoUrl('photo-1509631179647-0177331693ae'),
  photoUrl('photo-1515886657613-9f3515b0c78f'),
  photoUrl('photo-1541099649105-f69ad21f3246'),
  photoUrl('photo-1584917865442-de89df76afd3'),
];

export function getWardrobeImage(category, index = 0) {
  const images = categoryImageSets[category] || categoryImageSets.tops;
  return images[index % images.length];
}

export function getOutfitImage(index = 0) {
  return outfitImages[index % outfitImages.length];
}

export function isGeneratedStyleImage(image) {
  const generatedImages = [
    ...Object.values(categoryImageSets).flat(),
    ...outfitImages,
  ];

  return generatedImages.some((url) => image?.startsWith(url.split('?')[0]));
}

const catalog = [
  ['tops', 'Relaxed Linen Shirt', 'Ivory', 'COS', 'Spring', 'Office'],
  ['tops', 'Soft Knit Tee', 'Sage', 'Uniqlo', 'Summer', 'Weekend'],
  ['tops', 'Structured Blouse', 'White', 'Aritzia', 'Autumn', 'Event'],
  ['tops', 'Minimal Polo', 'Black', 'Mango', 'All Season', 'Daily'],
  ['tops', 'Silk Wrap Top', 'Pearl', 'Sezane', 'Event', 'Event'],
  ['bottoms', 'Tailored Trousers', 'Navy', 'Massimo Dutti', 'All Season', 'Office'],
  ['bottoms', 'Wide Leg Denim', 'Mid Blue', 'Zara', 'All Season', 'Weekend'],
  ['bottoms', 'Pleated Skirt', 'Stone', 'Everlane', 'Spring', 'Office'],
  ['bottoms', 'Fluid Maxi Skirt', 'Olive', 'COS', 'Summer', 'Travel'],
  ['bottoms', 'Tapered Pant', 'Chocolate', 'Aritzia', 'Autumn', 'Daily'],
  ['dresses', 'Column Dress', 'Black', 'Sezane', 'Event', 'Event'],
  ['dresses', 'Wrap Midi Dress', 'Burgundy', 'Mango', 'Spring', 'Office'],
  ['dresses', 'Shirt Dress', 'White', 'Everlane', 'Summer', 'Daily'],
  ['dresses', 'Satin Slip Dress', 'Champagne', 'Aritzia', 'Event', 'Event'],
  ['dresses', 'Knit Midi Dress', 'Sage', 'Uniqlo', 'Autumn', 'Weekend'],
  ['shoes', 'Leather Loafers', 'Black', 'Massimo Dutti', 'All Season', 'Office'],
  ['shoes', 'Minimal Sneakers', 'White', 'Adidas', 'All Season', 'Daily'],
  ['shoes', 'Pointed Heels', 'Nude', 'Zara', 'Event', 'Event'],
  ['shoes', 'Suede Boots', 'Cocoa', 'Everlane', 'Autumn', 'Weekend'],
  ['shoes', 'Sandals', 'Tan', 'Mango', 'Summer', 'Travel'],
  ['outerwear', 'Trench Coat', 'Stone', 'COS', 'Spring', 'Office'],
  ['outerwear', 'Wool Blazer', 'Navy', 'Massimo Dutti', 'All Season', 'Office'],
  ['outerwear', 'Quilted Jacket', 'Olive', 'Uniqlo', 'Winter', 'Weekend'],
  ['outerwear', 'Cropped Cardigan', 'Ivory', 'Aritzia', 'Autumn', 'Daily'],
  ['outerwear', 'Leather Jacket', 'Black', 'Zara', 'Event', 'Event'],
  ['accessories', 'Mini Tote', 'Chocolate', 'Everlane', 'All Season', 'Daily'],
  ['accessories', 'Gold Hoops', 'Gold', 'Sezane', 'All Season', 'Event'],
  ['accessories', 'Silk Scarf', 'Pearl', 'Aritzia', 'Spring', 'Office'],
  ['accessories', 'Crossbody Bag', 'Tan', 'Mango', 'Travel', 'Travel'],
  ['accessories', 'Leather Belt', 'Black', 'Massimo Dutti', 'All Season', 'Office'],
];

function id(prefix, index) {
  return `${prefix}-${String(index + 1).padStart(3, '0')}`;
}

function buildClothing(index) {
  const [category, name, color, brand, season, occasion] = catalog[index % catalog.length];
  return {
    id: id('clothing', index),
    userId: 'user-stylevault',
    name: `${name} ${index + 1}`,
    category,
    color,
    brand,
    season,
    occasion,
    wearCount: (index * 3) % 17 + 1,
    lastWorn: addDays(new Date(), -(index % 20)).toISOString(),
    image: getWardrobeImage(category, index),
    favorite: index % 5 === 0,
    notes: 'Mock wardrobe item for StyleVault.',
  };
}

function buildOutfit(index, wardrobe) {
  const top = wardrobe.find((item) => item.category === 'tops' && item.id.endsWith(String((index % 5) + 1).padStart(3, '0'))) || wardrobe.find((item) => item.category === 'tops');
  const bottom = wardrobe.find((item) => item.category === 'bottoms' && item.id.endsWith(String((index % 5) + 1).padStart(3, '0'))) || wardrobe.find((item) => item.category === 'bottoms');
  const shoes = wardrobe.find((item) => item.category === 'shoes' && item.id.endsWith(String((index % 5) + 1).padStart(3, '0'))) || wardrobe.find((item) => item.category === 'shoes');
  const outerwear = wardrobe.find((item) => item.category === 'outerwear' && item.id.endsWith(String((index % 5) + 1).padStart(3, '0')));
  const accessories = wardrobe.filter((item) => item.category === 'accessories').slice(index % 3, (index % 3) + 2).map((item) => item.id);

  return {
    id: id('outfit', index),
    userId: 'user-stylevault',
    name: ['City Edit', 'Soft Tailoring', 'Weekend Layering', 'Quiet Luxury', 'Commute Uniform'][index % 5] + ` ${index + 1}`,
    eventType: ['casual', 'work', 'date', 'party', 'travel'][index % 5],
    generatedBy: index % 2 === 0 ? 'ai' : 'manual',
    usageCount: (index * 2) % 16 + 1,
    lastWorn: addDays(new Date(), -(index % 12)).toISOString(),
    weatherDesc: ['Clear and cool', 'Light breeze', 'Warm and bright', 'Cloudy and fresh'][index % 4],
    notes: 'Balanced silhouette with a calm, elevated palette.',
    itemIds: { top: top?.id || null, bottom: bottom?.id || null, shoes: shoes?.id || null, outerwear: outerwear?.id || null, accessories },
    coverImage: getOutfitImage(index),
  };
}

function buildPlannerEntries(outfits) {
  const today = new Date();
  return Array.from({ length: 12 }, (_, index) => ({
    id: id('plan', index),
    date: addDays(today, index - 3).toISOString(),
    outfitId: outfits[index % outfits.length].id,
    note: index % 2 === 0 ? 'Morning meeting, keep layers light.' : 'Dinner after work, add accessories.',
  }));
}

export function createMockState() {
  const wardrobe = Array.from({ length: 54 }, (_, index) => buildClothing(index));
  const outfits = Array.from({ length: 20 }, (_, index) => buildOutfit(index, wardrobe));

  return {
    onboardingCompleted: false,
    auth: { status: 'guest', user: { id: 'user-stylevault', email: 'guest@stylevault.local', fullName: 'Guest Editor' } },
    profile: {
      id: 'user-stylevault',
      email: 'guest@stylevault.local',
      fullName: 'Guest Editor',
      city: 'Yaounde',
       avatar: '/profile.png',
      bio: 'A modern wardrobe planner for editorial outfits, weekly scheduling, and usage insights.',
      styleGoal: 'Build a timeless capsule wardrobe',
    },
    wardrobe,
    outfits,
    planner: {
      selectedDate: new Date().toISOString(),
      entries: buildPlannerEntries(outfits),
      notes: 'Rotate neutral layers on weekdays and add a statement accessory on weekends.',
    },
    settings: { appearance: 'Light', notifications: true, privacy: 'Private', analytics: true, reminderTime: '08:00' },
  };
}
