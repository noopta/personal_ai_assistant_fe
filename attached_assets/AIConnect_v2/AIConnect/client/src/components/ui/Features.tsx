import { motion } from "framer-motion";
import { Calendar, Mail, MessageSquare, Mic, Shield, Zap } from "lucide-react";
import featureArt from "@assets/generated_images/3D_floating_abstract_AI_core_connecting_to_calendar_icons_d1fa25ad.png";

const features = [
  {
    icon: Mic,
    title: "Voice Command",
    description: "Just speak. \"Clear my afternoon\" or \"Draft a reply to Sarah\" - done instantly."
  },
  {
    icon: Calendar,
    title: "Smart Scheduling",
    description: "The AI negotiates times, finds slots, and handles timezones automatically."
  },
  {
    icon: Mail,
    title: "Inbox Triage",
    description: "Prioritizes what matters. Drafts responses in your unique tone of voice."
  },
  {
    icon: Shield,
    title: "Private by Design",
    description: "Your data never trains our models. Enterprise-grade security encryption."
  }
];

export function Features() {
  return (
    <section id="features" className="py-24 relative z-20 bg-muted/30">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          <div className="w-full lg:w-1/2">
             <motion.div 
               initial={{ opacity: 0, x: -50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8 }}
             >
               <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-foreground">
                 The Operating System <br/>
                 <span className="text-gradient-primary">for your work life.</span>
               </h2>
               <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
                 Stop playing secretary. Our AI agent integrates deeply with your Google ecosystem to handle the busywork, so you can focus on the deep work.
               </p>

               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                 {features.map((feature, index) => (
                   <motion.div
                     key={index}
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     transition={{ delay: index * 0.1 }}
                     className="glass-panel p-6 rounded-2xl hover:bg-muted/50 transition-colors cursor-default group"
                   >
                     <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                       <feature.icon className="w-5 h-5 text-foreground group-hover:text-primary transition-colors" />
                     </div>
                     <h3 className="text-lg font-semibold mb-2 text-foreground">{feature.title}</h3>
                     <p className="text-sm text-muted-foreground">{feature.description}</p>
                   </motion.div>
                 ))}
               </div>
             </motion.div>
          </div>

          <div className="w-full lg:w-1/2 relative">
             <motion.div
               initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
               whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8 }}
               className="relative z-10"
             >
               <div className="relative rounded-3xl overflow-hidden border border-border shadow-2xl shadow-primary/20">
                 <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent mix-blend-overlay z-20 pointer-events-none" />
                 <img 
                   src={featureArt} 
                   alt="AI Core" 
                   className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                 />
               </div>
               
               {/* Floating UI Card Overlay */}
               <div className="absolute -bottom-10 -left-10 glass-panel p-4 rounded-xl max-w-xs hidden md:block animate-float bg-background/80 backdrop-blur-md">
                 <div className="flex items-start gap-3">
                   <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                     <MessageSquare className="w-4 h-4 text-green-500 dark:text-green-400" />
                   </div>
                   <div className="space-y-1">
                     <div className="text-xs text-green-500 dark:text-green-400 font-medium">Task Completed</div>
                     <p className="text-sm text-foreground/90">"I've rescheduled the strategy sync to Tuesday at 2pm as requested."</p>
                   </div>
                 </div>
               </div>
             </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
