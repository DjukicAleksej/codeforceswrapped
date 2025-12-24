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
        <div className="h-full w-full flex items-center justify-center p-6 bg-gradient-to-br from-[#1c1917] via-black to-[#3f3f46]">
            <div className="max-w-2xl w-full space-y-12 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-2"
                >
                    <h1 className="text-4xl md:text-5xl font-black font-heading tracking-tight text-white">
                        Power Level
                    </h1>
                    <p className="text-lg text-gray-400">The verdict is in</p>
                </motion.div>

                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: isVisible ? 1 : 0.8, opacity: isVisible ? 1 : 0 }}
                    transition={{ delay: 0.3, duration: 1, type: "spring" }}
                    className="glass-card p-10 flex flex-col items-center gap-8 border-yellow-500/20 bg-gradient-to-b from-yellow-500/5 to-transparent relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-yellow-500/10 blur-3xl opacity-20 animate-pulse-glow" />

                    <div className="relative">
                        <div className="absolute -inset-4 bg-yellow-400 rounded-full blur-xl opacity-40 animate-pulse" />
                        <div className="relative w-32 h-32 rounded-full bg-black border-2 border-yellow-400 flex items-center justify-center shadow-[0_0_30px_rgba(250,204,21,0.4)]">
                            <Zap className="w-16 h-16 text-yellow-400 fill-yellow-400" />
                        </div>
                    </div>

                    <div className="space-y-4 relative z-10">
                        <h2 className={`text-4xl md:text-5xl font-black ${stats.PowerClass.color} tracking-tight drop-shadow-md`}>
                            {stats.PowerClass.title}
                        </h2>
                        <p className="text-xl text-white/80 font-medium max-w-sm mx-auto leading-relaxed">
                            &ldquo;{stats.PowerClass.description}&rdquo;
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}