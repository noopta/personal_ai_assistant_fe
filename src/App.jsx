import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import LandingPage from './pages/LandingPage';
import ProductPage from './pages/ProductPage';
import IntegrationsPage from './pages/IntegrationsPage';
import AboutPage from './pages/AboutPage';
import OAuth2CallbackPage from './pages/OAuth2CallbackPage';
import { ThemeProvider } from './contexts/ThemeContext';
import MadeInCanada from './components/MadeInCanada';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* OAuth callback route without navigation */}
            <Route path="/oauth2callback" element={<OAuth2CallbackPage />} />
            
            {/* Regular routes with navigation */}
            <Route path="/*" element={
              <>
                <Navigation />
                <main>
                  <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/product" element={<ProductPage />} />
                    <Route path="/integrations" element={<IntegrationsPage />} />
                    <Route path="/about" element={<AboutPage />} />
                  </Routes>
                </main>
                <MadeInCanada />
              </>
            } />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;