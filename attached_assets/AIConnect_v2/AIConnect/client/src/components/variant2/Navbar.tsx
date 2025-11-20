import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b-2 border-black py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 border-2 border-black flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <span className="font-mono font-bold text-white text-lg">S</span>
          </div>
          <span className="font-display font-bold text-xl tracking-tighter text-black uppercase">Synapse_OS</span>
        </div>

        <div className="hidden md:flex items-center gap-8 font-mono text-sm font-bold uppercase tracking-wider">
          <a href="#" className="text-black hover:text-blue-600 hover:underline decoration-2 underline-offset-4 transition-all">Modules</a>
          <a href="#" className="text-black hover:text-blue-600 hover:underline decoration-2 underline-offset-4 transition-all">Protocol</a>
          <a href="#" className="text-black hover:text-blue-600 hover:underline decoration-2 underline-offset-4 transition-all">Access</a>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <a href="#" className="font-mono text-sm font-bold uppercase hover:text-blue-600">Log In</a>
          <Button className="rounded-none border-2 border-black bg-blue-600 text-white font-bold uppercase hover:bg-blue-500 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all active:shadow-none active:translate-x-[2px] active:translate-y-[2px]">
            Initialize
          </Button>
        </div>

        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-[100%] left-0 right-0 bg-white border-b-2 border-black p-4 flex flex-col gap-4 shadow-xl">
          <a href="#" className="font-mono font-bold uppercase">Modules</a>
          <a href="#" className="font-mono font-bold uppercase">Protocol</a>
          <a href="#" className="font-mono font-bold uppercase">Access</a>
          <Button className="w-full rounded-none border-2 border-black bg-blue-600 text-white font-bold uppercase">
            Initialize
          </Button>
        </div>
      )}
    </nav>
  );
}
