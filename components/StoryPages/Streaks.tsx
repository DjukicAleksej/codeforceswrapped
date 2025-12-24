'use client';

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { UserStats } from "@/lib/types";
import { Flame } from "lucide-react";

interface StreakProps {
  stats: UserStats;
  onNext: () => void;
}

export default function Streaks({ stats, onNext }: StreakProps) {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsVisible(true);
  }, []);

  return (
    <div className="fixed inset-0 w-screen h-screen flex items-center justify-center p-6 bg-[#020617] overflow-hidden">
      {/* Background with Red/Orange Theme for "Streaks" */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-transparent to-orange-900/20 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.95, y: isVisible ? 0 : 20 }}
        transition={{ duration: 0.8, ease: "circOut" }}
        className="glass-card max-w-7xl w-full p-10 md:p-20 flex flex-col items-center justify-center text-center space-y-16 relative z-10"
      >
        <div className="space-y-6">
          <h1 className="text-6xl md:text-8xl font-black font-heading tracking-tighter text-white drop-shadow-2xl">
            Unstoppable
          </h1>
          <p className="text-2xl md:text-3xl text-slate-400 font-light tracking-wide">
            Consistency is your superpower
          </p>
        </div>

        <motion.div
          className="flex flex-col items-center gap-10"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: isVisible ? 1 : 0.8, opacity: isVisible ? 1 : 0 }}
          transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
        >
          {/* Huge Circular Icon */}
          <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-b from-[#7f1d1d] to-black flex items-center justify-center shadow-[0_0_80px_rgba(220,38,38,0.4)] border-8 border-white/5 relative group">
            <Flame className="w-32 h-32 md:w-40 md:h-40 text-red-500 fill-red-500/20 group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute -bottom-8 bg-black/80 backdrop-blur-md border border-white/10 px-8 py-3 rounded-full">
              <p className="text-xl md:text-2xl font-bold text-orange-400 whitespace-nowrap">Current Streak</p>
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <h2 className="text-[10rem] md:text-[12rem] font-black text-white tracking-widest leading-none drop-shadow-[0_0_50px_rgba(255,255,255,0.2)]">
              {stats.longestStreak}
            </h2>
            <p className="text-3xl md:text-4xl text-slate-500 font-medium uppercase tracking-[0.3em]">Days</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="w-full"
        >
          <div className="inline-flex items-center gap-6 bg-white/5 border border-white/10 px-12 py-8 rounded-3xl backdrop-blur-md hover:bg-white/10 transition-colors">
            <span className="text-slate-400 text-xl font-bold uppercase tracking-wider">Most Active Month</span>
            <div className="h-8 w-px bg-white/10" />
            <span className="text-4xl font-black text-white tracking-wide">{stats.mostActiveMonth}</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}