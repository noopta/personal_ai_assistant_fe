import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { LayoutTemplate, ChevronUp, ChevronDown, Palette } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const variants = [
  { path: "/", name: "Original (Protocol)" },
  { path: "/v2", name: "Variant 2 (Brutalist)" },
  // Color Variants
  { path: "/color/crimson", name: "Crimson", color: "bg-red-500" },
  { path: "/color/tangerine", name: "Tangerine", color: "bg-orange-500" },
  { path: "/color/canary", name: "Canary", color: "bg-yellow-500" },
  { path: "/color/emerald", name: "Emerald", color: "bg-green-500" },
  { path: "/color/teal", name: "Teal", color: "bg-teal-500" },
  { path: "/color/azure", name: "Azure", color: "bg-blue-500" },
  { path: "/color/indigo", name: "Indigo", color: "bg-indigo-500" },
  { path: "/color/violet", name: "Violet", color: "bg-violet-500" },
  { path: "/color/magenta", name: "Magenta", color: "bg-pink-500" },
];

export function DesignSwitcher() {
  const [location, setLocation] = useLocation();
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 items-end">
       <Button 
         size="icon" 
         variant="outline" 
         className="rounded-full h-10 w-10 bg-background shadow-lg border-border"
         onClick={() => setIsOpen(!isOpen)}
       >
         {isOpen ? <ChevronDown className="w-4 h-4" /> : <Palette className="w-4 h-4" />}
       </Button>

       <AnimatePresence>
         {isOpen && (
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="bg-background/90 backdrop-blur-md border border-border p-2 rounded-xl shadow-2xl flex flex-col gap-1 max-h-[60vh] overflow-y-auto w-56"
            >
              <div className="text-xs font-medium text-muted-foreground px-2 py-1 sticky top-0 bg-background/90 backdrop-blur-md z-10">
                Color Variants
              </div>
              {variants.map((variant) => (
                <Button 
                  key={variant.path}
                  variant={location === variant.path ? "default" : "ghost"} 
                  size="sm" 
                  className="justify-start text-xs h-8 w-full"
                  onClick={() => setLocation(variant.path)}
                >
                  {variant.color ? (
                    <div className={`w-3 h-3 rounded-full mr-2 ${variant.color}`} />
                  ) : (
                    <LayoutTemplate className="w-3 h-3 mr-2 opacity-70" />
                  )}
                  {variant.name}
                </Button>
              ))}
            </motion.div>
         )}
       </AnimatePresence>
    </div>
  );
}
