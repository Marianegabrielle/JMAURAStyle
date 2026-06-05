import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import SplashScreen from './components/SplashScreen';
import Onboarding from './pages/Onboarding';
import Auth from './pages/Auth';
import Home from './pages/Home';
import Wardrobe from './pages/Wardrobe';
import Generate from './pages/Generate';
import History from './pages/History';
import Profile from './pages/Profile';

function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'#FAF8F4' }}>
      <div style={{ width:'32px', height:'32px', borderRadius:'50%', border:'2px solid #F2EDE4', borderTopColor:'#1A1814', animation:'spin 0.8s linear infinite' }} />
    </div>
  );
  return user ? children : <Navigate to="/auth?mode=login" />;
}

function AppRoutes({ onboardingDone, setOnboardingDone }) {
  const { user } = useAuth();
  if (!onboardingDone && !user) {
    return <Onboarding onDone={() => setOnboardingDone(true)} />;
  }
  return (
    <Routes>
      <Route path="/auth" element={user ? <Navigate to="/" /> : <Auth />} />
      <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
      <Route path="/wardrobe" element={<PrivateRoute><Wardrobe /></PrivateRoute>} />
      <Route path="/generate" element={<PrivateRoute><Generate /></PrivateRoute>} />
      <Route path="/history" element={<PrivateRoute><History /></PrivateRoute>} />
      <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

function AppWithRouter({ onboardingDone, setOnboardingDone }) {
  return (
    <BrowserRouter>
      <AppRoutes onboardingDone={onboardingDone} setOnboardingDone={setOnboardingDone} />
    </BrowserRouter>
  );
}

export default function App() {
  const [splashDone, setSplashDone] = useState(false);
  const [onboardingDone, setOnboardingDone] = useState(
    () => localStorage.getItem('jm_onboarding_done') === 'true'
  );

  const handleOnboardingDone = () => {
    localStorage.setItem('jm_onboarding_done', 'true');
    setOnboardingDone(true);
  };

  return (
    <AuthProvider>
      {!splashDone && <SplashScreen onDone={() => setSplashDone(true)} />}
      <AppWithRouter onboardingDone={onboardingDone} setOnboardingDone={handleOnboardingDone} />
    </AuthProvider>
  );
}