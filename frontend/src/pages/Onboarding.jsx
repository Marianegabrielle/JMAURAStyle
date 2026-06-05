import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const slides = [
  {
    id: 0,
    label: 'Bienvenue',
    title: 'Ton dressing,\ndigitalisé.',
    subtitle: 'Ajoute tes vêtements en quelques secondes et accède à ta garde-robe partout.',
    type: 'single',
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80',
  },
  {
    id: 1,
    label: 'Météo',
    title: 'Habillée selon\nla météo.',
    subtitle: "L'IA analyse la météo en temps réel et compose ta tenue idéale pour la journée.",
    type: 'single',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80',
  },
  {
    id: 2,
    label: 'Intelligence',
    title: "L'IA compose,\ntu brilles.",
    subtitle: "En quelques secondes, reçois une tenue complète adaptée à ton style et à l'occasion.",
    type: 'single',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80',
  },
  {
    id: 3,
    label: 'Prête ?',
    title: 'Chaque jour,\nun nouveau look.',
    subtitle: 'Retrouve tes tenues passées, évite les répétitions, évolue avec ton style.',
    type: 'whering',
    images: [
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=400&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80',
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400&q=80',
    ],
  },
];

const primaryBtn = {
  width: '100%', padding: '17px', borderRadius: '100px',
  background: '#1A1814', color: '#FAF8F4', border: 'none',
  fontSize: '15px', fontWeight: 500, cursor: 'pointer',
  fontFamily: "'DM Sans', sans-serif",
};
const secondaryBtn = {
  width: '100%', padding: '16px', borderRadius: '100px',
  background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(10px)',
  color: '#FAF8F4', border: '1.5px solid rgba(255,255,255,0.3)',
  fontSize: '15px', fontWeight: 500, cursor: 'pointer',
  fontFamily: "'DM Sans', sans-serif",
};

function WheringGrid({ images }) {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      {/* Photo gauche — décalée vers le haut */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0 }}
        style={{
          position: 'absolute', left: '-2%', top: '0', width: '38%', height: '62%',
          borderRadius: '0 0 20px 0', overflow: 'hidden', zIndex: 1,
        }}
      >
        <img src={images[0]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
      </motion.div>

      {/* Photo centre — plus grande, légèrement décalée */}
      <motion.div
        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        style={{
          position: 'absolute', left: '50%', transform: 'translateX(-50%)',
          top: '3%', width: '40%', height: '65%',
          borderRadius: '20px', overflow: 'hidden', zIndex: 2,
          boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
        }}
      >
        <img src={images[1]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
      </motion.div>

      {/* Photo droite — décalée vers le bas */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{
          position: 'absolute', right: '-2%', top: '8%', width: '38%', height: '60%',
          borderRadius: '20px 0 0 20px', overflow: 'hidden', zIndex: 1,
        }}
      >
        <img src={images[2]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
      </motion.div>

      {/* Gradient bas */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 3,
        background: 'linear-gradient(to top, rgba(10,8,6,0.97) 30%, rgba(10,8,6,0.5) 60%, rgba(10,8,6,0.15) 80%, transparent 100%)',
      }} />
    </div>
  );
}

export default function Onboarding({ onDone }) {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const slide = slides[index];
  const isLast = index === slides.length - 1;

  const next = () => {
    if (index < slides.length - 1) { setDir(1); setIndex(i => i + 1); }
    else onDone();
  };
  const goTo = (i) => { setDir(i > index ? 1 : -1); setIndex(i); };

  return (
    <div style={{ width: '100%', minHeight: '100vh', background: '#0A0806', display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>

      {/* Background */}
      <AnimatePresence mode="wait">
        {slide.type === 'single' ? (
          <motion.div key={slide.id}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            style={{ position: 'absolute', inset: 0, zIndex: 0 }}
          >
            <img src={slide.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,8,6,0.95) 38%, rgba(10,8,6,0.3) 65%, transparent 100%)' }} />
          </motion.div>
        ) : (
          <motion.div key="whering" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }} style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
            <WheringGrid images={slide.images} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bouton passer */}
      {!isLast && (
        <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={onDone}
          style={{ position: 'absolute', top: '52px', right: '24px', background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '100px', padding: '8px 18px', fontSize: '13px', color: 'white', cursor: 'pointer', zIndex: 10 }}>
          Passer
        </motion.button>
      )}

      {/* Contenu bas */}
      <div style={{ position: 'relative', zIndex: 4, marginTop: 'auto', padding: '0 clamp(24px, 5vw, 80px) clamp(40px, 6vh, 64px)' }}>
        <AnimatePresence mode="wait">
          <motion.div key={`text-${slide.id}`}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, delay: 0.15 }}>
            <p style={{ fontSize: 'clamp(9px, 1.2vw, 11px)', fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#C9A96E', marginBottom: '10px' }}>
              {slide.label}
            </p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(2.2rem, 5vw, 4rem)', fontWeight: 300, lineHeight: 1.1, color: '#FAF8F4', marginBottom: '14px', whiteSpace: 'pre-line' }}>
              {slide.title}
            </h2>
            <p style={{ fontSize: 'clamp(13px, 1.5vw, 16px)', lineHeight: 1.65, color: 'rgba(255,255,255,0.62)', marginBottom: '36px', maxWidth: '520px' }}>
              {slide.subtitle}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Dots */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '28px' }}>
          {slides.map((_, i) => (
            <motion.div key={i} onClick={() => goTo(i)}
              animate={{ width: i === index ? 28 : 6, background: i === index ? '#C9A96E' : 'rgba(255,255,255,0.3)' }}
              transition={{ duration: 0.3 }}
              style={{ height: '6px', borderRadius: '100px', cursor: 'pointer' }} />
          ))}
        </div>

        {/* Boutons */}
        <div style={{ maxWidth: '480px' }}>
          {isLast ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <motion.button whileTap={{ scale: 0.97 }} onClick={() => navigate('/auth?mode=register')} style={primaryBtn}>
                Créer un compte
              </motion.button>
              <motion.button whileTap={{ scale: 0.97 }} onClick={() => navigate('/auth?mode=login')} style={secondaryBtn}>
                Se connecter
              </motion.button>
            </div>
          ) : (
            <motion.button whileTap={{ scale: 0.97 }} onClick={next}
              style={{ ...secondaryBtn, width: 'auto', padding: '14px 36px' }}>
              Continuer →
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
}