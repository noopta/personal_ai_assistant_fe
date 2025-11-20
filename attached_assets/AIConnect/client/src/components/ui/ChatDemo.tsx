import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send } from "lucide-react";
import { useEffect, useState } from "react";

const messages = [
  { role: "user", text: "Clear my afternoon for deep work." },
  { role: "ai", text: "I see 3 meetings. Moving 'Weekly Sync' to tomorrow and declining the rest. Your calendar is now clear from 1 PM to 5 PM." },
];

export function ChatDemo() {
  const [visibleMessages, setVisibleMessages] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleMessages((prev) => (prev < messages.length ? prev + 1 : prev));
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container px-4 mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 text-foreground">It feels like <span className="text-primary">magic.</span></h2>
          <p className="text-muted-foreground">Natural language is the new user interface.</p>
        </div>

        <div className="glass-panel rounded-3xl border border-border p-1 relative overflow-hidden shadow-2xl shadow-primary/10 bg-background/40">
           {/* Window Controls */}
           <div className="absolute top-0 left-0 right-0 h-12 bg-muted/50 border-b border-border flex items-center px-4 gap-2">
             <div className="w-3 h-3 rounded-full bg-red-500/50" />
             <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
             <div className="w-3 h-3 rounded-full bg-green-500/50" />
             <div className="ml-auto text-xs text-muted-foreground font-mono">agent_v2.0.exe</div>
           </div>

           <div className="mt-12 p-6 sm:p-8 min-h-[400px] flex flex-col justify-end space-y-6 bg-background/80 backdrop-blur-sm">
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
                 className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
               >
                 <Avatar className="w-10 h-10 border border-border">
                   <AvatarImage src={msg.role === 'ai' ? "/ai-avatar.png" : "/user-avatar.png"} />
                   <AvatarFallback className={msg.role === 'ai' ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground'}>
                     {msg.role === 'ai' ? 'AI' : 'You'}
                   </AvatarFallback>
                 </Avatar>
                 
                 <div className={`rounded-2xl p-4 max-w-[80%] ${
                   msg.role === 'user' 
                     ? 'bg-muted text-foreground rounded-tr-none' 
                     : 'bg-primary/10 text-foreground border border-primary/20 rounded-tl-none'
                 }`}>
                   <p className="text-sm md:text-base leading-relaxed">{msg.text}</p>
                 </div>
               </motion.div>
             ))}

             {/* Input Area Simulation */}
             <div className="relative mt-4">
               <div className="h-14 bg-muted/50 rounded-full border border-border flex items-center px-6 text-muted-foreground text-sm">
                 Type a command...
               </div>
               <div className="absolute right-2 top-2 w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                 <Send className="w-4 h-4 text-primary-foreground" />
               </div>
             </div>
           </div>
        </div>
      </div>
    </section>
  );
}
