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
        <div className="fixed inset-0 w-screen h-screen flex items-center justify-center p-6 bg-[#020617] overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-transparent to-blue-900/20 pointer-events-none" />

            <div className="flex flex-col items-center justify-center space-y-16 text-center max-w-4xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="space-y-6"
                >
                    <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 text-sm font-mono text-indigo-300 mb-4 border border-white/5 backdrop-blur-md uppercase tracking-widest">
                        Codeforces Wrapped 2025
                    </span>
                    <h1 className="text-6xl md:text-8xl font-black font-heading tracking-tight text-white leading-tight drop-shadow-2xl">
                        Your Year <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500 text-glow">
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
                    <div className="absolute -inset-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full blur-3xl opacity-20 animate-pulse-glow" />
                    <div className="relative w-48 h-48 md:w-60 md:h-60 rounded-full bg-black border border-white/10 p-2 flex items-center justify-center shadow-2xl ring-1 ring-white/10">
                        <div className="w-full h-full rounded-full bg-gradient-to-tr from-gray-900 to-black flex items-center justify-center">
                            <Trophy className="w-24 h-24 text-yellow-400 drop-shadow-[0_0_30px_rgba(250,204,21,0.5)]" />
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                    className="glass-card px-10 py-6 rounded-3xl border border-white/5"
                >
                    <h2 className="text-3xl md:text-4xl font-black text-white mb-2 tracking-wide">@{stats.handle}</h2>
                    <p className={`text-xl font-medium ${stats.rating.currentColor}`}>
                        {stats.rating.currentRank}
                    </p>
                </motion.div>
            </div>
        </div>
    );
}