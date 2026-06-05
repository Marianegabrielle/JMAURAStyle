import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SplashScreen({ onDone }) {
  const [phase, setPhase] = useState('logo');
  useEffect(() => {
    const t1 = setTimeout(() => setPhase('tagline'), 1400);
    const t2 = setTimeout(() => setPhase('exit'), 2600);
    const t3 = setTimeout(() => onDone(), 3100);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onDone]);

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
          style={{ position:'fixed', inset:0, background:'#FAF8F4', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', zIndex:9999 }}
        >
          <motion.div initial={{ scale:0, opacity:0 }} animate={{ scale:1, opacity:0.1 }}
            transition={{ duration:1.2, ease:[0.34,1.56,0.64,1] }}
            style={{ position:'absolute', width:'280px', height:'280px', borderRadius:'50%', border:'1.5px solid #C9A96E' }} />
          <motion.div initial={{ scale:0, opacity:0 }} animate={{ scale:1, opacity:0.05 }}
            transition={{ duration:1.4, delay:0.1, ease:[0.34,1.56,0.64,1] }}
            style={{ position:'absolute', width:'380px', height:'380px', borderRadius:'50%', border:'1px solid #C9A96E' }} />

          <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.8 }}
            style={{ textAlign:'center', position:'relative', zIndex:1 }}>
            <motion.div
              initial={{ scale:0.6, opacity:0 }} animate={{ scale:1, opacity:1 }}
              transition={{ duration:0.6, ease:[0.34,1.56,0.64,1] }}
              style={{ width:'72px', height:'72px', borderRadius:'22px', background:'#1A1814', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 20px', boxShadow:'0 8px 32px rgba(26,24,20,0.18)' }}
            >
              <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
                <path d="M19 8 C19 8, 19 6, 21 5 C23 4, 25 5, 25 7 C25 9, 23 10, 21 10"
                  stroke="#C9A96E" strokeWidth="1.8" strokeLinecap="round" fill="none" />
                <path d="M21 10 L19 11 L6 20 C5 20.5, 5 22, 6 22 L32 22 C33 22, 33 20.5, 32 20 L19 11Z"
                  stroke="#C9A96E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                <line x1="10" y1="26" x2="28" y2="26"
                  stroke="#C9A96E" strokeWidth="1.2" strokeLinecap="round" strokeDasharray="2 3" />
              </svg>
            </motion.div>

            <motion.h1
              initial={{ opacity:0, letterSpacing:'0.4em' }} animate={{ opacity:1, letterSpacing:'0.12em' }}
              transition={{ duration:1, delay:0.2 }}
              style={{ fontFamily:"'Cormorant Garamond', Georgia, serif", fontSize:'2rem', fontWeight:300, color:'#1A1814', letterSpacing:'0.12em', textTransform:'uppercase' }}
            >Jmaura</motion.h1>
            <motion.h2
              initial={{ opacity:0, letterSpacing:'0.4em' }} animate={{ opacity:1, letterSpacing:'0.2em' }}
              transition={{ duration:1, delay:0.35 }}
              style={{ fontFamily:"'Cormorant Garamond', Georgia, serif", fontSize:'1rem', fontWeight:400, color:'#C9A96E', letterSpacing:'0.2em', textTransform:'uppercase', marginTop:'-4px' }}
            >Style</motion.h2>
            <motion.div initial={{ scaleX:0 }} animate={{ scaleX:1 }} transition={{ duration:0.6, delay:0.8 }}
              style={{ width:'40px', height:'1px', background:'#C9A96E', margin:'16px auto 0', transformOrigin:'center' }} />
          </motion.div>

          <AnimatePresence>
            {(phase === 'tagline' || phase === 'exit') && (
              <motion.p initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}
                transition={{ duration:0.5 }}
                style={{ fontSize:'12px', color:'#9A9490', letterSpacing:'0.08em', marginTop:'16px', position:'relative', zIndex:1 }}>
                Ton styliste personnel IA
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}