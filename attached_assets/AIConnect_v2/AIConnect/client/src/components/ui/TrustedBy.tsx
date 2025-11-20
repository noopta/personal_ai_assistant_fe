import { motion } from "framer-motion";

const companies = [
  "ACME Corp", "Stark Ind", "Massive Dynamic", "Cyberdyne", "Tyrell Corp"
];

export function TrustedBy() {
  return (
    <section className="py-10 border-y border-border bg-muted/20 backdrop-blur-sm overflow-hidden">
      <div className="container px-4 mx-auto text-center">
        <p className="text-xs md:text-sm text-muted-foreground mb-8 font-medium tracking-[0.2em] uppercase opacity-70">Trusted by forward-thinking teams at</p>
        
        <div className="relative max-w-4xl mx-auto">
          {/* Gradient Masks for "Fade Out" effect */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />

          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 hover:opacity-80 transition-all duration-500 grayscale">
            {companies.map((company, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-xl md:text-2xl font-display font-bold text-foreground cursor-default tracking-tighter"
              >
                {company}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
