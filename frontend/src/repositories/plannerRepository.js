import { fromInputDate, toInputDate } from '../core/date';

export function scheduleOutfitForDate(planner, payload) {
  const dateKey = toInputDate(payload.date);
  const nextEntries = planner.entries.filter((entry) => toInputDate(entry.date) !== dateKey);

  return {
    ...planner,
    selectedDate: fromInputDate(dateKey).toISOString(),
    entries: [
      ...nextEntries,
      {
        id: payload.id || `plan-${Date.now()}`,
        date: fromInputDate(dateKey).toISOString(),
        outfitId: payload.outfitId,
        note: payload.note || '',
      },
    ],
  };
}

export function updatePlannerNote(planner, payload) {
  return { ...planner, notes: payload.notes };
}

export function getEntryForDate(planner, date) {
  return planner.entries.find((entry) => toInputDate(entry.date) === toInputDate(date)) || null;
}
