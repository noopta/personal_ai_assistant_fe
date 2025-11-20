import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4"
    >
      <div className="glass-panel rounded-full px-6 py-3 flex items-center justify-between w-full max-w-5xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
            <Zap className="w-4 h-4 text-primary" />
          </div>
          <span className="font-display font-bold text-lg tracking-tight text-foreground">Synapse.ai</span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <a href="#features" className="hover:text-foreground transition-colors">Capabilities</a>
          <a href="#how-it-works" className="hover:text-foreground transition-colors">Workflow</a>
          <a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <div className="flex items-center gap-4 ml-2">
            <a href="#" className="hidden sm:block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Sign In</a>
            <Button className="rounded-full bg-foreground text-background hover:bg-foreground/90 font-medium px-6 h-9 text-sm transition-all shadow-lg hover:shadow-xl">
              Get Early Access
            </Button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
