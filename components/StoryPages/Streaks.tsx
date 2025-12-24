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
    <div className="h-full w-full flex items-center justify-center p-6 bg-gradient-to-br from-[#450a0a] via-black to-[#1c1917]">
      <div className="max-w-2xl w-full space-y-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-2"
        >
          <h1 className="text-4xl md:text-5xl font-black font-heading tracking-tight text-white">
            Unstoppable
          </h1>
          <p className="text-lg text-gray-400">Consistency is your superpower</p>
        </motion.div>

        <div className="flex flex-col items-center gap-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: isVisible ? 1 : 0.8, opacity: isVisible ? 1 : 0 }}
            transition={{ delay: 0.3, duration: 1, type: "spring" }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-red-500/20 rounded-full blur-3xl animate-pulse-glow" />

            <div className="relative w-48 h-48 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-tr from-orange-500 to-red-600 rounded-full opacity-20 animate-spin-slow group-hover:opacity-40 transition-opacity" />
              <div className="absolute inset-4 bg-black rounded-full border border-orange-500/30 flex items-center justify-center shadow-[0_0_50px_rgba(239,68,68,0.2)]">
                <Flame className="w-24 h-24 text-orange-500 fill-orange-500/20 drop-shadow-[0_0_15px_rgba(249,115,22,0.5)]" />
              </div>
            </div>

            <motion.div
              className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-md border border-orange-500/30 px-6 py-2 rounded-full whitespace-nowrap"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <span className="text-3xl font-black text-white">{stats.longestStreak}</span>
              <span className="text-xs text-orange-400 ml-2 font-bold uppercase tracking-widest">Day Streak</span>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="w-full max-w-sm glass-card p-6 text-center border-orange-500/20 bg-gradient-to-b from-orange-900/10 to-transparent"
          >
            <h3 className="text-sm font-medium text-orange-300 uppercase tracking-widest mb-2">Most Active Month</h3>
            <p className="text-3xl font-bold text-white tracking-wide">
              {stats.mostActiveMonth}
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}