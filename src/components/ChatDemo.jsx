import { motion } from "framer-motion";
import { Avatar, AvatarFallback } from "./Avatar";
import { Send } from "lucide-react";
import { useEffect, useState } from "react";

const messages = [
  { role: "user", text: "Clear my afternoon for deep work." },
  { role: "ai", text: "I see 3 meetings. Moving 'Weekly Sync' to tomorrow and declining the rest. Your calendar is now clear from 1 PM to 5 PM." },
];

export function ChatDemo() {
  const [visibleMessages, setVisibleMessages] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleMessages((prev) => (prev < messages.length ? prev + 1 : prev));
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="chat-demo-section" style={{ padding: '6rem 0', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: '64rem', margin: '0 auto', padding: '0 1rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 'bold',
            marginBottom: '1rem',
            color: 'var(--foreground)'
          }}>
            It feels like <span style={{
              background: 'linear-gradient(to right, var(--primary), var(--accent), var(--primary))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>magic.</span>
          </h2>
          <p style={{ color: 'var(--muted-foreground)' }}>Natural language is the new user interface.</p>
        </div>

        <div className="glass-panel" style={{
          borderRadius: '1.5rem',
          border: '1px solid var(--border)',
          padding: '4px',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.1)',
          background: 'rgba(var(--background), 0.4)'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '3rem',
            background: 'var(--muted)',
            opacity: 0.5,
            borderBottom: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            padding: '0 1rem',
            gap: '0.5rem'
          }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'rgba(239, 68, 68, 0.5)' }} />
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'rgba(234, 179, 8, 0.5)' }} />
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'rgba(34, 197, 94, 0.5)' }} />
            <div style={{ marginLeft: 'auto', fontSize: '0.75rem', color: 'var(--muted-foreground)', fontFamily: 'monospace' }}>
              agent_v2.0.exe
            </div>
          </div>

          <div style={{
            marginTop: '3rem',
            padding: '2rem',
            minHeight: '400px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            gap: '1.5rem',
            background: 'rgba(var(--background), 0.8)',
            backdropFilter: 'blur(4px)'
          }}>
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ 
                  opacity: i < visibleMessages ? 1 : 0,
                  y: i < visibleMessages ? 0 : 20,
                  scale: i < visibleMessages ? 1 : 0.95
                }}
                transition={{ duration: 0.4 }}
                style={{
                  display: 'flex',
                  gap: '1rem',
                  flexDirection: msg.role === 'user' ? 'row-reverse' : 'row'
                }}
              >
                <Avatar style={{
                  width: '40px',
                  height: '40px',
                  border: '1px solid var(--border)',
                  flexShrink: 0
                }}>
                  <AvatarFallback className={msg.role === 'ai' ? 'bg-primary' : 'bg-muted'} style={{
                    background: msg.role === 'ai' ? 'var(--primary)' : 'var(--muted)',
                    color: msg.role === 'ai' ? 'var(--primary-foreground)' : 'var(--foreground)'
                  }}>
                    {msg.role === 'ai' ? 'AI' : 'You'}
                  </AvatarFallback>
                </Avatar>
                
                <div className={msg.role === 'ai' ? 'ai-message' : 'user-message'} style={{
                  borderRadius: '1rem',
                  padding: '1rem',
                  maxWidth: '80%',
                  color: 'var(--foreground)',
                  borderTopRightRadius: msg.role === 'user' ? '0' : '1rem',
                  borderTopLeftRadius: msg.role === 'ai' ? '0' : '1rem'
                }}>
                  <p style={{ fontSize: 'clamp(0.875rem, 2vw, 1rem)', lineHeight: '1.6' }}>{msg.text}</p>
                </div>
              </motion.div>
            ))}

            <div style={{ position: 'relative', marginTop: '1rem' }}>
              <div style={{
                height: '3.5rem',
                background: 'var(--muted)',
                opacity: 0.5,
                borderRadius: '9999px',
                border: '1px solid var(--border)',
                display: 'flex',
                alignItems: 'center',
                padding: '0 1.5rem',
                color: 'var(--muted-foreground)',
                fontSize: '0.875rem'
              }}>
                Type a command...
              </div>
              <div style={{
                position: 'absolute',
                right: '0.5rem',
                top: '0.5rem',
                width: '2.5rem',
                height: '2.5rem',
                background: 'var(--primary)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Send style={{ width: '16px', height: '16px', color: 'var(--primary-foreground)' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        .chat-demo-section {
          background: transparent;
        }
        
        .user-message {
          background: var(--muted);
        }
        
        .ai-message {
          background: var(--muted);
          border: 1px solid var(--border);
        }
        
        /* Theme-specific AI message backgrounds */
        :root .ai-message {
          background: hsl(252 90% 55% / 0.1);
          border: 1px solid hsl(252 90% 55% / 0.2);
        }
        
        .theme-crimson .ai-message {
          background: hsl(0 84% 60% / 0.1);
          border: 1px solid hsl(0 84% 60% / 0.2);
        }
        
        .theme-tangerine .ai-message {
          background: hsl(24 95% 53% / 0.1);
          border: 1px solid hsl(24 95% 53% / 0.2);
        }
        
        .theme-canary .ai-message {
          background: hsl(45 93% 47% / 0.1);
          border: 1px solid hsl(45 93% 47% / 0.2);
        }
        
        .theme-emerald .ai-message {
          background: hsl(142 71% 45% / 0.1);
          border: 1px solid hsl(142 71% 45% / 0.2);
        }
        
        .theme-teal .ai-message {
          background: hsl(180 100% 40% / 0.1);
          border: 1px solid hsl(180 100% 40% / 0.2);
        }
        
        .theme-azure .ai-message {
          background: hsl(217 91% 60% / 0.1);
          border: 1px solid hsl(217 91% 60% / 0.2);
        }
        
        .theme-indigo .ai-message {
          background: hsl(240 80% 60% / 0.1);
          border: 1px solid hsl(240 80% 60% / 0.2);
        }
        
        .theme-violet .ai-message {
          background: hsl(270 90% 60% / 0.1);
          border: 1px solid hsl(270 90% 60% / 0.2);
        }
        
        .theme-magenta .ai-message {
          background: hsl(320 90% 60% / 0.1);
          border: 1px solid hsl(320 90% 60% / 0.2);
        }
      `}</style>
    </section>
  );
}
