'use client';

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { UserStats } from "@/lib/types";

interface ProblemSolvingProps {
    stats: UserStats;
    onNext: () => void;
}

export default function ProblemSolving({ stats, onNext }: ProblemSolvingProps) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsVisible(true);
    }, []);

    const averageSubmissions = Math.round(stats.totalSubmissions / 365);
    const averageText = averageSubmissions === 0 ? "<1" : averageSubmissions;

    return (
        <div className="fixed inset-0 w-screen h-screen flex items-center justify-center p-6 bg-[#020617] overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 via-transparent to-blue-900/20 pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.95, y: isVisible ? 0 : 20 }}
                transition={{ duration: 0.8, ease: "circOut" }}
                className="glass-card max-w-7xl w-full p-8 md:p-16 flex flex-col items-center justify-center text-center space-y-12 relative z-10"
            >
                <div className="space-y-4">
                    <h1 className="text-5xl md:text-7xl font-black font-heading tracking-tighter text-white drop-shadow-2xl">
                        Problem Solving
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-400 font-light tracking-wide">
                        The grind never stops
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-8 w-full max-w-4xl">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: isVisible ? 1 : 0.8, opacity: isVisible ? 1 : 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="bg-white/5 p-10 rounded-[2rem] flex flex-col items-center justify-center text-center space-y-4 border border-white/10 hover:bg-white/10 transition-colors"
                    >
                        <h3 className="text-6xl md:text-8xl font-black text-green-400 drop-shadow-[0_0_30px_rgba(74,222,128,0.3)]">
                            {stats.problemsSolved}
                        </h3>
                        <p className="text-lg font-bold text-slate-400 uppercase tracking-widest">
                            Solved
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: isVisible ? 1 : 0.8, opacity: isVisible ? 1 : 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="bg-white/5 p-10 rounded-[2rem] flex flex-col items-center justify-center text-center space-y-4 border border-white/10 hover:bg-white/10 transition-colors"
                    >
                        <h3 className="text-6xl md:text-8xl font-black text-blue-400 drop-shadow-[0_0_30px_rgba(96,165,250,0.3)]">
                            {stats.totalSubmissions}
                        </h3>
                        <p className="text-lg font-bold text-slate-400 uppercase tracking-widest">
                            Submissions
                        </p>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                    transition={{ delay: 1, duration: 0.8 }}
                    className="glass-panel px-12 py-8 rounded-full border border-white/10"
                >
                    <p className="text-xl md:text-3xl text-slate-200 font-light leading-relaxed">
                        That&apos;s an average of <span className="font-black text-white">{averageText}</span> submissions per day!
                    </p>
                </motion.div>
            </motion.div>
        </div>
    );
}
