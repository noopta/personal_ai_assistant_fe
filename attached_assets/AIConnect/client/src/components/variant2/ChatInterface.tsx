import { Send } from "lucide-react";
import { useEffect, useState } from "react";

const messages = [
  { type: 'input', text: "> Initiate protocol: Clear_Schedule" },
  { type: 'system', text: "[SYSTEM] Analyzing calendar data..." },
  { type: 'system', text: "[SYSTEM] Found 3 conflicts. resolving..." },
  { type: 'output', text: "SUCCESS: Afternoon cleared. 4 hours of deep work allocated." },
];

export function ChatInterface() {
  const [lines, setLines] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setLines(prev => (prev < messages.length ? prev + 1 : prev));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 bg-[#f0f0f0] border-t-2 border-black">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="bg-black border-2 border-black shadow-[12px_12px_0px_0px_#3b82f6]">
          {/* Terminal Header */}
          <div className="bg-neutral-800 border-b-2 border-neutral-700 p-2 flex items-center gap-2">
            <div className="flex gap-1.5 ml-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <div className="mx-auto font-mono text-xs text-neutral-400">terminal_session_01</div>
          </div>

          {/* Terminal Body */}
          <div className="p-6 md:p-10 font-mono text-sm md:text-base h-[400px] flex flex-col text-green-400 bg-black/95">
            <div className="flex-1 space-y-4">
              {messages.map((msg, i) => (
                <div 
                  key={i} 
                  className={`transition-opacity duration-300 ${i < lines ? 'opacity-100' : 'opacity-0'}`}
                >
                  {msg.type === 'input' && <span className="text-white">{msg.text}</span>}
                  {msg.type === 'system' && <span className="text-blue-400">{msg.text}</span>}
                  {msg.type === 'output' && <span className="text-green-400">{msg.text}</span>}
                </div>
              ))}
              {lines >= messages.length && (
                <div className="animate-pulse">_</div>
              )}
            </div>

            <div className="mt-8 flex gap-2 border-t border-neutral-800 pt-4">
               <span className="text-blue-500">{">"}</span>
               <input 
                 type="text" 
                 placeholder="Enter command..." 
                 className="bg-transparent border-none outline-none text-white w-full placeholder:text-neutral-700"
                 disabled
               />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
