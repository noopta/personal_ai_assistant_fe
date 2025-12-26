import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Navigation from './components/Navigation';
import LandingPage from './pages/LandingPage';
import ProductPage from './pages/ProductPage';
import IntegrationsPage from './pages/IntegrationsPage';
import AboutPage from './pages/AboutPage';
import DemosPage from './pages/DemosPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import MockDemoPage from './pages/MockDemoPage';
import MockDemoAltPage from './pages/MockDemoAltPage';
import MockDemoCalendarPage from './pages/MockDemoCalendarPage';
import MockDemoFullPage from './pages/MockDemoFullPage';
import MockDemoChatFullPage from './pages/MockDemoChatFullPage';
import MockDemoMeetingPage from './pages/MockDemoMeetingPage';
import OAuth2CallbackPage from './pages/OAuth2CallbackPage';
import FeedbackDashboard from './pages/FeedbackDashboard';
import { ThemeProvider } from './contexts/ThemeContext';
import StripeGradient from './components/StripeGradient';
import MadeInCanada from './components/MadeInCanada';
import FeedbackButton from './components/FeedbackButton';
import FeedbackModal from './components/FeedbackModal';
import './App.css';

function App() {
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  return (
    <ThemeProvider>
      <Router>
        <div className="App">
          <StripeGradient />
          <Routes>
            {/* OAuth callback route without navigation */}
            <Route path="/oauth2callback" element={<OAuth2CallbackPage />} />
            
            {/* Hidden feedback dashboard - no navigation */}
            <Route path="/hidden-feedback" element={<FeedbackDashboard />} />
            
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
                    <Route path="/demos" element={<DemosPage />} />
                    <Route path="/privacy" element={<PrivacyPolicyPage />} />
                    <Route path="/terms" element={<TermsOfServicePage />} />
                    <Route path="/mock-demo" element={<MockDemoPage />} />
                    <Route path="/mock-demo-alt" element={<MockDemoAltPage />} />
                    <Route path="/mock-demo-calendar" element={<MockDemoCalendarPage />} />
                    <Route path="/mock-demo-full" element={<MockDemoFullPage />} />
                    <Route path="/mock-demo-chat-full" element={<MockDemoChatFullPage />} />
                    <Route path="/mock-demo-meeting" element={<MockDemoMeetingPage />} />
                  </Routes>
                </main>
                <MadeInCanada />
                <FeedbackButton onClick={() => setIsFeedbackOpen(true)} />
                <FeedbackModal 
                  isOpen={isFeedbackOpen} 
                  onClose={() => setIsFeedbackOpen(false)} 
                />
              </>
            } />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;