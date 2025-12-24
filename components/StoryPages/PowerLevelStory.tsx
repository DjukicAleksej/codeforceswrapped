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
            <div className="max-w-3xl w-full space-y-16 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -20 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-4"
                >
                    <h1 className="text-5xl md:text-6xl font-black font-heading tracking-tight text-white mb-2">
                        Your Power Level
                    </h1>
                    <p className="text-xl text-gray-400 font-medium tracking-wide">Based on your incredible achievements</p>
                </motion.div>

                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: isVisible ? 1 : 0.5, opacity: isVisible ? 1 : 0 }}
                    transition={{ delay: 0.3, duration: 0.8, type: "spring", bounce: 0.4 }}
                    className="relative mx-auto w-fit"
                >
                    <div className="w-56 h-56 rounded-full border-[6px] border-gradient-to-tr from-yellow-500 to-orange-600 p-2 flex items-center justify-center relative bg-gradient-to-b from-[#2a2a2a] to-black shadow-2xl">
                        <div className="absolute inset-0 rounded-full border-4 border-yellow-500/50 blur-md pointer-events-none"></div>
                        <Zap className="w-24 h-24 text-white fill-white" />
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="space-y-6"
                >
                    <h2 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 drop-shadow-[0_0_15px_rgba(34,211,238,0.3)] tracking-tight uppercase">
                        {stats.PowerClass.title} 🌊
                    </h2>
                    <p className="text-2xl text-gray-400 max-w-xl mx-auto font-medium">
                        Embarking on an epic coding journey!
                    </p>
                </motion.div>
            </div>
        </div>
    );
}