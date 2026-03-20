import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { floatingIcons } from "../../../entities/module/data/module.data";

export function FloatingIcons() {
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setCycle((c) => c + 1), 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
        <span className="text-[150px]">📱</span>
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={cycle} className="absolute inset-0">
          {floatingIcons.map((icon, i) => (
            <motion.div
              key={i}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ x: icon.x, y: icon.y }}
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: 1,
                y: [icon.y, `calc(${icon.y} - 6px)`, icon.y],
              }}
              exit={{ scale: 0.6, opacity: 0 }}
              transition={{
                scale: { delay: i * 0.3, duration: 0.4, ease: "easeOut" },
                opacity: { delay: i * 0.3, duration: 0.4 },
                y: { delay: i * 0.3 + 1.5, duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" },
              }}
            >
              <div className="flex items-center gap-1.5 bg-card rounded-full px-3 py-1.5 shadow-card border text-xs font-medium whitespace-nowrap">
                <span>{icon.emoji}</span>
                <span className="text-foreground">{icon.label}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
