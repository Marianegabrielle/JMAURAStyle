import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Shirt, Sparkles, User } from 'lucide-react';

const tabs = [
  { icon: Home, label: 'Accueil', path: '/' },
  { icon: Shirt, label: 'Dressing', path: '/wardrobe' },
  { icon: Sparkles, label: 'Tenue', path: '/generate' },
  { icon: User, label: 'Profil', path: '/profile' },
];

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white border-t border-gray-100 flex justify-around items-center py-4 px-6">
      {tabs.map(({ icon: Icon, label, path }) => {
        const active = location.pathname === path;
        return (
          <button
            key={path}
            onClick={() => navigate(path)}
            className="flex flex-col items-center gap-1"
          >
            <div className={`p-2 rounded-xl ${active ? 'bg-[#CBFF00]' : ''}`}>
              <Icon size={20} className={active ? 'text-black' : 'text-gray-400'} />
            </div>
            <span className={`text-xs ${active ? 'font-bold text-black' : 'text-gray-400'}`}>
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
