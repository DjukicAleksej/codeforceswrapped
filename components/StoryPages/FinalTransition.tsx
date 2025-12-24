'use client';

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { UserStats } from "@/lib/types";
import { Sparkles } from "lucide-react";

interface FinalTransitionProps {
    stats: UserStats;
    onNext: () => void;
}

export default function FinalTransition({ stats, onNext }: FinalTransitionProps) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsVisible(true);

        const timer = setTimeout(() => {
            onNext();
        }, 3500);
        return () => clearTimeout(timer);
    }, [onNext]);

    return (
        <div className="h-full w-full flex items-center justify-center bg-black relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 mesh-bg opacity-30 animate-pulse-glow" />

            <div className="max-w-2xl w-full p-8 text-center relative z-10 space-y-12">
                <motion.div
                    initial={{ scale: 0, rotate: -180, opacity: 0 }}
                    animate={{ scale: isVisible ? 1 : 0, rotate: isVisible ? 0 : -180, opacity: isVisible ? 1 : 0 }}
                    transition={{ duration: 1, type: "spring", stiffness: 50 }}
                    className="flex justify-center"
                >
                    <div className="relative">
                        <div className="absolute inset-0 bg-white blur-3xl opacity-30" />
                        <motion.div
                            animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                            transition={{ rotate: { duration: 10, repeat: Infinity, ease: "linear" }, scale: { duration: 2, repeat: Infinity } }}
                        >
                            <Sparkles className="w-32 h-32 text-white drop-shadow-[0_0_30px_white]" />
                        </motion.div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 1 }}
                    className="space-y-6"
                >
                    <h1 className="text-5xl md:text-7xl font-black font-heading text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-glow tracking-tighter loading-tight">
                        It&apos;s Time
                    </h1>

                    <p className="text-2xl text-white/50 font-light tracking-wide">
                        Your 2025 Wrapped awaits...
                    </p>
                </motion.div>
            </div>
        </div>
    );
}