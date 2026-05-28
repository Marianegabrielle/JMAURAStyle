import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { weatherAPI, outfitAPI } from '../services/api';
import BottomNav from '../components/BottomNav';
import { Shirt, Sparkles, Clock, CloudSun } from 'lucide-react';

export default function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [weather, setWeather] = useState(null);
  const [recentOutfits, setRecentOutfits] = useState([]);

  useEffect(() => {
    weatherAPI.get().then(r => setWeather(r.data)).catch(() => {});
    outfitAPI.getHistory().then(r => setRecentOutfits(r.data.slice(0, 3))).catch(() => {});
  }, []);

  const firstName = user?.full_name?.split(' ')[0] || 'toi';

  return (
    <div className="min-h-screen bg-white pb-24">
      <div className="p-6 pt-12">
        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="text-gray-400 text-sm">Bonjour,</p>
            <h1 className="text-2xl font-black">{firstName} ✨</h1>
          </div>
          {weather && (
            <div className="flex items-center gap-1 bg-gray-100 px-3 py-2 rounded-xl">
              <CloudSun size={16} />
              <span className="text-sm font-medium">{Math.round(weather.temperature)}°C</span>
            </div>
          )}
        </div>

        {weather && (
          <div className="bg-[#CBFF00] rounded-2xl p-4 mb-6">
            <p className="text-xs text-gray-600 mb-1">Météo du jour</p>
            <p className="font-bold">{weather.summary}</p>
          </div>
        )}

        <h2 className="font-bold text-lg mb-4">Que veux-tu faire ?</h2>
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button
            onClick={() => navigate('/wardrobe')}
            className="bg-gray-100 rounded-2xl p-4 flex flex-col gap-2 items-start"
          >
            <Shirt size={24} />
            <span className="text-sm font-bold">Mon dressing</span>
          </button>
          <button
            onClick={() => navigate('/generate')}
            className="bg-[#CBFF00] rounded-2xl p-4 flex flex-col gap-2 items-start"
          >
            <Sparkles size={24} />
            <span className="text-sm font-bold">Générer une tenue</span>
          </button>
          <button
            onClick={() => navigate('/history')}
            className="bg-gray-100 rounded-2xl p-4 flex flex-col gap-2 items-start col-span-2"
          >
            <Clock size={24} />
            <span className="text-sm font-bold">Historique des tenues</span>
          </button>
        </div>

        {recentOutfits.length > 0 && (
          <>
            <h2 className="font-bold text-lg mb-3">Récemment portées</h2>
            <div className="flex flex-col gap-2">
              {recentOutfits.map(outfit => (
                <div key={outfit.id} className="bg-gray-100 rounded-2xl p-4">
                  <p className="text-sm font-medium capitalize">{outfit.event_type}</p>
                  <p className="text-xs text-gray-400">{new Date(outfit.created_at).toLocaleDateString('fr-FR')}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <BottomNav />
    </div>
  );
}
