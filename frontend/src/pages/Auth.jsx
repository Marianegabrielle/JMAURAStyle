import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, Eye, EyeOff, Check } from 'lucide-react';

const STYLES = [
  { id:'casual', label:'Casual', desc:'Confort & simplicité' },
  { id:'chic', label:'Chic', desc:'Élégance au quotidien' },
  { id:'sport', label:'Sport', desc:'Actif & dynamique' },
  { id:'business', label:'Business', desc:'Professionnel & soigné' },
  { id:'streetwear', label:'Street', desc:'Urban & tendance' },
  { id:'boheme', label:'Bohème', desc:'Libre & naturel' },
];

const REGISTER_STEPS = ['email','password','name','city','style','done'];

const inputStyle = { width:'100%', padding:'16px 20px', background:'#FFFFFF', border:'1.5px solid #F2EDE4', borderRadius:'12px', fontSize:'15px', color:'#1A1814', outline:'none', fontFamily:"'DM Sans', sans-serif" };
const primaryBtn = { width:'100%', padding:'17px', borderRadius:'100px', background:'#1A1814', color:'#FAF8F4', border:'none', fontSize:'15px', fontWeight:500, cursor:'pointer', fontFamily:"'DM Sans', sans-serif" };

function StepWrapper({ children }) {
  return (
    <motion.div initial={{ opacity:0, x:30 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-30 }}
      transition={{ duration:0.3 }} style={{ display:'flex', flexDirection:'column', flex:1 }}>
      {children}<div style={{ flex:1 }} />
    </motion.div>
  );
}

function StrengthBar({ password }) {
  const s = password.length < 6 ? 1 : password.length < 10 ? 2 : 3;
  const colors = ['#C0392B','#C9A96E','#8A9E8C'];
  const labels = ['Faible','Moyen','Fort'];
  return (
    <div style={{ marginTop:'10px' }}>
      <div style={{ display:'flex', gap:'4px', marginBottom:'6px' }}>
        {[1,2,3].map(i => <div key={i} style={{ flex:1, height:'3px', borderRadius:'100px', background:i<=s?colors[s-1]:'#F2EDE4', transition:'all 0.3s' }} />)}
      </div>
      <p style={{ fontSize:'11px', color:colors[s-1] }}>{labels[s-1]}</p>
    </div>
  );
}

