import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../app/AppState';
import { DEFAULT_PROFILE_AVATAR } from '../repositories/mockData';

export default function Header() {
  const { state } = useApp();
  const location = useLocation();

  const navLinks = [
    { path: '/wardrobe', label: 'Wardrobe' },
    { path: '/outfits', label: 'Outfits' },
    { path: '/planner', label: 'Planner' },
    { path: '/profile', label: 'Profile' },
    { path: '/settings', label: 'Settings' },
  ];

  return (
    <header className="bg-[#3E2723] border-b border-[#5D4037] shadow-lg sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link 
            to="/" 
            className="text-lg font-semibold text-[#D4A373] hover:text-[#E8DCD1] transition-colors"
          >
            JMAURAStyle
          </Link>
          <nav className="hidden sm:flex space-x-3 text-sm">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`transition-colors duration-200 ${
                  location.pathname === link.path
                    ? 'text-[#D4A373] font-medium border-b-2 border-[#D4A373] pb-0.5'
                    : 'text-[#BCAAA4] hover:text-[#D4A373]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center space-x-3">
          <div className="text-sm text-[#BCAAA4] hidden sm:block">{state.profile.fullName}</div>
          <Link to="/profile">
            <img
              src={state.profile.avatar || DEFAULT_PROFILE_AVATAR}
              alt={state.profile.fullName}
              className="w-8 h-8 rounded-full object-cover bg-[#4E342E] border-2 border-[#D4A373] hover:scale-105 transition-transform"
            />
          </Link>
        </div>
      </div>
    </header>
  );
}