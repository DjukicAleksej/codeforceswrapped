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
        <div className="h-full w-full flex items-center justify-center p-6 bg-gradient-to-br from-[#172554] via-[#020617] to-black">
            <div className="max-w-2xl w-full space-y-10 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
                    transition={{ duration: 0.8 }}
                    className="text-center space-y-2"
                >
                    <h1 className="text-4xl md:text-5xl font-black font-heading tracking-tight text-white">
                        Rating Journey
                    </h1>
                    <p className="text-lg text-gray-400">Climbing the leaderboards</p>
                </motion.div>

                <div className="grid grid-cols-2 gap-4">
                    {/*current rating tile*/}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: isVisible ? 1 : 0.9, opacity: isVisible ? 1 : 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        whileHover={{ scale: 1.02 }}
                        className="glass-card p-6 flex flex-col items-center justify-center space-y-4 border-blue-500/20 bg-blue-500/5 group"
                    >
                        <motion.div
                            className="p-4 bg-blue-500/20 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.2)]"
                            whileHover={{ rotate: 360, scale: 1.1 }}
                            transition={{ duration: 0.6 }}
                        >
                            <TrendingUp className="w-8 h-8 text-blue-400" />
                        </motion.div>

                        <div className="text-center">
                            <p className="text-blue-300/60 text-xs font-bold uppercase tracking-widest mb-2">Current</p>
                            <h2 className={`text-4xl font-black ${stats.rating.currentColor} drop-shadow-lg`}>
                                {stats.rating.current}
                            </h2>
                            <p className={`text-sm mt-1 text-gray-300 font-medium opacity-80 group-hover:opacity-100 transition-opacity`}>
                                {stats.rating.currentRank}
                            </p>
                        </div>
                    </motion.div>

                    {/* max rating tile */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: isVisible ? 1 : 0.9, opacity: isVisible ? 1 : 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        whileHover={{ scale: 1.02 }}
                        className="glass-card p-6 flex flex-col items-center justify-center space-y-4 border-orange-500/20 bg-orange-500/5 group"
                    >
                        <motion.div
                            className="p-4 bg-orange-500/20 rounded-full shadow-[0_0_20px_rgba(249,115,22,0.2)]"
                            whileHover={{ rotate: 360, scale: 1.1 }}
                            transition={{ duration: 0.6 }}
                        >
                            <Trophy className="w-8 h-8 text-orange-400" />
                        </motion.div>

                        <div className="text-center">
                            <p className="text-orange-300/60 text-xs font-bold uppercase tracking-widest mb-2">Peak</p>
                            <h2 className={`text-4xl font-black ${stats.rating.maxColor} drop-shadow-lg`}>
                                {stats.rating.maxRating}
                            </h2>
                            <p className={`text-sm mt-1 text-gray-300 font-medium opacity-80 group-hover:opacity-100 transition-opacity`}>
                                {stats.rating.maxRank}
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}