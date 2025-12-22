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
    
}