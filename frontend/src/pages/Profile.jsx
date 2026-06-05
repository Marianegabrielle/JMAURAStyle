import React, { useEffect, useState } from 'react';
import { useApp } from '../app/AppState';
import Button from '../components/Button';
import { DEFAULT_PROFILE_AVATAR } from '../repositories/mockData';

const fields = ['fullName', 'email', 'city', 'avatar', 'bio', 'styleGoal'];

export default function Profile() {
  const { state, actions } = useApp();
  const [form, setForm] = useState(state.profile);

  useEffect(() => {
    setForm(state.profile);
  }, [state.profile]);

  // Override old Unsplash avatar with local file
  useEffect(() => {
    if (form.avatar && (form.avatar.includes('unsplash') || form.avatar.includes('images.unsplash.com'))) {
      const newAvatar = '/profile.png';
      updateField('avatar', newAvatar);
      actions.updateProfile({ ...form, avatar: newAvatar });
    }
  }, [form.avatar]);

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const payload = fields.reduce((next, field) => ({
      ...next,
      [field]: typeof form[field] === 'string' ? form[field].trim() : form[field],
    }), {});

    actions.updateProfile({
      ...payload,
      fullName: payload.fullName || 'Guest Editor',
      email: payload.email || 'guest@JMaura.local',
      avatar: payload.avatar || DEFAULT_PROFILE_AVATAR,
    });
  }

  return (
    <div className="space-y-6 animate-fade-in-up">
      <h2 className="text-2xl font-bold bg-gradient-to-r from-[#E8DCD1] to-[#BCAAA4] bg-clip-text text-transparent">
        My Profile
      </h2>

      {/* Profile Header Card */}
      <div className="group relative overflow-hidden rounded-2xl bg-[#3E2723]/80 backdrop-blur-sm border border-[#5D4037] shadow-xl transition-all duration-500 hover:border-[#D4A373]/30">
        <div className="absolute inset-0 bg-gradient-to-br from-[#D4A373]/10 to-[#A1887F]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="relative p-6 flex flex-col sm:flex-row items-center gap-6">
          <div className="relative">
            <img
              src={form.avatar || DEFAULT_PROFILE_AVATAR}
              alt={form.fullName || 'Profile'}
              className="w-24 h-24 rounded-full object-cover border-4 border-[#D4A373] shadow-lg"
            />
            <div className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-emerald-500 border-2 border-[#3E2723]"></div>
          </div>
          <div className="text-center sm:text-left">
            <div className="text-2xl font-bold text-[#E8DCD1]">{form.fullName || 'Guest Editor'}</div>
            <div className="text-[#BCAAA4] mt-1">{form.email || 'guest@stylevault.local'}</div>
            <div className="text-sm text-[#8D6E63] mt-2 flex items-center gap-2 justify-center sm:justify-start">
              <span>📍</span> {form.city || 'Not specified'}
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#D4A373] to-[#A1887F] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
      </div>

      {/* Edit Profile Form */}
      <form onSubmit={handleSubmit} className="p-6 bg-[#3E2723]/60 backdrop-blur-sm rounded-2xl border border-[#5D4037] shadow-xl space-y-5 transition-all duration-300 hover:border-[#D4A373]/30">
        <h3 className="text-lg font-semibold text-[#D4A373] flex items-center gap-2">
          <span>✏️</span> Edit Profile
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <label className="block">
            <span className="block text-sm font-medium text-[#BCAAA4] mb-1">Full name</span>
            <input
              type="text"
              value={form.fullName || ''}
              onChange={(event) => updateField('fullName', event.target.value)}
              className="w-full rounded-lg border border-[#5D4037] bg-[#4E342E]/50 px-4 py-2.5 text-sm text-[#E8DCD1] placeholder-[#8D6E63] focus:outline-none focus:ring-2 focus:ring-[#D4A373] focus:border-transparent transition-all"
              placeholder="Your full name"
            />
          </label>

          <label className="block">
            <span className="block text-sm font-medium text-[#BCAAA4] mb-1">Email</span>
            <input
              type="email"
              value={form.email || ''}
              onChange={(event) => updateField('email', event.target.value)}
              className="w-full rounded-lg border border-[#5D4037] bg-[#4E342E]/50 px-4 py-2.5 text-sm text-[#E8DCD1] placeholder-[#8D6E63] focus:outline-none focus:ring-2 focus:ring-[#D4A373] focus:border-transparent transition-all"
              placeholder="your@email.com"
            />
          </label>

          <label className="block">
            <span className="block text-sm font-medium text-[#BCAAA4] mb-1">City</span>
            <input
              type="text"
              value={form.city || ''}
              onChange={(event) => updateField('city', event.target.value)}
              className="w-full rounded-lg border border-[#5D4037] bg-[#4E342E]/50 px-4 py-2.5 text-sm text-[#E8DCD1] placeholder-[#8D6E63] focus:outline-none focus:ring-2 focus:ring-[#D4A373] focus:border-transparent transition-all"
              placeholder="e.g., Yaounde, New York"
            />
          </label>

          <label className="block">
            <span className="block text-sm font-medium text-[#BCAAA4] mb-1">Avatar Image</span>
            <select
              value={form.avatar}
              onChange={(e) => {
                const newAvatar = e.target.value;
                updateField('avatar', newAvatar);
                actions.updateProfile({ ...form, avatar: newAvatar });
              }}
              className="w-full rounded-lg border border-[#5D4037] bg-[#4E342E]/50 px-4 py-2.5 text-sm text-[#E8DCD1] focus:outline-none focus:ring-2 focus:ring-[#D4A373] focus:border-transparent"
            >
              <option value="/profile.png">Profile Avatar</option>
            </select>
          </label>
        </div>

        <label className="block">
          <span className="block text-sm font-medium text-[#BCAAA4] mb-1">Bio</span>
          <textarea
            value={form.bio || ''}
            onChange={(event) => updateField('bio', event.target.value)}
            rows={3}
            className="w-full rounded-lg border border-[#5D4037] bg-[#4E342E]/50 px-4 py-2.5 text-sm text-[#E8DCD1] placeholder-[#8D6E63] focus:outline-none focus:ring-2 focus:ring-[#D4A373] focus:border-transparent transition-all"
            placeholder="Tell us about your style..."
          />
        </label>

        <label className="block">
          <span className="block text-sm font-medium text-[#BCAAA4] mb-1">Style goal</span>
          <input
            type="text"
            value={form.styleGoal || ''}
            onChange={(event) => updateField('styleGoal', event.target.value)}
            className="w-full rounded-lg border border-[#5D4037] bg-[#4E342E]/50 px-4 py-2.5 text-sm text-[#E8DCD1] placeholder-[#8D6E63] focus:outline-none focus:ring-2 focus:ring-[#D4A373] focus:border-transparent transition-all"
            placeholder="e.g., Build a capsule wardrobe"
          />
        </label>

        <div className="flex flex-wrap gap-3 pt-2">
          <Button type="submit" className="gap-2">
            💾 Save Profile
          </Button>
          <Button
            type="button"
            variant="muted"
            onClick={() => {
              const newAvatar = '/profile.png';
              updateField('avatar', newAvatar);
              actions.updateProfile({ ...form, avatar: newAvatar });
            }}
          >
            🖼️ Use Default Avatar
          </Button>
        </div>
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