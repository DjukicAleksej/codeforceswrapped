'use client';

import {motion} from "framer-motion";
import {useState,useEffect} from "react";
import { UserStats } from "@/lib/types";  
import {Code2, Trophy, Medal} from "lucide-react";

interface CodingArsenalProps {
    stats: UserStats;
    onNext: () => void;
}


const CodingArsenal = ({stats,onNext}: CodingArsenalProps) => {
    const [isVisible, setIsVisible] = useState(false);

    //sort languages by usage and get top 3
    const topLanguages = Object.entries(stats.languageStats)
    .sort(([, a], [, b]) => b - a)
    .slice(0,3)


    //Medal styles for each position
    const medals = [
        {icon: Trophy,color:"text-yellow-400",label:"Gold",bgGradieng:"from-yellow-500/20 to-amber-500/20",border: "border-yellow-500/30"},
        {icon: Medal,color:"text-gray-300",label:"Silver",bgGradieng:"from-gray-400/20 to-gray-500/20",border: "border-gray-400/30"},
        {icon: Medal,color:"text-yellow-600",label:"Bronze",bgGradieng:"from-amber-600/20 to-amber-700/20",border: "border-amber-600/30"}
    ];
useEffect(() => {
    setIsVisible(true);
}, []);
return
}