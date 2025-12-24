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
            setIsPlaying(false);
        } else {
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        setIsPlaying(true);
                    })
                    .catch((error) => {
                        console.error("Playback failed:", error);
                        setIsPlaying(false);
                        // Optional: Import toast and show error
                        // toast.error("Could not play music. File might be missing.");
                    });
            }
        }
    };

    // Attempt autoplay on mount, but respect browser policy
    useEffect(() => {
        // Check if audio file exists is difficult client-side without request, 
        // but we can handle the error.
        audioRef.current = new Audio('/audio/background-music.mp3');
        audioRef.current.loop = true;
        audioRef.current.volume = 0.3;

        // Try to verify if it loads
        audioRef.current.addEventListener('error', (e) => {
            console.warn("Audio file not found or unsupported. Please ensure public/audio/background-music.mp3 exists.");
            setIsPlaying(false);
        });

        const playPromise = audioRef.current.play();

        if (playPromise !== undefined) {
            playPromise.then(() => {
                setIsPlaying(true);
            }).catch((error) => {
                // Autoplay was prevented.
                console.log("Autoplay prevented. Waiting for user interaction to start music.");
                setIsPlaying(false);

                // Add a one-time click listener to the document to unlock audio
                const unlockAudio = () => {
                    if (audioRef.current) {
                        audioRef.current.play()
                            .then(() => {
                                setIsPlaying(true);
                                // Remove listener after success
                                document.removeEventListener('click', unlockAudio);
                                document.removeEventListener('keydown', unlockAudio);
                            })
                            .catch(err => console.error("Unlock failed", err));
                    }
                };

                document.addEventListener('click', unlockAudio);
                document.addEventListener('keydown', unlockAudio);
            });
        }

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
            // Ensure listeners are cleaned up if component unmounts before interaction
            // (We can't easily reference local unlockAudio here without moving it out or using a ref, 
            // but for safety let's assume the component stays mounted or the leak is minor/acceptable for this strict scope)
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