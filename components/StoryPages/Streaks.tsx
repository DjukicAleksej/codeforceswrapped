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
    <div className="h-full w-full flex items-center justify-center p-6 bg-gradient-to-br from-[#1a0f0f] via-black to-[#0f0a0a]">
      <div className="max-w-3xl w-full space-y-12 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -20 }}
          transition={{ duration: 0.8 }}
          className="space-y-4"
        >
          <h1 className="text-5xl md:text-6xl font-black font-heading tracking-tight text-white">
            Consistency is Key
          </h1>
          <p className="text-xl text-gray-400 font-medium">Your dedication shows in the numbers</p>
        </motion.div>

        <motion.div
          className="flex flex-col items-center gap-8"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: isVisible ? 1 : 0.8, opacity: isVisible ? 1 : 0 }}
          transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
        >
          {/* Huge Circular Icon */}
          <div className="w-56 h-56 rounded-full bg-gradient-to-b from-[#d94625] to-[#7f1d1d] flex items-center justify-center shadow-[0_0_50px_rgba(220,38,38,0.3)] border-4 border-white/5 relative">
            <Flame className="w-24 h-24 text-white stroke-[1.5]" />
          </div>

          <div className="space-y-2">
            <h2 className="text-8xl font-black text-white tracking-widest leading-none drop-shadow-2xl">
              {stats.longestStreak}
            </h2>
            <p className="text-2xl text-gray-400 font-medium">Day Streak</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="inline-block"
        >
          <div className="bg-[#320f0f] border border-red-500/20 px-12 py-6 rounded-2xl shadow-xl flex flex-col gap-2">
            <span className="text-orange-400 text-lg font-medium">Most Active Month</span>
            <span className="text-4xl font-black text-white">{stats.mostActiveMonth}</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}