export default function Auth() {
  const [params] = useSearchParams();
  const mode = params.get('mode') || 'login';
  const navigate = useNavigate();
  const { login, register } = useAuth();
  const inputRef = useRef(null);

  const [loginData, setLoginData] = useState({ email:'', password:'' });
  const [showPwd, setShowPwd] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  const [step, setStep] = useState(0);
  const [regData, setRegData] = useState({ email:'', password:'', full_name:'', city:'', style:'' });
  const [regError, setRegError] = useState('');
  const [regLoading, setRegLoading] = useState(false);
  const [showRegPwd, setShowRegPwd] = useState(false);

  useEffect(() => { setTimeout(() => inputRef.current?.focus(), 300); }, [step, mode]);

  const handleLogin = async (e) => {
    e?.preventDefault(); setLoginLoading(true); setLoginError('');
    try { await login(loginData.email, loginData.password); navigate('/'); }
    catch { setLoginError('Email ou mot de passe incorrect.'); }
    finally { setLoginLoading(false); }
  };

  const currentStep = REGISTER_STEPS[step];
  const progress = (step / (REGISTER_STEPS.length - 1)) * 100;

  const nextStep = async () => {
    setRegError('');
    if (currentStep==='email') { if (!regData.email.includes('@')) return setRegError('Email invalide.'); setStep(s=>s+1); }
    else if (currentStep==='password') { if (regData.password.length<6) return setRegError('6 caractères minimum.'); setStep(s=>s+1); }
    else if (currentStep==='name') { if (!regData.full_name.trim()) return setRegError('Entre ton prénom.'); setStep(s=>s+1); }
    else if (currentStep==='city') { if (!regData.city.trim()) return setRegError('Entre ta ville.'); setStep(s=>s+1); }
    else if (currentStep==='style') {
      if (!regData.style) return setRegError('Choisis ton style.');
      setRegLoading(true);
      try { await register(regData); setStep(s=>s+1); }
      catch (err) { setRegError(err.response?.data?.detail || 'Erreur.'); }
      finally { setRegLoading(false); }
    } else if (currentStep==='done') { navigate('/'); }
  };

  if (mode==='login') return (
    <div style={{ minHeight:'100vh', background:'#FAF8F4', display:'flex', flexDirection:'column' }}>
      <div style={{ padding:'52px 24px 0' }}>
        <button onClick={()=>navigate(-1)} style={{ background:'none', border:'none', cursor:'pointer', color:'#9A9490' }}><ArrowLeft size={18}/></button>
      </div>
      <div style={{ flex:1, padding:'40px 32px 48px', display:'flex', flexDirection:'column' }}>
        <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }}>
          <p style={{ fontSize:'10px', fontWeight:600, letterSpacing:'0.14em', textTransform:'uppercase', color:'#C9A96E', marginBottom:'8px' }}>Bon retour</p>
          <h1 style={{ fontFamily:"'Cormorant Garamond', Georgia, serif", fontSize:'2.8rem', fontWeight:300, color:'#1A1814', marginBottom:'36px' }}>Connexion.</h1>
        </motion.div>
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.1 }}
          style={{ display:'flex', flexDirection:'column', gap:'14px', flex:1 }}>
          <div>
            <label style={{ fontSize:'11px', fontWeight:600, color:'#9A9490', letterSpacing:'0.08em', textTransform:'uppercase', display:'block', marginBottom:'8px' }}>Email</label>
            <input ref={inputRef} type="email" value={loginData.email} onChange={e=>setLoginData({...loginData,email:e.target.value})} placeholder="ton@email.com" style={inputStyle} />
          </div>
          <div>
            <label style={{ fontSize:'11px', fontWeight:600, color:'#9A9490', letterSpacing:'0.08em', textTransform:'uppercase', display:'block', marginBottom:'8px' }}>Mot de passe</label>
            <div style={{ position:'relative' }}>
              <input type={showPwd?'text':'password'} value={loginData.password} onChange={e=>setLoginData({...loginData,password:e.target.value})} onKeyDown={e=>e.key==='Enter'&&handleLogin()} placeholder="••••••••" style={{...inputStyle,paddingRight:'52px'}} />
              <button type="button" onClick={()=>setShowPwd(!showPwd)} style={{ position:'absolute', right:'16px', top:'50%', transform:'translateY(-50%)', background:'none', border:'none', cursor:'pointer', color:'#9A9490' }}>
                {showPwd?<EyeOff size={18}/>:<Eye size={18}/>}
              </button>
            </div>
          </div>
          {loginError && <p style={{ fontSize:'13px', color:'#C0392B' }}>{loginError}</p>}
          <div style={{ flex:1 }} />
          <motion.button whileTap={{ scale:0.97 }} onClick={handleLogin} disabled={loginLoading} style={primaryBtn}>
            {loginLoading?'Connexion…':'Se connecter'}
          </motion.button>
          <p style={{ textAlign:'center', fontSize:'14px', color:'#9A9490', marginTop:'16px' }}>
            Pas encore de compte ?{' '}
            <span onClick={()=>navigate('/auth?mode=register')} style={{ color:'#1A1814', fontWeight:600, cursor:'pointer', textDecoration:'underline', textUnderlineOffset:'3px' }}>S'inscrire</span>
          </p>
        </motion.div>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight:'100vh', background:'#FAF8F4', display:'flex', flexDirection:'column' }}>
      <div style={{ padding:'52px 24px 0' }}>
        {currentStep !== 'done' && (
          <div style={{ display:'flex', alignItems:'center', gap:'16px', marginBottom:'20px' }}>
            <button onClick={()=>step>0?setStep(s=>s-1):navigate(-1)} style={{ background:'none', border:'none', cursor:'pointer', color:'#9A9490' }}><ArrowLeft size={18}/></button>
            <div style={{ flex:1, height:'2px', background:'#F2EDE4', borderRadius:'100px', overflow:'hidden' }}>
              <motion.div animate={{ width:`${progress}%` }} transition={{ duration:0.4 }}
                style={{ height:'100%', background:'#1A1814', borderRadius:'100px' }} />
            </div>
          </div>
        )}
      </div>

      <div style={{ flex:1, padding:'24px 32px 48px', display:'flex', flexDirection:'column' }}>
        <AnimatePresence mode="wait">
          {currentStep==='email' && (
            <StepWrapper key="email">
              <p style={{ fontSize:'10px', fontWeight:600, letterSpacing:'0.14em', textTransform:'uppercase', color:'#C9A96E', marginBottom:'8px' }}>Étape 1</p>
              <h2 style={{ fontFamily:"'Cormorant Garamond', Georgia, serif", fontSize:'2.4rem', fontWeight:300, color:'#1A1814', marginBottom:'28px', whiteSpace:'pre-line' }}>{'Ton adresse\nemail.'}</h2>
              <input ref={inputRef} type="email" value={regData.email} onChange={e=>setRegData({...regData,email:e.target.value})} onKeyDown={e=>e.key==='Enter'&&nextStep()} placeholder="ton@email.com" style={inputStyle} />
            </StepWrapper>
          )}
          {currentStep==='password' && (
            <StepWrapper key="password">
              <p style={{ fontSize:'10px', fontWeight:600, letterSpacing:'0.14em', textTransform:'uppercase', color:'#C9A96E', marginBottom:'8px' }}>Étape 2</p>
              <h2 style={{ fontFamily:"'Cormorant Garamond', Georgia, serif", fontSize:'2.4rem', fontWeight:300, color:'#1A1814', marginBottom:'28px', whiteSpace:'pre-line' }}>{'Crée ton\nmot de passe.'}</h2>
              <div style={{ position:'relative' }}>
                <input ref={inputRef} type={showRegPwd?'text':'password'} value={regData.password} onChange={e=>setRegData({...regData,password:e.target.value})} onKeyDown={e=>e.key==='Enter'&&nextStep()} placeholder="6 caractères minimum" style={{...inputStyle,paddingRight:'52px'}} />
                <button type="button" onClick={()=>setShowRegPwd(!showRegPwd)} style={{ position:'absolute', right:'16px', top:'50%', transform:'translateY(-50%)', background:'none', border:'none', cursor:'pointer', color:'#9A9490' }}>
                  {showRegPwd?<EyeOff size={18}/>:<Eye size={18}/>}
                </button>
              </div>
              {regData.password.length>0 && <StrengthBar password={regData.password} />}
            </StepWrapper>
          )}
          {currentStep==='name' && (
            <StepWrapper key="name">
              <p style={{ fontSize:'10px', fontWeight:600, letterSpacing:'0.14em', textTransform:'uppercase', color:'#C9A96E', marginBottom:'8px' }}>Étape 3</p>
              <h2 style={{ fontFamily:"'Cormorant Garamond', Georgia, serif", fontSize:'2.4rem', fontWeight:300, color:'#1A1814', marginBottom:'28px', whiteSpace:'pre-line' }}>{'Comment\nte prénommes-tu ?'}</h2>
              <input ref={inputRef} type="text" value={regData.full_name} onChange={e=>setRegData({...regData,full_name:e.target.value})} onKeyDown={e=>e.key==='Enter'&&nextStep()} placeholder="Ton prénom" style={inputStyle} />
            </StepWrapper>
          )}
          {currentStep==='city' && (
            <StepWrapper key="city">
              <p style={{ fontSize:'10px', fontWeight:600, letterSpacing:'0.14em', textTransform:'uppercase', color:'#C9A96E', marginBottom:'8px' }}>Étape 4</p>
              <h2 style={{ fontFamily:"'Cormorant Garamond', Georgia, serif", fontSize:'2.4rem', fontWeight:300, color:'#1A1814', marginBottom:'12px', whiteSpace:'pre-line' }}>{'Dans quelle\nville es-tu ?'}</h2>
              <p style={{ fontSize:'13px', color:'#9A9490', marginBottom:'20px' }}>Pour adapter les suggestions météo à ton emplacement.</p>
              <input ref={inputRef} type="text" value={regData.city} onChange={e=>setRegData({...regData,city:e.target.value})} onKeyDown={e=>e.key==='Enter'&&nextStep()} placeholder="ex: Yaoundé, Paris, Douala…" style={inputStyle} />
            </StepWrapper>
          )}
          {currentStep==='style' && (
            <StepWrapper key="style">
              <p style={{ fontSize:'10px', fontWeight:600, letterSpacing:'0.14em', textTransform:'uppercase', color:'#C9A96E', marginBottom:'8px' }}>Étape 5</p>
              <h2 style={{ fontFamily:"'Cormorant Garamond', Georgia, serif", fontSize:'2.4rem', fontWeight:300, color:'#1A1814', marginBottom:'12px' }}>{'Quel est\nton style ?'}</h2>
              <p style={{ fontSize:'13px', color:'#9A9490', marginBottom:'24px' }}>L'IA s'adapte à tes préférences.</p>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px' }}>
                {STYLES.map(s => (
                  <motion.button key={s.id} whileTap={{ scale:0.96 }} onClick={()=>setRegData({...regData,style:s.id})}
                    style={{ padding:'16px 14px', borderRadius:'14px', border:`1.5px solid ${regData.style===s.id?'#1A1814':'#F2EDE4'}`, background:regData.style===s.id?'#1A1814':'#FFFFFF', color:regData.style===s.id?'#FAF8F4':'#1A1814', cursor:'pointer', textAlign:'left', transition:'all 0.2s' }}>
                    <p style={{ fontWeight:600, fontSize:'14px', marginBottom:'2px' }}>{s.label}</p>
                    <p style={{ fontSize:'11px', opacity:0.6 }}>{s.desc}</p>
                  </motion.button>
                ))}
              </div>
            </StepWrapper>
          )}
          {currentStep==='done' && (
            <motion.div key="done" initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }}
              style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', textAlign:'center' }}>
              <motion.div initial={{ scale:0 }} animate={{ scale:1 }} transition={{ delay:0.2, type:'spring', stiffness:200 }}
                style={{ width:'80px', height:'80px', borderRadius:'50%', background:'#1A1814', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'28px' }}>
                <Check size={36} color="#C9A96E" strokeWidth={2} />
              </motion.div>
              <h2 style={{ fontFamily:"'Cormorant Garamond', Georgia, serif", fontSize:'2.4rem', fontWeight:300, color:'#1A1814', marginBottom:'12px' }}>
                Bienvenue,<br />{regData.full_name.split(' ')[0]} !
              </h2>
              <p style={{ fontSize:'14px', color:'#9A9490', lineHeight:1.6 }}>Ton dressing intelligent t'attend.</p>
            </motion.div>
          )}
        </AnimatePresence>

        {regError && <p style={{ fontSize:'13px', color:'#C0392B', marginBottom:'12px' }}>{regError}</p>}

        {currentStep!=='style' && (
          <motion.button whileTap={{ scale:0.97 }} onClick={nextStep} disabled={regLoading}
            style={{ ...primaryBtn, marginTop:currentStep==='done'?'0':'auto' }}>
            {regLoading?'Création…':currentStep==='done'?'Découvrir mon dressing ✦':'Continuer'}
          </motion.button>
        )}
        {currentStep==='style' && (
          <motion.button whileTap={{ scale:0.97 }} onClick={nextStep} disabled={regLoading||!regData.style}
            style={{ ...primaryBtn, marginTop:'24px', opacity:regData.style?1:0.4 }}>
            {regLoading?'Création du compte…':'Créer mon compte'}
          </motion.button>
        )}
        {currentStep==='email' && (
          <p style={{ textAlign:'center', fontSize:'14px', color:'#9A9490', marginTop:'20px' }}>
            Déjà un compte ?{' '}
            <span onClick={()=>navigate('/auth?mode=login')} style={{ color:'#1A1814', fontWeight:600, cursor:'pointer', textDecoration:'underline', textUnderlineOffset:'3px' }}>Se connecter</span>
          </p>
        )}
      </div>
    </div>
  );
}