'use client';

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { UserStats } from "@/lib/types";
import { Trophy } from "lucide-react";

interface IntroStoryProps {
    stats: UserStats;
    onNext: () => void;
}

export default function IntroStory({ stats, onNext }: IntroStoryProps) {
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsVisible(true);
    }, []);
    return (
        <div className="h-full w-full flex items-center justify-center p-8 bg-gradient-to-br from-[#1a1d24] via-black to-[#0d1016]">
            <div className="flex flex-col items-center justify-center space-y-12 text-center max-w-lg">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="space-y-4"
                >
                    <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-xs font-mono text-gray-400 mb-2 border border-white/5">
                        2025 WRAPPED
                    </span>
                    <h1 className="text-5xl md:text-6xl font-black font-heading tracking-tight text-white leading-tight">
                        Your Year <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 text-glow">
                            In Code
                        </span>
                    </h1>
                </motion.div>

                <motion.div
                    initial={{ scale: 0, opacity: 0, rotate: -180 }}
                    animate={{ scale: isVisible ? 1 : 0, opacity: isVisible ? 1 : 0, rotate: isVisible ? 0 : -180 }}
                    transition={{ delay: 0.3, duration: 0.8, type: "spring", stiffness: 100 }}
                    className="relative"
                >
                    <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-xl opacity-30 animate-pulse-glow" />
                    <div className="relative w-40 h-40 rounded-full bg-black border border-white/10 p-1 flex items-center justify-center shadow-2xl ring-1 ring-white/10">
                        <div className="w-full h-full rounded-full bg-gradient-to-tr from-gray-900 to-black flex items-center justify-center">
                            <Trophy className="w-16 h-16 text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]" />
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                    className="glass-card px-8 py-4 rounded-2xl"
                >
                    <h2 className="text-2xl font-bold text-white mb-1 tracking-wide">@{stats.handle}</h2>
                    <p className={`text-lg font-medium ${stats.rating.currentColor}`}>
                        {stats.rating.currentRank}
                    </p>
                </motion.div>
            </div>
        </div>
    );
}