import React, { useMemo, useState } from 'react';
import { useApp } from '../app/AppState';
import Button from '../components/Button';
import { OUTFIT_EVENT_TYPES } from '../core/constants';
import { getOutfitSummary } from '../repositories/outfitRepository';

const eventTypes = OUTFIT_EVENT_TYPES.filter((eventType) => eventType !== 'all');
const initialForm = {
  name: '',
  eventType: 'casual',
  dress: '',
  top: '',
  bottom: '',
  shoes: '',
  outerwear: '',
  accessory: '',
  notes: '',
  coverImage: '',
};

export default function Outfits() {
  const { state, actions } = useApp();
  const [form, setForm] = useState(initialForm);

  const wardrobeByCategory = useMemo(() => (
    state.wardrobe.reduce((groups, item) => {
      return {
        ...groups,
        [item.category]: [...(groups[item.category] || []), item],
      };
    }, {})
  ), [state.wardrobe]);

  const summaries = useMemo(() => (
    state.outfits.map((outfit) => getOutfitSummary(outfit, state.wardrobe))
  ), [state.outfits, state.wardrobe]);

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function renderItemOptions(category) {
    return (
      <>
        <option value="">None</option>
        {(wardrobeByCategory[category] || []).map((item) => (
          <option key={item.id} value={item.id}>{item.name}</option>
        ))}
      </>
    );
  }

  function handleSubmit(event) {
    event.preventDefault();

    const selectedItemIds = [
      form.dress,
      form.top,
      form.bottom,
      form.shoes,
      form.outerwear,
      form.accessory,
    ].filter(Boolean);

    if (!form.name.trim() || selectedItemIds.length === 0) return;

    const coverItem = state.wardrobe.find((item) => item.id === (form.dress || form.top || form.bottom || form.shoes || form.outerwear || form.accessory));

    actions.addOutfit({
      name: form.name.trim(),
      eventType: form.eventType,
      generatedBy: 'manual',
      notes: form.notes.trim(),
      itemIds: {
        dress: form.dress || null,
        top: form.top || null,
        bottom: form.bottom || null,
        shoes: form.shoes || null,
        outerwear: form.outerwear || null,
        accessories: form.accessory ? [form.accessory] : [],
      },
      coverImage: form.coverImage.trim() || coverItem?.image,
    });
    setForm(initialForm);
  }

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-[#E8DCD1] to-[#BCAAA4] bg-clip-text text-transparent">
          Your Outfits ({state.outfits.length})
        </h2>
      </div>

      {/* Create Outfit Form */}
      <form onSubmit={handleSubmit} className="p-6 bg-[#3E2723]/60 backdrop-blur-sm rounded-2xl border border-[#5D4037] shadow-xl space-y-5 transition-all duration-300 hover:border-[#D4A373]/30">
        <h3 className="text-lg font-semibold text-[#D4A373] flex items-center gap-2">
          <span>✨</span> Create New Outfit
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <label className="block">
            <span className="block text-sm font-medium text-[#BCAAA4] mb-1">Outfit name</span>
            <input
              type="text"
              value={form.name}
              onChange={(event) => updateField('name', event.target.value)}
              className="w-full rounded-lg border border-[#5D4037] bg-[#4E342E]/50 px-4 py-2.5 text-sm text-[#E8DCD1] placeholder-[#8D6E63] focus:outline-none focus:ring-2 focus:ring-[#D4A373] focus:border-transparent transition-all"
              placeholder="e.g., Dinner date edit"
              required
            />
          </label>

          <label className="block">
            <span className="block text-sm font-medium text-[#BCAAA4] mb-1">Event type</span>
            <select
              value={form.eventType}
              onChange={(event) => updateField('eventType', event.target.value)}
              className="w-full rounded-lg border border-[#5D4037] bg-[#4E342E]/50 px-4 py-2.5 text-sm text-[#E8DCD1] focus:outline-none focus:ring-2 focus:ring-[#D4A373] focus:border-transparent transition-all"
            >
              {eventTypes.map((eventType) => (
                <option key={eventType} value={eventType}>{eventType}</option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="block text-sm font-medium text-[#BCAAA4] mb-1">Dress</span>
            <select
              value={form.dress}
              onChange={(event) => updateField('dress', event.target.value)}
              className="w-full rounded-lg border border-[#5D4037] bg-[#4E342E]/50 px-4 py-2.5 text-sm text-[#E8DCD1] focus:outline-none focus:ring-2 focus:ring-[#D4A373] focus:border-transparent"
            >
              {renderItemOptions('dresses')}
            </select>
          </label>

          <label className="block">
            <span className="block text-sm font-medium text-[#BCAAA4] mb-1">Top</span>
            <select
              value={form.top}
              onChange={(event) => updateField('top', event.target.value)}
              className="w-full rounded-lg border border-[#5D4037] bg-[#4E342E]/50 px-4 py-2.5 text-sm text-[#E8DCD1] focus:outline-none focus:ring-2 focus:ring-[#D4A373] focus:border-transparent"
            >
              {renderItemOptions('tops')}
            </select>
          </label>

          <label className="block">
            <span className="block text-sm font-medium text-[#BCAAA4] mb-1">Bottom</span>
            <select
              value={form.bottom}
              onChange={(event) => updateField('bottom', event.target.value)}
              className="w-full rounded-lg border border-[#5D4037] bg-[#4E342E]/50 px-4 py-2.5 text-sm text-[#E8DCD1] focus:outline-none focus:ring-2 focus:ring-[#D4A373] focus:border-transparent"
            >
              {renderItemOptions('bottoms')}
            </select>
          </label>

          <label className="block">
            <span className="block text-sm font-medium text-[#BCAAA4] mb-1">Shoes</span>
            <select
              value={form.shoes}
              onChange={(event) => updateField('shoes', event.target.value)}
              className="w-full rounded-lg border border-[#5D4037] bg-[#4E342E]/50 px-4 py-2.5 text-sm text-[#E8DCD1] focus:outline-none focus:ring-2 focus:ring-[#D4A373] focus:border-transparent"
            >
              {renderItemOptions('shoes')}
            </select>
          </label>

          <label className="block">
            <span className="block text-sm font-medium text-[#BCAAA4] mb-1">Outerwear</span>
            <select
              value={form.outerwear}
              onChange={(event) => updateField('outerwear', event.target.value)}
              className="w-full rounded-lg border border-[#5D4037] bg-[#4E342E]/50 px-4 py-2.5 text-sm text-[#E8DCD1] focus:outline-none focus:ring-2 focus:ring-[#D4A373] focus:border-transparent"
            >
              {renderItemOptions('outerwear')}
            </select>
          </label>

          <label className="block">
            <span className="block text-sm font-medium text-[#BCAAA4] mb-1">Accessory</span>
            <select
              value={form.accessory}
              onChange={(event) => updateField('accessory', event.target.value)}
              className="w-full rounded-lg border border-[#5D4037] bg-[#4E342E]/50 px-4 py-2.5 text-sm text-[#E8DCD1] focus:outline-none focus:ring-2 focus:ring-[#D4A373] focus:border-transparent"
            >
              {renderItemOptions('accessories')}
            </select>
          </label>
        </div>

        <label className="block">
          <span className="block text-sm font-medium text-[#BCAAA4] mb-1">Notes</span>
          <textarea
            value={form.notes}
            onChange={(event) => updateField('notes', event.target.value)}
            rows={2}
            className="w-full rounded-lg border border-[#5D4037] bg-[#4E342E]/50 px-4 py-2.5 text-sm text-[#E8DCD1] placeholder-[#8D6E63] focus:outline-none focus:ring-2 focus:ring-[#D4A373] focus:border-transparent"
            placeholder="Add styling details, color palette, etc."
          />
        </label>

        <label className="block">
          <span className="block text-sm font-medium text-[#BCAAA4] mb-1">Cover image URL</span>
          <input
            type="url"
            value={form.coverImage}
            onChange={(event) => updateField('coverImage', event.target.value)}
            className="w-full rounded-lg border border-[#5D4037] bg-[#4E342E]/50 px-4 py-2.5 text-sm text-[#E8DCD1] placeholder-[#8D6E63] focus:outline-none focus:ring-2 focus:ring-[#D4A373] focus:border-transparent"
            placeholder="Leave blank to use first selected item"
          />
        </label>

        <Button type="submit" className="w-full sm:w-auto">✨ Create Outfit</Button>
      </form>

      {/* Outfits Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {summaries.map((summary, idx) => (
          <div 
            key={summary.id} 
            className="group relative overflow-hidden rounded-2xl bg-[#3E2723]/80 backdrop-blur-sm border border-[#5D4037] shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-fade-in-up"
            style={{ animationDelay: `${idx * 100}ms` }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#D4A373]/10 to-[#A1887F]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <img
              src={summary.coverImage}
              alt={summary.name}
              className="w-full h-48 object-cover rounded-t-2xl group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
            
            <div className="p-4 relative z-10">
              <div className="font-semibold text-lg text-[#E8DCD1] mb-1">{summary.name}</div>
              <div className="text-sm text-[#BCAAA4] mb-2 flex items-center gap-2">
                <span className="text-xs px-2 py-0.5 rounded-full bg-[#4E342E] text-[#D4A373]">
                  {summary.eventType || 'casual'}
                </span>
              </div>
              <div className="text-sm text-[#8D6E63] min-h-10 mb-3">
                {summary.itemsLabel || 'No items selected'}
              </div>
              {summary.notes && (
                <div className="mt-2 text-sm text-[#BCAAA4] border-l-2 border-[#D4A373] pl-2 italic">
                  {summary.notes}
                </div>
              )}
              <Button
                type="button"
                variant="muted"
                className="mt-4 w-full group-hover:bg-[#D4A373] group-hover:text-[#2C1810] transition-all"
                onClick={() => actions.deleteOutfit({ id: summary.id })}
              >
                Remove outfit
              </Button>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#D4A373] to-[#A1887F] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
          </div>
        ))}
      </div>

      {summaries.length === 0 && (
        <div className="text-center py-12 bg-[#3E2723]/40 rounded-2xl border border-[#5D4037] animate-fade-in-up">
          <p className="text-[#BCAAA4] text-lg">👗 No outfits yet</p>
          <p className="text-[#8D6E63] text-sm mt-1">Create your first stylish look above!</p>
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