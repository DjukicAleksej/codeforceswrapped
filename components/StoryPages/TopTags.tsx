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
        <div className="h-full w-full flex items-center justify-center p-6 bg-gradient-to-br from-[#111827] via-[#0f172a] to-black">
            <div className="max-w-2xl w-full space-y-10 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
                    transition={{ duration: 0.8 }}
                    className="text-center space-y-2"
                >
                    <h1 className="text-4xl md:text-5xl font-black font-heading tracking-tight text-white">
                        Top Topics
                    </h1>
                    <p className="text-lg text-gray-400">Where you focussed your energy</p>
                </motion.div>

                <motion.div
                    className="space-y-4"
                    initial="hidden"
                    animate={isVisible ? "visible" : "hidden"}
                    variants={{
                        visible: { transition: { staggerChildren: 0.15 } }
                    }}
                >
                    {stats.topTags.slice(0, 5).map((tag, index) => (
                        <motion.div
                            key={tag}
                            variants={{
                                hidden: { x: -30, opacity: 0 },
                                visible: { x: 0, opacity: 1 }
                            }}
                            whileHover={{ scale: 1.02, x: 10 }}
                            className={`bg-gradient-to-r ${tagColors[index]} p-5 rounded-xl flex items-center justify-between border shadow-lg backdrop-blur-md relative overflow-hidden group`}
                        >
                            <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out skew-x-12" />

                            <div className="flex items-center gap-4 relative z-10">
                                <div className="p-2 bg-white/20 rounded-lg">
                                    <Tag className="w-5 h-5 text-white" />
                                </div>
                                <span className="text-white text-lg font-bold tracking-wide">{tag}</span>
                            </div>

                            <div className="flex flex-col items-end relative z-10">
                                <span className="text-2xl font-black text-white">
                                    {stats.tagStats[tag]}
                                </span>
                                <span className="text-xs text-white/70 uppercase font-medium tracking-wider">
                                    Problems
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}