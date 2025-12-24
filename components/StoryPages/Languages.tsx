'use client';
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { UserStats } from "@/lib/types";
import { Code2 } from "lucide-react";

interface LanguagesProps {
  stats: UserStats;
  onNext: () => void;
}

export default function Languages({ stats, onNext }: LanguagesProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsVisible(true);
  }, []);

  return (
    <div className="fixed inset-0 w-screen h-screen flex items-center justify-center p-6 bg-[#020617] overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-900/20 via-transparent to-purple-900/20 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.95, y: isVisible ? 0 : 20 }}
        transition={{ duration: 0.8, ease: "circOut" }}
        className="glass-card max-w-7xl w-full p-8 md:p-16 flex flex-col items-center justify-center text-center space-y-12 relative z-10"
      >
        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-black font-heading tracking-tighter text-white drop-shadow-2xl">
            Language Mastery
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 font-light tracking-wide">
            The tools of your trade
          </p>
        </div>

        <motion.div
          className="relative p-6 bg-pink-500/10 rounded-full ring-1 ring-pink-500/30 shadow-[0_0_50px_rgba(236,72,153,0.1)]"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <Code2 className="w-20 h-20 text-pink-400" />
        </motion.div>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-slate-400 uppercase tracking-widest">Most Used</h2>
          <p className="text-7xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 text-glow">
            {stats.topLanguage || "C++"}
          </p>
        </div>

        {stats.languageStats && (
          <motion.div
            className="grid grid-cols-2 gap-6 w-full max-w-4xl mt-8"
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={{
              visible: { transition: { staggerChildren: 0.1 } }
            }}
          >
            {Object.entries(stats.languageStats)
              .sort(([, a], [, b]) => b - a)
              .slice(0, 4)
              .map(([language, count], index) => {
                const gradients = [
                  'from-purple-500/10 to-indigo-500/10 border-purple-500/20 text-purple-300',
                  'from-blue-500/10 to-cyan-500/10 border-blue-500/20 text-blue-300',
                  'from-emerald-500/10 to-teal-500/10 border-emerald-500/20 text-emerald-300',
                  'from-orange-500/10 to-amber-500/10 border-orange-500/20 text-orange-300'
                ];

                return (
                  <motion.div
                    key={language}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 }
                    }}
                    whileHover={{ scale: 1.02 }}
                    className={`bg-gradient-to-br ${gradients[index]} p-6 rounded-2xl border backdrop-blur-md flex flex-col items-center justify-center space-y-2 relative overflow-hidden group hover:bg-white/5 transition-colors`}
                  >
                    <p className="font-bold text-lg opacity-80">{language}</p>
                    <p className="text-4xl font-black text-white">{count}</p>
                  </motion.div>
                );
              })}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}