import { Box, Cpu, Layers, Zap } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Hyper-Speed",
    desc: "Zero-latency execution of complex command chains."
  },
  {
    icon: Layers,
    title: "Multi-Modal",
    desc: "Voice, text, or API injection. We handle it all."
  },
  {
    icon: Cpu,
    title: "Neural Net",
    desc: "Self-learning algorithms adapt to your specific workflow."
  },
  {
    icon: Box,
    title: "Sandboxed",
    desc: "Enterprise-grade isolation for maximum security protocol."
  }
];

export function Features() {
  return (
    <section className="py-24 bg-black text-white border-t-2 border-black">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <h2 className="text-5xl md:text-7xl font-display font-black uppercase tracking-tighter leading-none">
            Core <br/>
            <span className="text-transparent text-stroke-white">Modules</span>
          </h2>
          <p className="font-mono text-white/60 max-w-md text-right md:text-left border-l-2 border-white/30 pl-4">
            // SYSTEM_CAPABILITIES <br/>
            Deploying advanced automation infrastructure for the modern operator.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <div key={i} className="group relative bg-neutral-900 border-2 border-white/20 p-6 hover:bg-blue-600 hover:border-black hover:text-white transition-colors duration-300">
              <div className="absolute top-4 right-4 font-mono text-xs opacity-30 group-hover:opacity-100">0{i+1}</div>
              <div className="w-12 h-12 bg-white text-black border-2 border-transparent group-hover:border-black flex items-center justify-center mb-6 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] group-hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all">
                <f.icon className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-2xl uppercase mb-2">{f.title}</h3>
              <p className="font-mono text-sm opacity-70">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
