import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI, profileAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ email: '', password: '', full_name: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      if (isLogin) {
        const res = await authAPI.login({ email: form.email, password: form.password });
        const token = res.data.access_token;
        localStorage.setItem('token', token);
        const profile = await profileAPI.get();
        login(token, profile.data);
        navigate('/');
      } else {
        await authAPI.register(form);
        const res = await authAPI.login({ email: form.email, password: form.password });
        const token = res.data.access_token;
        localStorage.setItem('token', token);
        const profile = await profileAPI.get();
        login(token, profile.data);
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.detail || 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{minHeight:'100vh', display:'flex', flexDirection:'column', justifyContent:'space-between', padding:'24px', background:'white'}}>
      <div style={{marginTop:'64px'}}>
        <h1 style={{fontSize:'2rem', fontWeight:'900', marginBottom:'8px'}}>
          {isLogin ? 'Bon retour' : 'Bienvenue'}
        </h1>
        <p style={{color:'#9ca3af', fontSize:'14px'}}>
          {isLogin ? 'Connectez-vous à JmauraStyle' : 'Créez votre compte JmauraStyle'}
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{display:'flex', flexDirection:'column', gap:'16px'}}>
        {!isLogin && (
          <input
            type="text"
            placeholder="Nom complet"
            value={form.full_name}
            onChange={e => setForm({...form, full_name: e.target.value})}
            style={{width:'100%', padding:'16px', borderRadius:'16px', background:'#f3f4f6', border:'none', outline:'none', fontSize:'14px'}}
            required
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={e => setForm({...form, email: e.target.value})}
          style={{width:'100%', padding:'16px', borderRadius:'16px', background:'#f3f4f6', border:'none', outline:'none', fontSize:'14px'}}
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={form.password}
          onChange={e => setForm({...form, password: e.target.value})}
          style={{width:'100%', padding:'16px', borderRadius:'16px', background:'#f3f4f6', border:'none', outline:'none', fontSize:'14px'}}
          required
        />
        {error && <p style={{color:'red', fontSize:'14px'}}>{error}</p>}
        <button
          type="submit"
          disabled={loading}
          style={{width:'100%', padding:'16px', borderRadius:'16px', background:'#CBFF00', fontWeight:'bold', border:'none', cursor:'pointer', fontSize:'14px'}}
        >
          {loading ? '...' : isLogin ? 'Se connecter' : 'Créer un compte'}
        </button>
      </form>

      <p style={{textAlign:'center', fontSize:'14px', color:'#9ca3af', marginBottom:'32px'}}>
        {isLogin ? "Pas de compte ? " : "Déjà un compte ? "}
        <span
          onClick={() => setIsLogin(!isLogin)}
          style={{fontWeight:'bold', color:'black', cursor:'pointer'}}
        >
          {isLogin ? "S'inscrire" : "Connexion"}
        </span>
      </p>
    </div>
  );
}
