'use client';
import { motion } from "framer-motion";
import {useState,useEffect} from "react";
import { UserStats } from "@/lib/types"; 
import {Code2} from "lucide-react";

interface LanguagesProps{
    stats: UserStats;
    onNext: () => void;
}

export default function Languages({stats, onNext}: LanguagesProps){
    const [isVisible,setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);
    return (
        <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#1a1d24] to-black">
            <div className="max-w-2xl w-full p-8 space-y-8">
                <motion.div
                initial={{opacity: 0,y: 20}}
                animate={{opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20}}
                transition={{duration: 0.8}}
                className="text-center"
                >
                <h1 className="text-4xl font-bold text-white mb-2">Your Language Mastery</h1>
                <p className="text-gray-400">Languages you&apos;ve couquered this year</p>
                </motion.div>
                <motion.div
                initial={{scale: 0.8,opacity: 0}}
                animate={{scale:isVisible ? 1 : 0.8,opacity: isVisible ? 1 : 0}}
                whileHover={{scale: 1.05}}
                transition={{delay: 0.3,duration: 0.8}}
                className="bg-gradient-to-br from-pink-600/30 to-purple-600/30 p-6 rounded-xl hover:from-pink-500/40 hover:to-purple-500-40 transition-all duration-300 shadow-lg hover:shadow-pink-500/20 cursor-pointer transform-gpu"
                >
                     <div className="flex flex-col items-center space-y-4">
                        <motion.div
                        className="p-3 bg-pink-500/30 rounded-full shadow-inner shadow-pink-400/20 backdrop-slur-sm"
                        whileHover={{
                            rotate: 360,
                            transition: {duration: 0.6}
                        }}
                        >
                            <Code2 className="w-8 h-8 text-pink-300" />


                        </motion.div>
                        <div className="text-center">
                            <h2 className="text-2xl font-bold text-white mb-2">
                                Top Language
                            </h2>
                            <p className="text-4xl font-bold text-pink-400 mb-2">
                                {stats.topLanguage || "C++"}
                            </p>
                            <p className="text-gray-400 text-sm">
                                Your go-to language for problem solving
                            </p>
                        </div>
                     </div>
                </motion.div>
                
            </div>
        </div>
    )
}