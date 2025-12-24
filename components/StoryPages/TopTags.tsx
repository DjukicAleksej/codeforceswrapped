'use client';

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { UserStats } from "@/lib/types"
import { Tag } from "lucide-react";

interface TopTagsProps {
    stats: UserStats;
    onNext: () => void;
}

export default function TopTags({ stats, onNext }: TopTagsProps) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsVisible(true);
    }, []);

    const tagColors = [
        'from-purple-600 to-pink-600 shadow-purple-500/20 border-purple-500/30',
        'from-blue-600 to-cyan-600 shadow-blue-500/20 border-blue-500/30',
        'from-emerald-600 to-teal-600 shadow-emerald-500/20 border-emerald-500/30',
        'from-amber-600 to-orange-600 shadow-orange-500/20 border-orange-500/30',
        'from-red-600 to-rose-600 shadow-red-500/20 border-red-500/30',
    ];

    return (
        <div className="fixed inset-0 w-screen h-screen flex items-center justify-center p-6 bg-[#020617] overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-transparent to-cyan-900/20 pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.95, y: isVisible ? 0 : 20 }}
                transition={{ duration: 0.8, ease: "circOut" }}
                className="glass-card max-w-7xl w-full p-8 md:p-16 flex flex-col items-center justify-center text-center space-y-12 relative z-10"
            >
                <div className="space-y-4">
                    <h1 className="text-5xl md:text-7xl font-black font-heading tracking-tighter text-white drop-shadow-2xl">
                        Top Topics
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-400 font-light tracking-wide">
                        Where you focused your energy
                    </p>
                </div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl"
                    initial="hidden"
                    animate={isVisible ? "visible" : "hidden"}
                    variants={{
                        visible: { transition: { staggerChildren: 0.15 } }
                    }}
                >
                    {stats.topTags.slice(0, 6).map((tag, index) => (
                        <motion.div
                            key={tag}
                            variants={{
                                hidden: { x: -30, opacity: 0 },
                                visible: { x: 0, opacity: 1 }
                            }}
                            whileHover={{ scale: 1.02 }}
                            className={`bg-white/5 p-6 rounded-2xl flex items-center justify-between border border-white/10 hover:bg-white/10 transition-colors group`}
                        >
                            <div className="flex items-center gap-6">
                                <div className="p-3 bg-white/10 rounded-xl">
                                    <Tag className="w-6 h-6 text-indigo-400 group-hover:text-white transition-colors" />
                                </div>
                                <span className="text-white text-xl font-bold tracking-wide text-left">{tag}</span>
                            </div>

                            <div className="flex flex-col items-end">
                                <span className="text-4xl font-black text-white">
                                    {stats.tagStats[tag]}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>
        </div>
    );
}