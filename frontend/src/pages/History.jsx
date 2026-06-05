import { useState, useEffect } from 'react';
import { outfitAPI } from '../services/api';
import BottomNav from '../components/BottomNav';

export default function History() {
  const [outfits, setOutfits] = useState([]);

  useEffect(() => {
    outfitAPI.getHistory().then(r => setOutfits(r.data)).catch(() => {});
  }, []);

  const eventEmoji = {
    cours: '📚', entretien: '💼', soirée: '🎉', sport: '🏃', casual: '😊'
  };

  return (
    <div style={{minHeight:'100vh', background:'white', paddingBottom:'100px'}}>
      <div style={{padding:'24px', paddingTop:'48px'}}>
        <h1 style={{fontSize:'1.8rem', fontWeight:'900', marginBottom:'24px'}}>Historique</h1>
        {outfits.length === 0 ? (
          <div style={{textAlign:'center', padding:'60px 0', color:'#9ca3af'}}>
            <p style={{fontSize:'48px', marginBottom:'16px'}}>👗</p>
            <p style={{fontWeight:'600'}}>Aucune tenue générée</p>
          </div>
        ) : (
          <div style={{display:'flex', flexDirection:'column', gap:'12px'}}>
            {outfits.map(outfit => (
              <div key={outfit.id} style={{background:'#f9f9f9', borderRadius:'16px', padding:'16px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <div>
                  <p style={{fontWeight:'700', fontSize:'15px'}}>
                    {eventEmoji[outfit.event_type]} {outfit.event_type}
                  </p>
                  <p style={{fontSize:'12px', color:'#9ca3af'}}>
                    {new Date(outfit.created_at).toLocaleDateString('fr-FR', {day:'numeric', month:'long'})}
                  </p>
                  {outfit.weather_desc && <p style={{fontSize:'12px', color:'#6b7280'}}>{outfit.weather_desc}</p>}
                </div>
                <span style={{background: outfit.generated_by === 'ai' ? '#CBFF00' : '#f3f4f6', padding:'4px 10px', borderRadius:'20px', fontSize:'12px', fontWeight:'600'}}>
                  {outfit.generated_by === 'ai' ? 'IA' : 'Manuel'}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
      <BottomNav />
    </div>
  );
}
