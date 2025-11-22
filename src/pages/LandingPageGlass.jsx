import { GlassNav } from '../components/GlassNav';
import { GlassHero } from '../components/GlassHero';
import { GlassFeatures } from '../components/GlassFeatures';
import { TrustedBy } from '../components/TrustedBy';
import { ChatDemo } from '../components/ChatDemo';
import { DesignSwitcher } from '../components/DesignSwitcher';
import MadeInCanada from '../components/MadeInCanada';

export default function LandingPageGlass() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--background)', color: 'var(--foreground)', overflowX: 'hidden' }}>
      <GlassNav />
      <main>
        <GlassHero />
        <TrustedBy />
        <GlassFeatures />
        <ChatDemo />
      </main>

      <MadeInCanada />

    </div>
  );
}
