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
}