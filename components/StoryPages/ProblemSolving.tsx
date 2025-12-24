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
        <div className="h-full w-full flex items-center justify-center p-6 bg-gradient-to-br from-black via-[#0c0a09] to-[#1c1917]">
            <div className="max-w-2xl w-full space-y-10 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
                    transition={{ duration: 0.8 }}
                    className="text-center space-y-2"
                >
                    <h1 className="text-4xl md:text-5xl font-black font-heading tracking-tight text-white leading-tight">
                        Problem Solving
                    </h1>
                    <p className="text-lg text-gray-400">The grind never stops</p>
                </motion.div>

                <div className="grid grid-cols-2 gap-4">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: isVisible ? 1 : 0.8, opacity: isVisible ? 1 : 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="glass-card p-6 flex flex-col items-center justify-center text-center space-y-2 border-green-500/20 bg-green-500/5 hover:bg-green-500/10"
                    >
                        <h3 className="text-5xl md:text-6xl font-black text-green-400 drop-shadow-lg">
                            {stats.problemsSolved}
                        </h3>
                        <p className="text-sm font-medium text-gray-400 uppercase tracking-widest">
                            Solved
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: isVisible ? 1 : 0.8, opacity: isVisible ? 1 : 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="glass-card p-6 flex flex-col items-center justify-center text-center space-y-2 border-blue-500/20 bg-blue-500/5 hover:bg-blue-500/10"
                    >
                        <h3 className="text-5xl md:text-6xl font-black text-blue-400 drop-shadow-lg">
                            {stats.totalSubmissions}
                        </h3>
                        <p className="text-sm font-medium text-gray-400 uppercase tracking-widest">
                            Submissions
                        </p>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                    transition={{ delay: 1, duration: 0.8 }}
                    className="glass-card p-8 text-center bg-gradient-to-r from-purple-900/20 to-blue-900/20 border-white/5"
                >
                    <p className="text-xl md:text-2xl text-gray-200 font-light">
                        That&apos;s an average of <br />
                        <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                            {averageText} submissions
                        </span> <br />
                        per day!
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
