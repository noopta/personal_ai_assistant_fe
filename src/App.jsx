import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { GlassNav } from './components/GlassNav';
import LandingPageGlass from './pages/LandingPageGlass';
import ProductPage from './pages/ProductPage';
import IntegrationsPage from './pages/IntegrationsPage';
import AboutPage from './pages/AboutPage';
import OAuth2CallbackPage from './pages/OAuth2CallbackPage';
import { ThemeProvider } from './contexts/ThemeContext';
import MadeInCanada from './components/MadeInCanada';
import './App.css';

function AppContent() {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';

  return (
    <>
      {!isLandingPage && <GlassNav />}
      <main>
        <Routes>
          <Route path="/" element={<LandingPageGlass />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/integrations" element={<IntegrationsPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </main>
      {/* Only show MadeInCanada footer on non-landing pages */}
      {!isLandingPage && <MadeInCanada />}
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* OAuth callback route without navigation */}
            <Route path="/oauth2callback" element={<OAuth2CallbackPage />} />
            
            {/* Regular routes with navigation */}
            <Route path="/*" element={<AppContent />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;