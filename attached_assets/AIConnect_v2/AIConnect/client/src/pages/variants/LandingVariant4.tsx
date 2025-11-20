import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Save, Square, Minus } from "lucide-react";
import img from "@assets/generated_images/Retro_90s_vaporwave_computer_landscape_b653d4e5.png";

export default function LandingVariant4() {
  return (
    <div className="min-h-screen bg-[#008080] font-mono selection:bg-[#ff00ff] selection:text-white p-1">
      
      {/* Desktop Icons */}
      <div className="fixed top-8 left-4 flex flex-col gap-6 z-0">
        {['My Computer', 'Network', 'Recycle Bin', 'Synapse.exe'].map((icon, i) => (
          <div key={i} className="flex flex-col items-center gap-1 w-20 group cursor-pointer">
            <div className="w-10 h-10 bg-white border-2 border-black group-hover:bg-[#000080] transition-colors" />
            <span className="text-white text-xs bg-[#008080] px-1 group-hover:bg-[#000080]">{icon}</span>
          </div>
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto pt-12">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-[#c0c0c0] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)]"
        >
          {/* Window Title Bar */}
          <div className="bg-[#000080] px-2 py-1 flex justify-between items-center">
            <span className="text-white font-bold tracking-wider">Welcome to Synapse AI - v1.0</span>
            <div className="flex gap-1">
              <Button size="icon" className="h-5 w-5 rounded-none bg-[#c0c0c0] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-black p-0 hover:bg-[#c0c0c0]">
                <Minus className="w-3 h-3 text-black" />
              </Button>
              <Button size="icon" className="h-5 w-5 rounded-none bg-[#c0c0c0] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-black p-0 hover:bg-[#c0c0c0]">
                <Square className="w-3 h-3 text-black" />
              </Button>
              <Button size="icon" className="h-5 w-5 rounded-none bg-[#c0c0c0] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-black p-0 hover:bg-[#c0c0c0]">
                <span className="text-black font-bold text-xs">X</span>
              </Button>
            </div>
          </div>

          {/* Window Content */}
          <div className="p-1">
            <div className="bg-white border-2 border-black border-t-black border-l-black border-b-white border-r-white p-6">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <img src={img} alt="Vaporwave" className="w-full md:w-64 border-2 border-gray-400 shadow-inner" />
                
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold text-[#ff00ff] drop-shadow-[2px_2px_0px_rgba(0,0,0,1)] mb-6 font-display italic">
                    AESTHETIC<br/>AUTOMATION
                  </h1>
                  <p className="text-lg mb-6 leading-relaxed">
                    Experience the future of productivity. <br/>
                    Upload your consciousness to the cloud. <br/>
                    Let the machine handle the mundane.
                  </p>
                  
                  <div className="flex gap-4">
                    <Button className="rounded-none bg-[#c0c0c0] text-black border-t-2 border-l-2 border-white border-b-2 border-r-2 border-black active:border-t-black active:border-l-black active:border-b-white active:border-r-white active:translate-y-1">
                      <Save className="w-4 h-4 mr-2" />
                      Save Time
                    </Button>
                    <Button variant="ghost" className="rounded-none border-2 border-dashed border-black hover:bg-[#c0c0c0]">
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t-2 border-gray-300 pt-4">
                <div className="w-full bg-gray-200 h-6 border-2 border-gray-500 relative overflow-hidden">
                  <div className="absolute top-0 left-0 bottom-0 w-2/3 bg-[#000080] flex items-center justify-center">
                    <span className="text-white text-xs">Loading Success... 66%</span>
                  </div>
                  {/* Scanlines overlay */}
                  <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Taskbar */}
      <div className="fixed bottom-0 left-0 right-0 h-10 bg-[#c0c0c0] border-t-2 border-white flex items-center px-2 gap-2 z-50">
        <Button className="rounded-none bg-[#c0c0c0] text-black border-t-2 border-l-2 border-white border-b-2 border-r-2 border-black px-4 font-bold italic flex gap-2 items-center active:bg-gray-400">
          <img src="/favicon.png" className="w-4 h-4" />
          Start
        </Button>
        <div className="h-full w-[2px] bg-gray-400 mx-1" />
        <div className="flex-1 bg-black/10 border border-white/50 border-b-white/10 border-r-white/10 h-7 flex items-center px-2 shadow-inner">
          <span className="text-xs">Synapse AI - Active</span>
        </div>
        <div className="bg-[#c0c0c0] border-2 border-gray-500 border-b-white border-r-white px-2 h-7 flex items-center text-xs">
          12:00 PM
        </div>
      </div>
    </div>
  );
}
