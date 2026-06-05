import React, { useState } from 'react';
import { useApp } from '../app/AppState';
import Button from '../components/Button';
import { CLOTHING_SEASONS, WARDROBE_CATEGORIES } from '../core/constants';

const categories = WARDROBE_CATEGORIES.filter((category) => category !== 'all');
const initialForm = {
  name: '',
  category: 'dresses',
  color: '',
  brand: '',
  season: 'All Season',
  occasion: 'Daily',
  image: '',
};

export default function Wardrobe() {
  const { state, actions } = useApp();
  const [form, setForm] = useState(initialForm);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const visibleItems = state.wardrobe.filter((item) => (
    selectedCategory === 'all' || item.category === selectedCategory
  ));

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const name = form.name.trim();
    if (!name) return;

    actions.addClothing({
      name,
      category: form.category,
      color: form.color.trim() || 'Unspecified',
      brand: form.brand.trim() || 'Personal Closet',
      season: form.season,
      occasion: form.occasion.trim() || 'Daily',
      image: form.image.trim(),
    });
    setForm(initialForm);
  }

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-[#E8DCD1] to-[#BCAAA4] bg-clip-text text-transparent">
          My Wardrobe ({state.wardrobe.length})
        </h2>
      </div>

      {/* Add Item Form */}
      <form onSubmit={handleSubmit} className="p-6 bg-[#3E2723]/60 backdrop-blur-sm rounded-2xl border border-[#5D4037] shadow-xl space-y-5 transition-all duration-300 hover:border-[#D4A373]/30">
        <h3 className="text-lg font-semibold text-[#D4A373] flex items-center gap-2">
          <span>➕</span> Add New Item
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <label className="block">
            <span className="block text-sm font-medium text-[#BCAAA4] mb-1">Item name</span>
            <input
              type="text"
              value={form.name}
              onChange={(event) => updateField('name', event.target.value)}
              className="w-full rounded-lg border border-[#5D4037] bg-[#4E342E]/50 px-4 py-2.5 text-sm text-[#E8DCD1] placeholder-[#8D6E63] focus:outline-none focus:ring-2 focus:ring-[#D4A373] focus:border-transparent transition-all"
              placeholder="e.g., Satin evening dress"
              required
            />
          </label>

          <label className="block">
            <span className="block text-sm font-medium text-[#BCAAA4] mb-1">Category</span>
            <select
              value={form.category}
              onChange={(event) => updateField('category', event.target.value)}
              className="w-full rounded-lg border border-[#5D4037] bg-[#4E342E]/50 px-4 py-2.5 text-sm text-[#E8DCD1] focus:outline-none focus:ring-2 focus:ring-[#D4A373] focus:border-transparent"
            >
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="block text-sm font-medium text-[#BCAAA4] mb-1">Color</span>
            <input
              type="text"
              value={form.color}
              onChange={(event) => updateField('color', event.target.value)}
              className="w-full rounded-lg border border-[#5D4037] bg-[#4E342E]/50 px-4 py-2.5 text-sm text-[#E8DCD1] placeholder-[#8D6E63] focus:outline-none focus:ring-2 focus:ring-[#D4A373] focus:border-transparent"
              placeholder="e.g., Black"
            />
          </label>

          <label className="block">
            <span className="block text-sm font-medium text-[#BCAAA4] mb-1">Brand</span>
            <input
              type="text"
              value={form.brand}
              onChange={(event) => updateField('brand', event.target.value)}
              className="w-full rounded-lg border border-[#5D4037] bg-[#4E342E]/50 px-4 py-2.5 text-sm text-[#E8DCD1] placeholder-[#8D6E63] focus:outline-none focus:ring-2 focus:ring-[#D4A373] focus:border-transparent"
              placeholder="e.g., Zara"
            />
          </label>

          <label className="block">
            <span className="block text-sm font-medium text-[#BCAAA4] mb-1">Season</span>
            <select
              value={form.season}
              onChange={(event) => updateField('season', event.target.value)}
              className="w-full rounded-lg border border-[#5D4037] bg-[#4E342E]/50 px-4 py-2.5 text-sm text-[#E8DCD1] focus:outline-none focus:ring-2 focus:ring-[#D4A373] focus:border-transparent"
            >
              {CLOTHING_SEASONS.map((season) => (
                <option key={season} value={season}>{season}</option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="block text-sm font-medium text-[#BCAAA4] mb-1">Occasion</span>
            <input
              type="text"
              value={form.occasion}
              onChange={(event) => updateField('occasion', event.target.value)}
              className="w-full rounded-lg border border-[#5D4037] bg-[#4E342E]/50 px-4 py-2.5 text-sm text-[#E8DCD1] placeholder-[#8D6E63] focus:outline-none focus:ring-2 focus:ring-[#D4A373] focus:border-transparent"
              placeholder="e.g., Daily, Party"
            />
          </label>
        </div>

        <label className="block">
          <span className="block text-sm font-medium text-[#BCAAA4] mb-1">Image URL</span>
          <input
            type="url"
            value={form.image}
            onChange={(event) => updateField('image', event.target.value)}
            className="w-full rounded-lg border border-[#5D4037] bg-[#4E342E]/50 px-4 py-2.5 text-sm text-[#E8DCD1] placeholder-[#8D6E63] focus:outline-none focus:ring-2 focus:ring-[#D4A373] focus:border-transparent"
            placeholder="Leave blank to use a default image"
          />
        </label>

        <Button type="submit" className="w-full sm:w-auto">✨ Add to Wardrobe</Button>
      </form>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2">
        {WARDROBE_CATEGORIES.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
              selectedCategory === category 
                ? 'bg-gradient-to-r from-[#D4A373] to-[#A1887F] text-[#2C1810] shadow-lg' 
                : 'bg-[#3E2723] text-[#BCAAA4] border border-[#5D4037] hover:border-[#D4A373] hover:text-[#D4A373]'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Wardrobe Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {visibleItems.map((item, idx) => (
          <div 
            key={item.id} 
            className="group relative overflow-hidden rounded-2xl bg-[#3E2723]/80 backdrop-blur-sm border border-[#5D4037] shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-fade-in-up"
            style={{ animationDelay: `${idx * 50}ms` }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#D4A373]/10 to-[#A1887F]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover rounded-t-2xl group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
            
            <div className="p-4 relative z-10">
              <div className="font-semibold text-lg text-[#E8DCD1] mb-1">{item.name}</div>
              <div className="flex flex-wrap gap-1 mb-2">
                <span className="text-xs px-2 py-0.5 rounded-full bg-[#4E342E] text-[#D4A373]">{item.category}</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-[#4E342E] text-[#D4A373]">{item.season}</span>
              </div>
              <div className="text-sm text-[#BCAAA4] mb-2">
                {item.brand} • {item.color}
              </div>
              <div className="text-sm text-[#8D6E63]">
                Occasion: {item.occasion}
              </div>
              <Button
                type="button"
                variant="muted"
                className="mt-4 w-full group-hover:bg-[#D4A373] group-hover:text-[#2C1810] transition-all"
                onClick={() => actions.deleteClothing({ id: item.id })}
              >
                Remove Item
              </Button>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#D4A373] to-[#A1887F] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
          </div>
        ))}
      </div>

      {visibleItems.length === 0 && (
        <div className="text-center py-12 bg-[#3E2723]/40 rounded-2xl border border-[#5D4037] animate-fade-in-up">
          <p className="text-[#BCAAA4] text-lg">👔 No items in {selectedCategory === 'all' ? 'wardrobe' : selectedCategory}</p>
          <p className="text-[#8D6E63] text-sm mt-1">Add your first clothing item above!</p>
        </div>
      )}

      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}