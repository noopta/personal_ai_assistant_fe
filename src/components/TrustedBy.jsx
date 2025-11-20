import { motion } from "framer-motion";

const companies = [
  "ACME Corp", "Stark Ind", "Massive Dynamic", "Cyberdyne", "Tyrell Corp"
];

export function TrustedBy() {
  return (
    <section className="trustedby-section" style={{
      padding: '2.5rem 0',
      borderTop: '1px solid var(--border)',
      borderBottom: '1px solid var(--border)',
      backdropFilter: 'blur(4px)',
      overflow: 'hidden'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 1rem',
        textAlign: 'center'
      }}>
        <p style={{
          fontSize: '0.75rem',
          color: 'var(--muted-foreground)',
          marginBottom: '2rem',
          fontWeight: '500',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          opacity: '0.7'
        }}>
          Trusted by forward-thinking teams at
        </p>
        
        <div style={{ position: 'relative', maxWidth: '64rem', margin: '0 auto' }}>
          <div style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: '5rem',
            background: 'linear-gradient(to right, var(--background), transparent)',
            zIndex: 10
          }} />
          <div style={{
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 0,
            width: '5rem',
            background: 'linear-gradient(to left, var(--background), transparent)',
            zIndex: 10
          }} />

          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '2rem 4rem',
            opacity: '0.5',
            filter: 'grayscale(1)',
            transition: 'all 0.5s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = '0.8';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = '0.5';
          }}>
            {companies.map((company, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: 'var(--foreground)',
                  cursor: 'default',
                  letterSpacing: '-0.05em'
                }}
              >
                {company}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      <style>{`
        .trustedby-section {
          background: hsl(240 4.8% 95.9% / 0.2);
        }
        
        .dark .trustedby-section {
          background: hsl(240 3.7% 15.9% / 0.2);
        }
      `}</style>
    </section>
  );
}
