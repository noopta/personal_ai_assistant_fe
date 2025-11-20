import { Navbar } from "@/components/ui/Navbar";
import { Hero } from "@/components/ui/Hero";
import { Features } from "@/components/ui/Features";
import { TrustedBy } from "@/components/ui/TrustedBy";
import { ChatDemo } from "@/components/ui/ChatDemo";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <TrustedBy />
        <Features />
        <ChatDemo />
        
        <footer className="py-12 border-t border-white/5 bg-black/40">
          <div className="container px-4 mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <div className="font-display font-bold text-xl mb-2">Synapse.ai</div>
              <p className="text-sm text-muted-foreground">© 2025 Synapse AI. All rights reserved.</p>
            </div>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Twitter</a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
