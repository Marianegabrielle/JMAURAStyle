import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { profileAPI } from '../services/api';
import BottomNav from '../components/BottomNav';
import { useNavigate } from 'react-router-dom';
import { LogOut, MapPin } from 'lucide-react';

export default function Profile() {
  const { user, logout, login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ full_name: user?.full_name || '', city: user?.city || '' });
  const [saved, setSaved] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await profileAPI.update(form);
      login(localStorage.getItem('token'), res.data);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch {}
  };

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  const handleLocation = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(async (pos) => {
      try {
        const res = await profileAPI.update({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude
        });
        login(localStorage.getItem('token'), res.data);
        alert('Localisation mise à jour !');
      } catch {}
    });
  };

  return (
    <div style={{minHeight:'100vh', background:'white', paddingBottom:'100px'}}>
      <div style={{padding:'24px', paddingTop:'48px'}}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'32px'}}>
          <h1 style={{fontSize:'1.8rem', fontWeight:'900'}}>Profil</h1>
          <button onClick={handleLogout} style={{background:'#fee2e2', border:'none', borderRadius:'12px', padding:'10px', cursor:'pointer'}}>
            <LogOut size={18} color="#ef4444" />
          </button>
        </div>

        <div style={{textAlign:'center', marginBottom:'32px'}}>
          <div style={{width:'80px', height:'80px', borderRadius:'50%', background:'#CBFF00', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 12px', fontSize:'32px', fontWeight:'900'}}>
            {user?.full_name?.charAt(0).toUpperCase()}
          </div>
          <p style={{fontWeight:'700', fontSize:'18px'}}>{user?.full_name}</p>
          <p style={{color:'#9ca3af', fontSize:'14px'}}>{user?.email}</p>
        </div>

        <form onSubmit={handleUpdate} style={{display:'flex', flexDirection:'column', gap:'12px'}}>
          <input
            placeholder="Nom complet"
            value={form.full_name}
            onChange={e => setForm({...form, full_name: e.target.value})}
            style={{padding:'14px', borderRadius:'12px', background:'#f3f4f6', border:'none', outline:'none'}}
          />
          <input
            placeholder="Ville (ex: Yaoundé)"
            value={form.city}
            onChange={e => setForm({...form, city: e.target.value})}
            style={{padding:'14px', borderRadius:'12px', background:'#f3f4f6', border:'none', outline:'none'}}
          />
          <button type="submit"
            style={{padding:'14px', borderRadius:'12px', background:'#CBFF00', border:'none', cursor:'pointer', fontWeight:'700'}}>
            {saved ? '✅ Sauvegardé !' : 'Sauvegarder'}
          </button>
        </form>

        <button onClick={handleLocation}
          style={{width:'100%', marginTop:'12px', padding:'14px', borderRadius:'12px', background:'#f3f4f6', border:'none', cursor:'pointer', fontWeight:'600', display:'flex', alignItems:'center', justifyContent:'center', gap:'8px'}}>
          <MapPin size={16} />
          Détecter ma position automatiquement
        </button>
      </div>
      <BottomNav />
    </div>
  );
}
