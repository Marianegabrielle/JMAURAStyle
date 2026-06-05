import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Shirt, Sparkles, Clock, User } from 'lucide-react';

const tabs = [
  { icon:Home,     label:'Accueil',    path:'/' },
  { icon:Shirt,    label:'Dressing',   path:'/wardrobe' },
  { icon:Sparkles, label:'Tenue',      path:'/generate' },
  { icon:Clock,    label:'Historique', path:'/history' },
  { icon:User,     label:'Profil',     path:'/profile' },
];

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div style={{ position:'fixed', bottom:0, left:'50%', transform:'translateX(-50%)', width:'100%', maxWidth:'430px', background:'rgba(255,255,255,0.92)', backdropFilter:'blur(20px)', WebkitBackdropFilter:'blur(20px)', borderTop:'1px solid #F2EDE4', display:'flex', justifyContent:'space-around', alignItems:'center', padding:'10px 8px 24px', zIndex:100 }}>
      {tabs.map(({ icon:Icon, label, path }) => {
        const active = location.pathname === path;
        return (
          <motion.button key={path} onClick={()=>navigate(path)} whileTap={{ scale:0.85 }}
            style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'5px', background:'none', border:'none', cursor:'pointer', flex:1, WebkitTapHighlightColor:'transparent', position:'relative' }}>
            <Icon size={21} color={active?'#1A1814':'#C4BDB5'} strokeWidth={active?2:1.5} style={{ transition:'all 0.25s' }} />
            <span style={{ fontSize:'9px', fontWeight:active?600:400, color:active?'#1A1814':'#C4BDB5', letterSpacing:'0.06em', transition:'all 0.25s' }}>{label}</span>
            {active && (
              <motion.div layoutId="nav-dot"
                style={{ position:'absolute', bottom:'-10px', width:'4px', height:'4px', borderRadius:'50%', background:'#C9A96E' }}
                transition={{ type:'spring', stiffness:500, damping:30 }} />
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
