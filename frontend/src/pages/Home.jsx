import React, { useState, useEffect } from 'react';
import { useApp } from '../app/AppState';
import Card from '../components/Card';
import Badge from '../components/Badge';

// Helper component for stats cards with icons and animations
const StatCard = ({ icon, label, value, trend, badge, delay }) => (
  <div 
    className="group relative overflow-hidden rounded-2xl bg-[#3E2723]/80 backdrop-blur-sm border border-[#5D4037] shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-fade-in-up"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-[#D4A373]/10 to-[#A1887F]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    <div className="relative p-6">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-medium text-[#BCAAA4]">
            <span className="text-2xl animate-bounce-subtle">{icon}</span>
            <span>{label}</span>
          </div>
          <div className="text-4xl font-bold bg-gradient-to-r from-[#E8DCD1] to-[#BCAAA4] bg-clip-text text-transparent">{value}</div>
          {trend && <div className="text-xs text-[#A5D6A7] flex items-center gap-1 animate-pulse-subtle">↑ {trend} this week</div>}
        </div>
        {badge && <div className="mt-1 animate-fade-in">{badge}</div>}
      </div>
    </div>
    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#D4A373] to-[#A1887F] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
  </div>
);

// Dress showcase component with hover effects
const DressShowcase = ({ imageUrl, title, index }) => (
  <div 
    className="group relative overflow-hidden rounded-xl bg-[#3E2723]/40 border border-[#5D4037] hover:border-[#D4A373]/50 transition-all duration-500 hover:-translate-y-2 animate-scale-in"
    style={{ animationDelay: `${index * 100}ms` }}
  >
    <div className="absolute inset-0 bg-gradient-to-t from-[#2C1810] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
    <img 
      src={imageUrl} 
      alt={title}
      className="w-full h-52 object-cover rounded-t-xl group-hover:scale-110 transition-transform duration-700"
    />
    <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-[#2C1810] to-transparent transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-20">
      <p className="text-[#E8DCD1] text-sm font-medium">{title}</p>
    </div>
    <div className="absolute top-2 right-2 bg-[#2C1810]/80 backdrop-blur-sm rounded-full px-2 py-1 text-xs text-[#D4A373] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
      👗 View
    </div>
  </div>
);

// Trending dress images (high-quality fashion photos)
const trendingDresses = [
  { url: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=500&h=600&fit=crop", title: "Elegant Evening Gown" },
  { url: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&h=600&fit=crop", title: "Summer Floral Dress" },
  { url: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=500&h=600&fit=crop", title: "Casual Chic Dress" },
  { url: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500&h=600&fit=crop", title: "Party Wear Dress" },
];

export default function Home() {
  const { state } = useApp();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const formattedDate = new Date(state.planner.selectedDate).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  const wardrobeTrend = state.wardrobe.length > 5 ? '+2' : '0';

  return (
    <div className="min-h-screen bg-[#2C1810]">
      {/* Animated background orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#D4A373]/5 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#A1887F]/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-[#8D6E63]/5 rounded-full blur-2xl animate-float"></div>
      </div>

      {/* Main content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-8 pb-12">
        {/* Large App Logo Section */}
        <div className="flex justify-center mb-12 animate-fade-in-up">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-[#D4A373] to-[#A1887F] rounded-3xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
            <div className="relative bg-[#3E2723]/80 backdrop-blur-sm rounded-3xl p-8 border border-[#5D4037] shadow-2xl group-hover:scale-105 transition-transform duration-500">
              <img 
                src="/logo.png" 
                alt="StyleVault Logo" 
                className="w-48 h-48 object-contain md:w-64 md:h-64 mx-auto"
              />
              <div className="text-center mt-4">
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#D4A373] via-[#A1887F] to-[#D4A373] bg-clip-text text-transparent animate-gradient">
                  JMAURAStyle
                </h1>
                <p className="text-[#BCAAA4] text-sm mt-1">Your Personal Wardrobe Studio</p>
              </div>
            </div>
          </div>
        </div>

        {/* Welcome section */}
        <div className="mb-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-fade-in-up">
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-[#E8DCD1] to-[#BCAAA4] bg-clip-text text-transparent">
              Welcome back, {state.profile.fullName.split(' ')[0] || 'Stylist'}!
            </h2>
            <p className="text-[#BCAAA4] mt-1 flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#A5D6A7] animate-pulse"></span>
              Ready to create today's look
            </p>
          </div>
          <div className="flex items-center gap-3 text-sm bg-[#3E2723]/60 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border border-[#5D4037]/50 hover:border-[#D4A373]/30 transition-all duration-300">
            <span className="text-[#BCAAA4] animate-spin-slow">📅</span>
            <span className="font-medium text-[#E8DCD1]">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <StatCard
            icon="👗"
            label="Wardrobe Collection"
            value={state.wardrobe.length}
            trend={wardrobeTrend}
            delay={0}
          />
          <StatCard
            icon="✨"
            label="Saved Outfits"
            value={state.outfits.length}
            trend={state.outfits.length > 3 ? '+1' : ''}
            delay={100}
          />
          <StatCard
            icon="📆"
            label="Planned Looks"
            value={state.planner.entries.length}
            delay={200}
            badge={
              <Badge className="bg-gradient-to-r from-[#D4A373]/20 to-[#A1887F]/20 text-[#D4A373] border-[#D4A373]/30 shadow-lg backdrop-blur-sm">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs animate-bounce-subtle">🗓️</span>
                  <span className="text-xs font-medium">{formattedDate}</span>
                </div>
              </Badge>
            }
          />
        </div>

        {/* Trending Dresses Section */}
        <div className="mb-16 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-[#E8DCD1] to-[#BCAAA4] bg-clip-text text-transparent">
                👗 Trending Dresses
              </h2>
              <p className="text-[#8D6E63] text-sm mt-1">Discover your next favorite look</p>
            </div>
            <button className="text-[#D4A373] text-sm font-medium hover:text-[#E8DCD1] transition-colors flex items-center gap-1 group">
              View All 
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingDresses.map((dress, idx) => (
              <DressShowcase key={idx} imageUrl={dress.url} title={dress.title} index={idx} />
            ))}
          </div>
        </div>

        {/* Recent Activity & Style Tip */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-[#3E2723]/40 backdrop-blur-sm rounded-2xl border border-[#5D4037]/40 shadow-xl p-6 hover:border-[#D4A373]/20 transition-all duration-500 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-[#E8DCD1] flex items-center gap-2">
                <span className="text-[#D4A373] animate-pulse-subtle">⭐</span> Recent Activity
              </h3>
              <span className="text-xs text-[#8D6E63]">Last 7 days</span>
            </div>
            <div className="space-y-3">
              {state.outfits.slice(0, 3).map((outfit, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-[#4E342E]/30 hover:bg-[#4E342E]/50 transition-all duration-300 hover:translate-x-1 group">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4A373]/20 to-[#A1887F]/20 flex items-center justify-center text-[#D4A373] text-lg group-hover:scale-110 transition-transform">
                    {idx === 0 ? '👗' : idx === 1 ? '👚' : '🧥'}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[#E8DCD1]">{outfit.name || `Stylish Look ${idx + 1}`}</p>
                    <p className="text-xs text-[#8D6E63]">Ready to wear</p>
                  </div>
                  <button className="text-[#D4A373] text-xs font-medium hover:text-[#E8DCD1] transition-colors opacity-0 group-hover:opacity-100">View →</button>
                </div>
              ))}
              {state.outfits.length === 0 && (
                <div className="text-center py-8 text-[#8D6E63] text-sm animate-pulse-subtle">
                  ✨ No outfits yet — create your first look!
                </div>
              )}
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#D4A373]/5 to-[#A1887F]/5 rounded-2xl border border-[#D4A373]/20 shadow-xl p-6 hover:border-[#D4A373]/40 transition-all duration-500 animate-fade-in-up" style={{ animationDelay: '500ms' }}>
            <h3 className="font-semibold text-[#E8DCD1] flex items-center gap-2 mb-3">
              <span className="text-[#D4A373] animate-sparkle">✨</span> Style Tip
            </h3>
            <p className="text-sm text-[#BCAAA4] leading-relaxed">
              "Mix neutrals with one statement piece to elevate your daily outfit effortlessly."
            </p>
            <div className="mt-4 pt-3 border-t border-[#5D4037]/50">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#8D6E63]">Your wardrobe size</span>
                <span className="font-medium text-[#D4A373]">{state.wardrobe.length} items</span>
              </div>
              <div className="w-full bg-[#4E342E] rounded-full h-1.5 mt-2 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-[#D4A373] to-[#A1887F] h-1.5 rounded-full transition-all duration-1000"
                  style={{ width: `${Math.min((state.wardrobe.length / 50) * 100, 100)}%` }}
                ></div>
              </div>
              <p className="text-xs text-[#8D6E63] mt-3 text-center">
                💡 Add {Math.max(0, 10 - state.wardrobe.length)} more items to complete your capsule wardrobe
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Custom Animations */}
      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.1); }
        }
        @keyframes pulse-subtle {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        @keyframes sparkle {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.2); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.6s ease-out forwards; opacity: 0; }
        .animate-scale-in { animation: scale-in 0.4s ease-out forwards; opacity: 0; }
        .animate-float { animation: float 8s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse-slow 6s ease-in-out infinite; }
        .animate-pulse-subtle { animation: pulse-subtle 2s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 4s linear infinite; }
        .animate-gradient { background-size: 200% 200%; animation: gradient 3s ease infinite; }
        .animate-bounce-subtle { animation: bounce-subtle 1s ease-in-out infinite; }
        .animate-sparkle { animation: sparkle 1.5s ease-in-out infinite; }
      `}</style>
    </div>
  );
}