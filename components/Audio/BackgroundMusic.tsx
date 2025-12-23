'use client';

import { useEffect,useRef,useState }  from "react";
import {Volume2,VolumeX} from 'lucide-react';

export default function BackgroundMusic() {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying,setIsPlaying] = useState(true);

    useEffect(()=> {
        audioRef.current = new Audio('/audio/background-music.mp3');
        audioRef.current.loop = true;
        audioRef.current.volume = 0.3; // 30% volume by default
    })
}