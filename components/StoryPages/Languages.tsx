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
    <div className="h-full w-full flex items-center justify-center p-6 bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-black">
      <div className="max-w-2xl w-full space-y-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-2"
        >
          <h1 className="text-4xl md:text-5xl font-black font-heading tracking-tight text-white">
            Language Mastery
          </h1>
          <p className="text-lg text-gray-400">The tools of your trade</p>
        </motion.div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: isVisible ? 1 : 0.9, opacity: isVisible ? 1 : 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="glass-card p-8 flex flex-col items-center text-center space-y-6 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-pink-500/10 to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />

          <motion.div
            className="relative p-4 bg-pink-500/20 rounded-full ring-1 ring-pink-500/50 shadow-[0_0_30px_rgba(236,72,153,0.3)]"
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.6 }}
          >
            <Code2 className="w-10 h-10 text-pink-400" />
          </motion.div>

          <div className="relative z-10">
            <h2 className="text-xl font-bold text-gray-300 mb-1">Most Used</h2>
            <p className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 text-glow">
              {stats.topLanguage || "C++"}
            </p>
          </div>
        </motion.div>

        {stats.languageStats && (
          <motion.div
            className="grid grid-cols-2 gap-4"
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
                  'from-purple-500/20 to-indigo-500/20 border-purple-500/30 text-purple-300',
                  'from-blue-500/20 to-cyan-500/20 border-blue-500/30 text-blue-300',
                  'from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-300',
                  'from-orange-500/20 to-amber-500/20 border-orange-500/30 text-orange-300'
                ];

                return (
                  <motion.div
                    key={language}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 }
                    }}
                    whileHover={{ scale: 1.02, translateY: -2 }}
                    className={`bg-gradient-to-br ${gradients[index]} p-4 rounded-xl border backdrop-blur-sm shadow-lg flex flex-col justify-between h-32 relative overflow-hidden`}
                  >
                    <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/5 rounded-full blur-2xl pointer-events-none" />
                    <p className="font-medium opacity-80 z-10">{language}</p>
                    <div className="z-10">
                      <p className="text-3xl font-bold text-white">{count}</p>
                      <p className="text-xs opacity-60">submissions</p>
                    </div>
                  </motion.div>
                );
              })}
          </motion.div>
        )}
      </div>
    </div>
  );
}