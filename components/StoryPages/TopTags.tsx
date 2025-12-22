'use client';

import { motion } from "framer-motion";
import {useState,useEffect} from "react";
import {UserStats} from "@/lib/types"
import {  Tag } from "lucide-react";

interface TopTagsProps {
    stats: UserStats;
    onNext: () => void;
}

export default function TopTags({stats,onNext}: TopTagsProps){
    const [isVisible,setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);
    const tagColors = [
        'from-purple-500 to-pink-500',
        'from-blue-500 to-cyan-500',
        'from-green-500 to-emerald-500',
        'from-yellow-500 to-orange-500',
        'from-red-500 to-rose-500',

    ];

    return (
        <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#1a1d24] to-black">
            <div className="max-w-2xl w-full p-8 space-y-12">
                <motion.div
                initial={{opacity: 0,y:20}}
                animate={{opacity: isVisible ? 1 : 0,y: isVisible ? 0 : 20}}
                transition = {{duration: 0.8}}
                className="text-center"
                >
                    <h1 className="text-4xl font-bold text-white mb-4">Your Top Topics</h1>
                    <p className="text-gray-400">You mastered these problem categories</p>
                </motion.div>
            </div>
        </div>
    )
}