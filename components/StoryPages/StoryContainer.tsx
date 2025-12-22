'use client';

import {useState,useEffect,useCallback} from 'react';
import {motion,AnimatePresence} from 'framer-motion';
import { UserStats } from '@/lib/types'; 
import {X, ChevronLeft,ChevronRight} from 'lucide-react';
import IntroStory from './IntroStory';
import CodingArsenal from './CodingArsenal';
import ProblemSolving from './ProblemSolving';
import TopTags from './TopTags';
import Streaks from './Streaks';
import RatingJourney from './RatingJourney';
import PowerLevelStory from './PowerLevelStory';
import React from 'react';
import FinalTransition from './FinalTransition';
import Languages from './Languages';

interface StoryContainerProps{
    stats: UserStats;
    onComplete: () => void;
    onSkip: () => void;
}

const STORY_DURATION  = 10000;//10 seconds per story

export default function StoryContainer({stats,onComplete,onSkip}: StoryContainerProps){
    const [currentPage, setCurrentPage]= useState(0);
    const [progress, setProgress]= useState(0);


    const stories = [
        {id: 1, component: IntroStory},
        {id: 2, component: Languages},
        {id: 3, component: ProblemSolving},
        {id: 4, component: TopTags},
        {id: 5, component: Streaks},
        {id: 6, component: RatingJourney},
        {id: 7, component: PowerLevelStory},
        {id: 8, component: FinalTransition}
    ];
    const goToNextPage = useCallback(() => {
        if(currentPage===stories.length -1) {
            onComplete();
        } else {
            setCurrentPage(p => p + 1);
            setProgress(0);
        }
    },[currentPage,onComplete,stories.length]);


    const goToPrevPage = useCallback(() => {
        if(currentPage > 0){
            setCurrentPage(p => p -1);
            setProgress(0);
        }
    },[currentPage]);
}