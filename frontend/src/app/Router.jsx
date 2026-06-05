import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Wardrobe from '../pages/Wardrobe';
import Outfits from '../pages/Outfits';
import Planner from '../pages/Planner';
import Profile from '../pages/Profile';
import Settings from '../pages/Settings';
import Header from '../components/Header';

export function AppRouter() {
  return (
    <div className="min-h-screen bg-bg text-dark">
      <Header />

      <main className="max-w-5xl mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/wardrobe" element={<Wardrobe />} />
          <Route path="/outfits" element={<Outfits />} />
          <Route path="/planner" element={<Planner />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </main>
    </div>
  );
}

export default AppRouter;
