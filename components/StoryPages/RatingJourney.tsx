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
        <div className="h-full w-full flex items-center justify-center p-6 bg-black">
            <div className="max-w-5xl w-full space-y-16 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -20 }}
                    transition={{ duration: 0.8 }}
                    className="text-center space-y-4"
                >
                    <h1 className="text-5xl md:text-6xl font-black font-heading tracking-tight text-white/90">
                        Rating Journey
                    </h1>
                    <p className="text-xl text-gray-400 font-medium">Your competitive achievements</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    {/*current rating tile*/}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -50 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="bg-[#1e2540] rounded-3xl p-10 flex flex-col items-center text-center space-y-8 shadow-2xl border border-white/5"
                    >
                        <div className="w-24 h-24 rounded-full bg-[#2d3a6e] flex items-center justify-center">
                            <TrendingUp className="w-10 h-10 text-blue-400" />
                        </div>

                        <div className="space-y-4">
                            <p className="text-blue-200 text-lg font-medium">Current Rating</p>
                            <h2 className={`text-6xl font-black ${stats.rating.currentColor}`}>
                                {stats.rating.current}
                            </h2>
                            <p className="text-lg text-[#dbeafe]">{stats.rating.currentRank}</p>
                        </div>
                    </motion.div>

                    {/* max rating tile */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 50 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="bg-[#321313] rounded-3xl p-10 flex flex-col items-center text-center space-y-8 shadow-2xl border border-white/5"
                    >
                        <div className="w-24 h-24 rounded-full bg-[#521b1b] flex items-center justify-center">
                            <Trophy className="w-10 h-10 text-[#fca5a5]" />
                        </div>

                        <div className="space-y-4">
                            <p className="text-[#fecaca] text-lg font-medium">Max Rating</p>
                            <h2 className={`text-6xl font-black ${stats.rating.maxColor}`}>
                                {stats.rating.maxRating}
                            </h2>
                            <p className="text-lg text-[#fecaca]">{stats.rating.maxRank}</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}