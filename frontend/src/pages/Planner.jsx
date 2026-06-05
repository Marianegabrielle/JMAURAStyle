import React, { useEffect, useMemo, useState } from 'react';
import { useApp } from '../app/AppState';
import Button from '../components/Button';
import Badge from '../components/Badge';
import { formatDate, fromInputDate, toInputDate } from '../core/date';
import { getOutfitSummary } from '../repositories/outfitRepository';
import { getEntryForDate } from '../repositories/plannerRepository';

export default function Planner() {
  const { state, actions } = useApp();
  const selectedDateInput = toInputDate(state.planner.selectedDate);
  const entry = getEntryForDate(state.planner, state.planner.selectedDate);
  const firstOutfitId = state.outfits[0]?.id || '';
  const [dateInput, setDateInput] = useState(selectedDateInput);
  const [outfitId, setOutfitId] = useState(entry?.outfitId || firstOutfitId);
  const [note, setNote] = useState(entry?.note || '');

  useEffect(() => {
    setDateInput(selectedDateInput);
    setOutfitId(entry?.outfitId || firstOutfitId);
    setNote(entry?.note || '');
  }, [selectedDateInput, entry?.outfitId, entry?.note, firstOutfitId]);

  const outfitOptions = useMemo(() => (
    state.outfits.map((outfit) => getOutfitSummary(outfit, state.wardrobe))
  ), [state.outfits, state.wardrobe]);

  const plannedOutfit = useMemo(() => {
    if (!entry) return null;
    const outfit = state.outfits.find((item) => item.id === entry.outfitId);
    return outfit ? getOutfitSummary(outfit, state.wardrobe) : null;
  }, [entry, state.outfits, state.wardrobe]);

  const plannedEntries = useMemo(() => (
    state.planner.entries
      .slice()
      .sort((left, right) => new Date(left.date) - new Date(right.date))
      .slice(0, 8)
      .map((plan) => {
        const outfit = state.outfits.find((item) => item.id === plan.outfitId);
        return {
          ...plan,
          outfitName: outfit?.name || 'Missing outfit',
        };
      })
  ), [state.planner.entries, state.outfits]);

  function handleDateChange(event) {
    const nextDate = event.target.value;
    setDateInput(nextDate);
    actions.selectPlannerDate(fromInputDate(nextDate).toISOString());
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!outfitId) return;

    actions.scheduleOutfit({
      date: dateInput,
      outfitId,
      note: note.trim(),
    });
  }

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-[#E8DCD1] to-[#BCAAA4] bg-clip-text text-transparent">
          Outfit Planner
        </h2>
        <Badge className="bg-gradient-to-r from-[#D4A373]/20 to-[#A1887F]/20 text-[#D4A373] border border-[#D4A373]/30 px-3 py-1">
          📅 {state.planner.entries.length} planned
        </Badge>
      </div>

      {/* Schedule Form */}
      <form onSubmit={handleSubmit} className="p-6 bg-[#3E2723]/60 backdrop-blur-sm rounded-2xl border border-[#5D4037] shadow-xl space-y-5 transition-all duration-300 hover:border-[#D4A373]/30">
        <h3 className="text-lg font-semibold text-[#D4A373] flex items-center gap-2">
          <span>📅</span> Schedule an Outfit
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <label className="block">
            <span className="block text-sm font-medium text-[#BCAAA4] mb-1">Date</span>
            <input
              type="date"
              value={dateInput}
              onChange={handleDateChange}
              className="w-full rounded-lg border border-[#5D4037] bg-[#4E342E]/50 px-4 py-2.5 text-sm text-[#E8DCD1] focus:outline-none focus:ring-2 focus:ring-[#D4A373] focus:border-transparent transition-all"
            />
          </label>

          <label className="block">
            <span className="block text-sm font-medium text-[#BCAAA4] mb-1">Choose Outfit</span>
            <select
              value={outfitId}
              onChange={(event) => setOutfitId(event.target.value)}
              className="w-full rounded-lg border border-[#5D4037] bg-[#4E342E]/50 px-4 py-2.5 text-sm text-[#E8DCD1] focus:outline-none focus:ring-2 focus:ring-[#D4A373] focus:border-transparent"
            >
              {outfitOptions.map((outfit) => (
                <option key={outfit.id} value={outfit.id}>{outfit.name}</option>
              ))}
            </select>
          </label>
        </div>

        <label className="block">
          <span className="block text-sm font-medium text-[#BCAAA4] mb-1">Notes / Reminder</span>
          <textarea
            value={note}
            onChange={(event) => setNote(event.target.value)}
            rows={3}
            className="w-full rounded-lg border border-[#5D4037] bg-[#4E342E]/50 px-4 py-2.5 text-sm text-[#E8DCD1] placeholder-[#8D6E63] focus:outline-none focus:ring-2 focus:ring-[#D4A373] focus:border-transparent"
            placeholder="Add a reminder for this outfit (e.g., 'Don't forget the blazer')"
          />
        </label>

        <Button type="submit" disabled={!outfitId} className="w-full sm:w-auto">
          ✨ Save Plan
        </Button>
      </form>

      {/* Current Planned Outfit (if exists for selected date) */}
      {plannedOutfit && (
        <div className="group relative overflow-hidden rounded-2xl bg-[#3E2723]/80 backdrop-blur-sm border border-[#5D4037] shadow-xl transition-all duration-500 hover:border-[#D4A373]/30 animate-fade-in-up">
          <div className="absolute inset-0 bg-gradient-to-br from-[#D4A373]/10 to-[#A1887F]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="p-5 flex flex-col sm:flex-row gap-5 relative z-10">
            <img
              src={plannedOutfit.coverImage}
              alt={plannedOutfit.name}
              className="w-full sm:w-32 h-40 object-cover rounded-xl bg-[#4E342E] shadow-md"
              loading="lazy"
            />
            <div className="flex-1 min-w-0">
              <div className="text-sm text-[#D4A373] mb-1 flex items-center gap-2">
                <span>📅</span> {formatDate(entry.date)}
              </div>
              <div className="font-semibold text-xl text-[#E8DCD1] mb-1">{plannedOutfit.name}</div>
              <div className="text-sm text-[#BCAAA4] mb-2">{plannedOutfit.itemsLabel || 'No items selected'}</div>
              {entry.note && (
                <div className="mt-3 p-3 rounded-lg bg-[#4E342E]/50 border-l-4 border-[#D4A373] text-sm text-[#BCAAA4]">
                  💡 {entry.note}
                </div>
              )}
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#D4A373] to-[#A1887F] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
        </div>
      )}

      {/* Upcoming Plans List */}
      <div className="bg-[#3E2723]/40 backdrop-blur-sm rounded-2xl border border-[#5D4037] shadow-xl p-6 transition-all duration-300 hover:border-[#D4A373]/20">
        <h3 className="font-semibold text-lg text-[#E8DCD1] flex items-center gap-2 mb-4">
          <span className="text-[#D4A373]">📋</span> Upcoming Plans
        </h3>
        {plannedEntries.length > 0 ? (
          <ul className="space-y-3">
            {plannedEntries.map((plan, idx) => (
              <li 
                key={plan.id} 
                className="flex items-center justify-between gap-3 p-3 rounded-xl bg-[#4E342E]/30 hover:bg-[#4E342E]/50 transition-all duration-300 hover:translate-x-1 group"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <div className="flex items-center gap-3 flex-1">
                  <span className="text-[#D4A373] text-lg">👗</span>
                  <span className="font-medium text-[#E8DCD1]">{plan.outfitName}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-[#BCAAA4]">{formatDate(plan.date)}</span>
                  <button className="text-[#D4A373] text-xs opacity-0 group-hover:opacity-100 transition-opacity">Details →</button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center py-8 text-[#8D6E63]">
            <p className="text-lg">📅 No upcoming plans</p>
            <p className="text-sm mt-1">Schedule your first outfit using the form above</p>
          </div>
        )}
      </div>

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