import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { weatherAPI, outfitAPI } from '../services/api';
import BottomNav from '../components/BottomNav';

export default function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [weather, setWeather] = useState(null);
  const [recentOutfits, setRecentOutfits] = useState([]);

  useEffect(() => {
    weatherAPI.get().then(r => setWeather(r.data)).catch(() => {});
    outfitAPI.getHistory().then(r => setRecentOutfits(r.data.slice(0, 3))).catch(() => {});
  }, []);

  const firstName = user?.full_name?.split(' ')[0] || '';
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Bonjour' : hour < 18 ? 'Bon après-midi' : 'Bonsoir';

  const eventEmoji = { cours:'📚', entretien:'💼', soirée:'🎉', sport:'🏃', casual:'😊' };

  return (
    <div style={{minHeight:'100vh', background:'#F5F5F0', paddingBottom:'100px'}}>
      
      {/* Header */}
      <div style={{background:'#0A0A0A', padding:'48px 24px 32px'}}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start'}}>
          <div>
            <p style={{color:'#6b7280', fontSize:'13px', fontWeight:'600', marginBottom:'4px'}}>{greeting},</p>
            <h1 style={{color:'white', fontSize:'2rem', fontWeight:'900', letterSpacing:'-1px', lineHeight:'1'}}>
              {firstName} ✦
            </h1>
          </div>
          {weather && (
            <div style={{background:'rgba(255,255,255,0.1)', borderRadius:'14px', padding:'10px 14px', textAlign:'center'}}>
              <p style={{color:'#CBFF00', fontSize:'18px', fontWeight:'900'}}>{Math.round(weather.temperature)}°</p>
              <p style={{color:'#9ca3af', fontSize:'11px'}}>
                {weather.description?.split(' ').slice(0,1).join('')}
              </p>
            </div>
          )}
        </div>

        {weather && (
          <div style={{background:'#CBFF00', borderRadius:'16px', padding:'14px 16px', marginTop:'20px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <div>
              <p style={{fontSize:'11px', fontWeight:'700', textTransform:'uppercase', letterSpacing:'0.5px', color:'#4a5520'}}>Météo · {user?.city || 'Votre ville'}</p>
              <p style={{fontWeight:'800', fontSize:'15px', marginTop:'2px'}}>{weather.summary}</p>
            </div>
            <span style={{fontSize:'28px'}}>☀️</span>
          </div>
        )}
      </div>

      <div style={{padding:'24px'}}>
        {/* Actions rapides */}
        <p style={{fontSize:'12px', fontWeight:'700', color:'#9ca3af', textTransform:'uppercase', letterSpacing:'0.5px', marginBottom:'14px'}}>Actions rapides</p>
        
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px', marginBottom:'24px'}}>
          <button onClick={() => navigate('/generate')}
            style={{background:'#0A0A0A', border:'none', borderRadius:'20px', padding:'20px', cursor:'pointer', textAlign:'left', gridRow:'span 1'}}>
            <span style={{fontSize:'24px', display:'block', marginBottom:'32px'}}>✦</span>
            <p style={{color:'#CBFF00', fontSize:'13px', fontWeight:'800', letterSpacing:'-0.3px'}}>Générer</p>
            <p style={{color:'#6b7280', fontSize:'12px'}}>une tenue</p>
          </button>

          <button onClick={() => navigate('/wardrobe')}
            style={{background:'white', border:'none', borderRadius:'20px', padding:'20px', cursor:'pointer', textAlign:'left'}}>
            <span style={{fontSize:'24px', display:'block', marginBottom:'32px'}}>👗</span>
            <p style={{color:'#0A0A0A', fontSize:'13px', fontWeight:'800', letterSpacing:'-0.3px'}}>Dressing</p>
            <p style={{color:'#9ca3af', fontSize:'12px'}}>mes vêtements</p>
          </button>

          <button onClick={() => navigate('/history')}
            style={{background:'white', border:'none', borderRadius:'20px', padding:'20px', cursor:'pointer', textAlign:'left', gridColumn:'span 2'}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <div>
                <p style={{color:'#0A0A0A', fontSize:'13px', fontWeight:'800', letterSpacing:'-0.3px'}}>Historique des tenues</p>
                <p style={{color:'#9ca3af', fontSize:'12px'}}>{recentOutfits.length} tenues portées</p>
              </div>
              <span style={{fontSize:'24px'}}>📅</span>
            </div>
          </button>
        </div>

        {/* Tenues récentes */}
        {recentOutfits.length > 0 && (
          <>
            <p style={{fontSize:'12px', fontWeight:'700', color:'#9ca3af', textTransform:'uppercase', letterSpacing:'0.5px', marginBottom:'14px'}}>Dernières tenues</p>
            <div style={{display:'flex', flexDirection:'column', gap:'8px'}}>
              {recentOutfits.map(outfit => (
                <div key={outfit.id} style={{background:'white', borderRadius:'16px', padding:'14px 16px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                  <div style={{display:'flex', alignItems:'center', gap:'12px'}}>
                    <div style={{width:'40px', height:'40px', background:'#F5F5F0', borderRadius:'12px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'18px'}}>
                      {eventEmoji[outfit.event_type] || '👗'}
                    </div>
                    <div>
                      <p style={{fontWeight:'700', fontSize:'14px', textTransform:'capitalize'}}>{outfit.event_type}</p>
                      <p style={{fontSize:'12px', color:'#9ca3af'}}>{new Date(outfit.created_at).toLocaleDateString('fr-FR', {day:'numeric', month:'long'})}</p>
                    </div>
                  </div>
                  <span style={{background: outfit.generated_by === 'ai' ? '#CBFF00' : '#F5F5F0', padding:'4px 10px', borderRadius:'20px', fontSize:'11px', fontWeight:'700'}}>
                    {outfit.generated_by === 'ai' ? 'IA ✦' : 'Manuel'}
                  </span>
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
