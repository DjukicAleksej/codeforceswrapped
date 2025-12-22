'use client';

import { motion } from "framer-motion";
import { useState,useEffect} from "react";
import { UserStats } from "@/lib/types";
import {Trophy}from "lucide-react";

interface IntroStoryProps{
    stats: UserStats;
    onNext: () => void;
}

export default function IntroStory({stats,onNext}: IntroStoryProps) {
    const [isVisible,setIsVisible] = useState(false);
    useEffect(() => {
        setIsVisible(true);
    }, []);
    return (
        <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#1a1d24] to-black">
            <div className="max-w-2xl w-full p-8 space-y-12 text-center">
                <motion.div
                initial={{opacity: 0,y:20}}
                animate={{opacity: isVisible ? 1 : 0,y: isVisible? 0 : 20}}
                transition={{duration: 0.8}}
                >
                    <h1 className="text-5xl font-bold text-white mb-4">
                        Your 2025 in Code
                    </h1>
                    <p className="text-xl text-gray-400">
                        Let&apos;s explore your competitive programming journey
                    </p>
                </motion.div>
            </div>
        </div>
    )
}