import { useState } from 'react';
import { outfitAPI } from '../services/api';
import BottomNav from '../components/BottomNav';
import { Sparkles } from 'lucide-react';

const EVENTS = [
  { value: 'cours', label: '📚 Cours', desc: 'Tenue pour aller en cours' },
  { value: 'entretien', label: '💼 Entretien', desc: 'Look professionnel' },
  { value: 'soirée', label: '🎉 Soirée', desc: 'Tenue de soirée' },
  { value: 'sport', label: '🏃 Sport', desc: 'Tenue sportive' },
  { value: 'casual', label: '😊 Casual', desc: 'Look décontracté' },
];

export default function Generate() {
  const [selected, setSelected] = useState(null);
  const [outfit, setOutfit] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!selected) return;
    setLoading(true);
    setError('');
    try {
      const res = await outfitAPI.generate(selected);
      setOutfit(res.data);
    } catch (err) {
      setError(err.response?.data?.detail || 'Erreur lors de la génération');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{minHeight:'100vh', background:'white', paddingBottom:'100px'}}>
      <div style={{padding:'24px', paddingTop:'48px'}}>
        <h1 style={{fontSize:'1.8rem', fontWeight:'900', marginBottom:'8px'}}>Générer une tenue</h1>
        <p style={{color:'#9ca3af', fontSize:'14px', marginBottom:'32px'}}>Choisissez le type d'événement</p>

        <div style={{display:'flex', flexDirection:'column', gap:'12px', marginBottom:'32px'}}>
          {EVENTS.map(ev => (
            <button
              key={ev.value}
              onClick={() => setSelected(ev.value)}
              style={{
                padding:'16px', borderRadius:'16px', border:'2px solid', cursor:'pointer', textAlign:'left',
                borderColor: selected === ev.value ? '#CBFF00' : '#f3f4f6',
                background: selected === ev.value ? '#f9ffe0' : '#f9f9f9',
              }}
            >
              <p style={{fontWeight:'700', fontSize:'15px'}}>{ev.label}</p>
              <p style={{fontSize:'13px', color:'#9ca3af'}}>{ev.desc}</p>
            </button>
          ))}
        </div>

        {error && <p style={{color:'red', fontSize:'14px', marginBottom:'16px'}}>{error}</p>}

        <button
          onClick={handleGenerate}
          disabled={!selected || loading}
          style={{
            width:'100%', padding:'16px', borderRadius:'16px', border:'none', cursor: selected ? 'pointer' : 'not-allowed',
            background: selected ? '#CBFF00' : '#f3f4f6', fontWeight:'700', fontSize:'15px',
            display:'flex', alignItems:'center', justifyContent:'center', gap:'8px'
          }}
        >
          <Sparkles size={18} />
          {loading ? 'Génération en cours...' : 'Générer ma tenue'}
        </button>

        {outfit && (
          <div style={{marginTop:'32px', background:'#f9ffe0', borderRadius:'20px', padding:'20px', border:'2px solid #CBFF00'}}>
            <h2 style={{fontWeight:'900', marginBottom:'16px'}}>✨ Ta tenue du jour</h2>
            <div style={{display:'flex', flexDirection:'column', gap:'8px'}}>
              {outfit.top_id && <div style={{background:'white', padding:'12px', borderRadius:'12px'}}>
                <p style={{fontSize:'12px', color:'#9ca3af'}}>HAUT</p>
                <p style={{fontWeight:'600'}}>Vêtement sélectionné</p>
              </div>}
              {outfit.bottom_id && <div style={{background:'white', padding:'12px', borderRadius:'12px'}}>
                <p style={{fontSize:'12px', color:'#9ca3af'}}>BAS</p>
                <p style={{fontWeight:'600'}}>Vêtement sélectionné</p>
              </div>}
              {outfit.shoes_id && <div style={{background:'white', padding:'12px', borderRadius:'12px'}}>
                <p style={{fontSize:'12px', color:'#9ca3af'}}>CHAUSSURES</p>
                <p style={{fontWeight:'600'}}>Vêtement sélectionné</p>
              </div>}
            </div>
            <p style={{fontSize:'12px', color:'#6b7280', marginTop:'12px'}}>
              Météo: {outfit.weather_desc || 'N/A'}
            </p>
          </div>
        )}
      </div>
      <BottomNav />
    </div>
  );
}
