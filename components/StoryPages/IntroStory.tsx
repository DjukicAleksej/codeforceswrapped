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
    
}