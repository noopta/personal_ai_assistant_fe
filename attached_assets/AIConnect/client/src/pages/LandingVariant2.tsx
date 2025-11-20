import { Navbar } from "@/components/variant2/Navbar";
import { Hero } from "@/components/variant2/Hero";
import { Features } from "@/components/variant2/Features";
import { ChatInterface } from "@/components/variant2/ChatInterface";

export default function LandingVariant2() {
  return (
    <div className="min-h-screen bg-[#f0f0f0] font-sans">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <ChatInterface />
        
        <footer className="bg-blue-600 border-t-2 border-black py-12">
          <div className="container mx-auto px-4 text-center font-mono text-white font-bold uppercase">
            <p>© 2025 Synapse_OS // All Systems Nominal</p>
          </div>
        </footer>
      </main>
    </div>
  );
}
