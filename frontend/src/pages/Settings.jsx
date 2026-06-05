import React, { useEffect, useState } from 'react';
import { useApp } from '../app/AppState';
import Button from '../components/Button';

export default function Settings() {
  const { state, actions } = useApp();
  const [form, setForm] = useState(state.settings);

  useEffect(() => {
    setForm(state.settings);
  }, [state.settings]);

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    actions.updateSettings(form);
  }

  return (
    <div className="space-y-6 animate-fade-in-up">
      <h2 className="text-2xl font-bold bg-gradient-to-r from-[#E8DCD1] to-[#BCAAA4] bg-clip-text text-transparent">
        Settings
      </h2>

      <form onSubmit={handleSubmit} className="p-6 bg-[#3E2723]/60 backdrop-blur-sm rounded-2xl border border-[#5D4037] shadow-xl space-y-5 transition-all duration-300 hover:border-[#D4A373]/30">
        <h3 className="text-lg font-semibold text-[#D4A373] flex items-center gap-2">
          <span>⚙️</span> Preferences
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <label className="block">
            <span className="block text-sm font-medium text-[#BCAAA4] mb-1">Appearance</span>
            <select
              value={form.appearance}
              onChange={(event) => updateField('appearance', event.target.value)}
              className="w-full rounded-lg border border-[#5D4037] bg-[#4E342E]/50 px-4 py-2.5 text-sm text-[#E8DCD1] focus:outline-none focus:ring-2 focus:ring-[#D4A373] focus:border-transparent transition-all"
            >
              <option value="Light">Light</option>
              <option value="Dark">Dark</option>
              <option value="System">System</option>
            </select>
          </label>

          <label className="block">
            <span className="block text-sm font-medium text-[#BCAAA4] mb-1">Privacy</span>
            <select
              value={form.privacy}
              onChange={(event) => updateField('privacy', event.target.value)}
              className="w-full rounded-lg border border-[#5D4037] bg-[#4E342E]/50 px-4 py-2.5 text-sm text-[#E8DCD1] focus:outline-none focus:ring-2 focus:ring-[#D4A373] focus:border-transparent transition-all"
            >
              <option value="Private">Private</option>
              <option value="Friends">Friends</option>
              <option value="Public">Public</option>
            </select>
          </label>

          <label className="block">
            <span className="block text-sm font-medium text-[#BCAAA4] mb-1">Reminder time</span>
            <input
              type="time"
              value={form.reminderTime}
              onChange={(event) => updateField('reminderTime', event.target.value)}
              className="w-full rounded-lg border border-[#5D4037] bg-[#4E342E]/50 px-4 py-2.5 text-sm text-[#E8DCD1] focus:outline-none focus:ring-2 focus:ring-[#D4A373] focus:border-transparent transition-all"
            />
          </label>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label className="flex items-center gap-3 p-3 rounded-xl bg-[#4E342E]/30 border border-[#5D4037] hover:border-[#D4A373]/30 transition-all duration-300 cursor-pointer group">
            <input
              type="checkbox"
              checked={Boolean(form.notifications)}
              onChange={(event) => updateField('notifications', event.target.checked)}
              className="h-4 w-4 rounded border-[#5D4037] text-[#D4A373] focus:ring-[#D4A373] focus:ring-offset-0"
            />
            <span className="text-sm font-medium text-[#E8DCD1] group-hover:text-[#D4A373] transition-colors">🔔 Notifications</span>
          </label>

          <label className="flex items-center gap-3 p-3 rounded-xl bg-[#4E342E]/30 border border-[#5D4037] hover:border-[#D4A373]/30 transition-all duration-300 cursor-pointer group">
            <input
              type="checkbox"
              checked={Boolean(form.analytics)}
              onChange={(event) => updateField('analytics', event.target.checked)}
              className="h-4 w-4 rounded border-[#5D4037] text-[#D4A373] focus:ring-[#D4A373] focus:ring-offset-0"
            />
            <span className="text-sm font-medium text-[#E8DCD1] group-hover:text-[#D4A373] transition-colors">📊 Usage insights</span>
          </label>
        </div>

        <Button type="submit" className="w-full sm:w-auto gap-2">
          💾 Save Settings
        </Button>
      </form>

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