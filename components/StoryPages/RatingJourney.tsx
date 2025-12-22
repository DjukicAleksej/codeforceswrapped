'use client';

import {motion} from 'framer-motion';
import {useState,useEffect } from "react";
import { UserStats } from '@/lib/types';
import {TrendingUp,Trophy} from "lucide-react"

interface RatingJourneyProps {
    stats: UserStats;
    onNext: () => void;
}

export default function RatingJourney({stats,onNext}: RatingJourneyProps){
    const [isVisible,setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);
    return (
        <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#1a1d24] to-black">
            <div className="max-w-2xl w-full p-8 space-y-12">
                <motion.div
                initial={{opacity: 0,y:20}}
                animate={{opacity: isVisible ? 1 : 0,y: isVisible ? 0 : 20}}
                transition={{duration: 0.8}}
                className="text-center"
                >
                    <h1 className="text-4xl font-bold text-white mb-4">Rating Journey</h1>
                    <p className="text-gray-400">Your competitive achievements</p>

                </motion.div>
            </div>
        </div>
    )
}