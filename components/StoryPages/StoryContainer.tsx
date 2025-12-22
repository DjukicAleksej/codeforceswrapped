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