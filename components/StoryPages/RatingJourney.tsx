'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from "react";
import { UserStats } from '@/lib/types';
import { TrendingUp, Trophy } from "lucide-react"

interface RatingJourneyProps {
    stats: UserStats;
    onNext: () => void;
}

export default function RatingJourney({ stats, onNext }: RatingJourneyProps) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsVisible(true);
    }, []);
    return (
        <div className="fixed inset-0 w-screen h-screen flex items-center justify-center p-6 bg-[#020617] overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-purple-900/20 pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.95, y: isVisible ? 0 : 20 }}
                transition={{ duration: 0.8, ease: "circOut" }}
                className="glass-card max-w-7xl w-full p-8 md:p-16 flex flex-col items-center text-center space-y-12 relative z-10 h-auto max-h-[90vh]"
            >
                <div className="space-y-4">
                    <h1 className="text-5xl md:text-7xl font-black font-heading tracking-tighter text-white drop-shadow-2xl">
                        Rating Journey
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-400 font-light tracking-wide">
                        Climbing the leaderboards
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 w-full max-w-6xl">
                    {/*current rating tile*/}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -50 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="bg-gradient-to-br from-[#1e2540] to-[#0f172a] rounded-[2.5rem] p-10 flex flex-col items-center text-center space-y-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-blue-500/20 group hover:scale-[1.02] transition-transform duration-500"
                    >
                        <div className="w-32 h-32 rounded-full bg-[#2d3a6e] flex items-center justify-center shadow-inner group-hover:bg-blue-600 transition-colors duration-500">
                            <TrendingUp className="w-16 h-16 text-blue-400 group-hover:text-white transition-colors duration-300" />
                        </div>

                        <div className="space-y-4">
                            <p className="text-blue-200 text-lg font-bold uppercase tracking-widest opacity-80">Current Rating</p>
                            <h2 className={`text-7xl md:text-8xl font-black ${stats.rating.currentColor} drop-shadow-lg`}>
                                {stats.rating.current}
                            </h2>
                            <p className="text-xl text-[#dbeafe] font-medium">{stats.rating.currentRank}</p>
                        </div>
                    </motion.div>

                    {/* max rating tile */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 50 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="bg-gradient-to-br from-[#321313] to-[#1a0505] rounded-[2.5rem] p-10 flex flex-col items-center text-center space-y-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-red-500/20 group hover:scale-[1.02] transition-transform duration-500"
                    >
                        <div className="w-32 h-32 rounded-full bg-[#521b1b] flex items-center justify-center shadow-inner group-hover:bg-red-600 transition-colors duration-500">
                            <Trophy className="w-16 h-16 text-[#fca5a5] group-hover:text-white transition-colors duration-300" />
                        </div>

                        <div className="space-y-4">
                            <p className="text-[#fecaca] text-lg font-bold uppercase tracking-widest opacity-80">Peak Rating</p>
                            <h2 className={`text-7xl md:text-8xl font-black ${stats.rating.maxColor} drop-shadow-lg`}>
                                {stats.rating.maxRating}
                            </h2>
                            <p className="text-xl text-[#fecaca] font-medium">{stats.rating.maxRank}</p>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    )
}