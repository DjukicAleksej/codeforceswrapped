'use client';

import {useEffect , useState , useRef } from 'react';
import {Card} from '@/components/ui/card';
import { UserStats } from '@/lib/types';
import { Crown, Zap, Trophy, Calendar, CalendarDays, Code2, Share2, Download, Home, ChevronLeft, ChevronRight } from 'lucide-react';
import {useRouter} from 'next/navigation';
import Image from 'next/image';
import html2canvas from 'html2canvas';
import  {Button} from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';
import {motion } from "framer-motion";
import StoryContainer from '@/components/StoryPages/StoryContainer';
import { Toaster} from '@/components/ui/sonner';


export const dynamic = 'force-dynamic';


function getContributionColor(count: number): string {
    if(count === 0) return 'bg-[#1b1f23]';
    if(count ===1) return 'bg-[#0e4429]';
    if(count <= 3) return 'bg-[#006d32]';
    if(count <= 5) return 'bg-[#26a641]';
    return 'bg-[#39d353]';
}

const MONTHS = ['Jan', 'Feb' , 'Mar' , 'Apr' ,' May' , 'Jun' , 'Jul','Aug','Sep','Oct','Nov','Dec'];






