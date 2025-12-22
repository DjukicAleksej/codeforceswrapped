'use client';

import { motion } from "framer-motion";
import { useState,useEffect } from "react";
import { UserStats } from "@/lib/types";
import { Sparkles } from "lucide-react";

interface FinalTransitionProps {
    stats: UserStats;
    onNext: () => void;
}

export default function FinalTransition({stats,onNext}: FinalTransitionProps){
    const [isVisible,setIsVisible] = useState(false);

    useEffect(()  => {
        setIsVisible(true);

        //show transition for 3 secons then move to final wrap

        const timer = setTimeout(() => {
            onNext();

        }, 3000);
        return () => clearTimeout(timer);
    }, [onNext]);

    
}