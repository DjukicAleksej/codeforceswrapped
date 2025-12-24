'use client';

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from 'lucide-react';

export default function BackgroundMusic() {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(true);

    const togglePlay = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch(console.error);
        }
        setIsPlaying(!isPlaying);
    };

    // Attempt autoplay on mount, but respect browser policy
    useEffect(() => {
        audioRef.current = new Audio('/audio/background-music.mp3');
        audioRef.current.loop = true;
        audioRef.current.volume = 0.3;

        const playPromise = audioRef.current.play();

        if (playPromise !== undefined) {
            playPromise.then(() => {
                setIsPlaying(true);
            }).catch(() => {
                // Autoplay was prevented.
                setIsPlaying(false);
            });
        }

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    return (
        <button
            onClick={togglePlay}
            className="fixed top-4 right-20 z-50 p-2 rounded-full bg-gray-800/50 hover:bg-gray-700/50 transition-all duration-200"
            aria-label={isPlaying ? 'Mute music' : 'Unmute music'}>

            {isPlaying ? (
                <Volume2 className="w-6 h-6 text-white" />
            ) : (
                <VolumeX className="w-6 h-6 text-white" />
            )}
        </button>
    );

}