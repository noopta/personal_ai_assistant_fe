import { GlassNav } from '../components/GlassNav';
import { GlassHero } from '../components/GlassHero';
import { GlassFeatures } from '../components/GlassFeatures';

export default function LandingPageGlass() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--background)', color: 'var(--foreground)', overflowX: 'hidden' }}>
      <GlassNav />
      <main>
        <GlassHero />
        <GlassFeatures />
        
        {/* Footer */}
        <footer style={{
          padding: '48px 0',
          borderTop: '1px solid rgba(0, 0, 0, 0.05)',
          background: 'rgba(0, 0, 0, 0.02)'
        }}>
          <div style={{
            maxWidth: '1280px',
            padding: '0 16px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px'
          }} className="footer-container">
            <div style={{ textAlign: 'center' }} className="footer-left">
              <div style={{ fontWeight: 'bold', fontSize: '20px', marginBottom: '8px' }}>AirThreads</div>
              <p style={{ fontSize: '14px', color: 'var(--muted-foreground)' }}>© 2025 AirThreads. All rights reserved.</p>
            </div>
            <div style={{
              display: 'flex',
              gap: '24px',
              fontSize: '14px',
              color: 'var(--muted-foreground)',
              justifyContent: 'center'
            }}>
              <a href="#" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }}>Privacy</a>
              <a href="#" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }}>Terms</a>
              <a href="#" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }}>Twitter</a>
            </div>
          </div>
        </footer>
      </main>

      <style>{`
        @media (min-width: 768px) {
          .footer-container {
            flex-direction: row !important;
            justify-content: space-between !important;
            align-items: center !important;
          }
          .footer-left {
            text-align: left !important;
          }
        }
        
        .footer-container a:hover {
          color: var(--foreground) !important;
        }
      `}</style>
    </div>
  );
}
