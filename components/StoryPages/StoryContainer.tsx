'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserStats } from '@/lib/types';
import { X, ChevronLeft, ChevronRight, CirclePercent } from 'lucide-react';
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
import BackgroundMusic from '../Audio/BackgroundMusic';


interface StoryContainerProps {
    stats: UserStats;
    onComplete: () => void;
    onSkip: () => void;
}

const STORY_DURATION = 10000;//10 seconds per story

export default function StoryContainer({ stats, onComplete, onSkip }: StoryContainerProps) {
    const [currentPage, setCurrentPage] = useState(0);
    const [progress, setProgress] = useState(0);


    const stories = [
        { id: 1, component: IntroStory },
        { id: 2, component: Languages },
        { id: 3, component: ProblemSolving },
        { id: 4, component: TopTags },
        { id: 5, component: Streaks },
        { id: 6, component: RatingJourney },
        { id: 7, component: PowerLevelStory },
        { id: 8, component: FinalTransition }
    ];

    const goToNextPage = useCallback(() => {
        if (currentPage === stories.length - 1) {
            onComplete();
        } else {
            setCurrentPage(p => p + 1);
            setProgress(0);
        }
    }, [currentPage, onComplete, stories.length]);

    const goToPrevPage = useCallback(() => {
        if (currentPage > 0) {
            setCurrentPage(p => p - 1);
            setProgress(0);
        }
    }, [currentPage]);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    goToNextPage();
                    return 0;
                }
                return prev + (100 / (STORY_DURATION / 100));
            });
        }, 100);
        return () => clearInterval(timer);
    }, [currentPage, goToNextPage]);

    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            switch (e.key) {
                case 'ArrowRight':
                case 'Space':
                    goToNextPage();
                    break;
                case 'ArrowLeft':
                    goToPrevPage();
                    break;
                case 'Escape':
                    onSkip();
                    break;
            }
        };
        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);

    }, [currentPage, goToNextPage, goToPrevPage, onSkip]);

    useEffect(() => {
        return () => {
            const audio = document.querySelector('audio');
            if (audio) {
                audio.pause();
                audio.currentTime = 0;
            }
        };
    }, []);

    if (currentPage < 0 || currentPage >= stories.length) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
            {/* Background Effects */}
            <div className="absolute inset-0 mesh-bg opacity-20 pointer-events-none" />

            {/*BG MUSIC */}
            <BackgroundMusic />

            <div className="relative w-full max-w-md md:max-w-xl h-full md:h-[90vh] md:rounded-3xl overflow-hidden bg-black/40 backdrop-blur-xl border-x md:border border-white/10 shadow-2xl flex flex-col">

                {/*Progress bars*/}
                <div className="absolute top-0 left-0 right-0 flex gap-1.5 p-3 z-20 pt-4 md:pt-6 px-4">
                    {stories.map((_, idx) => (
                        <div key={idx} className="h-1 flex-1 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
                            <motion.div
                                className="h-full bg-white shadow-[0_0_10px_white]"
                                initial={{ width: "0%" }}
                                animate={{
                                    width: `${idx === currentPage ? progress : idx < currentPage ? 100 : 0}%`
                                }}
                                transition={{ ease: "linear", duration: idx === currentPage ? 0.1 : 0.3 }}
                            />
                        </div>
                    ))}
                </div>

                {/* Header Controls */}
                <div className="absolute top-6 right-4 z-20 flex items-center gap-2">
                    <button
                        onClick={onSkip}
                        className="p-2 rounded-full bg-black/20 hover:bg-white/10 text-white/50 hover:text-white transition-all backdrop-blur-md"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Navigation Zones (Mobile friendly tap areas) */}
                <div className="absolute inset-0 z-10 flex">
                    <div className="w-1/3 h-full" onClick={goToPrevPage} />
                    <div className="w-1/3 h-full" /> {/* Center dead zone for interaction */}
                    <div className="w-1/3 h-full" onClick={goToNextPage} />
                </div>

                {/* Navigation Buttons (Desktop) */}
                <div className="hidden md:flex absolute inset-x-0 top-1/2 -translate-y-1/2 justify-between px-4 z-20 pointer-events-none">
                    <button
                        onClick={(e) => { e.stopPropagation(); goToPrevPage(); }}
                        className={`pointer-events-auto p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all backdrop-blur-md hover:scale-110 ${currentPage === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); goToNextPage(); }}
                        className="pointer-events-auto p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all backdrop-blur-md hover:scale-110"
                    >
                        <ChevronRight size={24} />
                    </button>
                </div>

                {/* Story Content */}
                <div className="flex-1 relative z-0">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentPage}
                            initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                            exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                            transition={{ duration: 0.4, ease: "circOut" }}
                            className="h-full w-full"
                        >
                            {stories[currentPage] ? React.createElement(stories[currentPage].component, {
                                stats,
                                onNext: goToNextPage
                            }) : null}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}