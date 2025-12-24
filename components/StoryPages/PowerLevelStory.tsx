'use client';

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { UserStats } from "@/lib/types";
import { Zap } from "lucide-react";

interface PowerLevelStoryProps {
    stats: UserStats;
    onNext: () => void;
}

export default function PowerLevelStory({ stats, onNext }: PowerLevelStoryProps) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsVisible(true);
    }, []);

    return (
        <div className="fixed inset-0 w-screen h-screen flex items-center justify-center p-6 bg-[#020617] overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-transparent to-cyan-400/20 pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.95, y: isVisible ? 0 : 20 }}
                transition={{ duration: 0.8, ease: "circOut" }}
                className="glass-card max-w-7xl w-full p-10 md:p-20 flex flex-col items-center justify-center text-center space-y-16 relative z-10"
            >
                <div className="space-y-6">
                    <h1 className="text-6xl md:text-8xl font-black font-heading tracking-tighter text-white drop-shadow-2xl">
                        Power Level
                    </h1>
                    <p className="text-2xl md:text-3xl text-slate-400 font-light tracking-wide">
                        The verdict is in
                    </p>
                </div>

                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: isVisible ? 1 : 0.5, opacity: isVisible ? 1 : 0 }}
                    transition={{ delay: 0.3, duration: 0.8, type: "spring", bounce: 0.4 }}
                    className="relative"
                >
                    <div className="w-64 h-64 md:w-80 md:h-80 rounded-full border-[8px] border-white/5 bg-gradient-to-br from-[#1e1b4b] to-black flex items-center justify-center relative shadow-[0_0_100px_rgba(250,204,21,0.2)]">
                        <div className="absolute inset-0 rounded-full border-4 border-yellow-500/20 animate-pulse-glow" />
                        <Zap className="w-32 h-32 md:w-40 md:h-40 text-yellow-400 fill-yellow-400 drop-shadow-[0_0_30px_rgba(250,204,21,0.6)]" />
                    </div>
                </motion.div>

                <div className="space-y-8">
                    <h2 className={`text-6xl md:text-8xl font-black ${stats.PowerClass.color} tracking-tight uppercase drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]`}>
                        {stats.PowerClass.title}
                    </h2>
                    <p className="text-2xl md:text-3xl text-slate-300 max-w-2xl mx-auto font-medium leading-relaxed opacity-90">
                        &ldquo;{stats.PowerClass.description}&rdquo;
                    </p>
                </div>
            </motion.div>
        </div>
    );
}