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


function formatContributionData(data: Record<string,number>) {
    const weeks: Array<Array<{date: string;count:number} >> = [];
    const dates = Object.entries(data)
    .sort((a,b) => a[0].localeCompare(b[0]));

    let currentWeek: Array<{date: string;count:number}> = [];



    //calculate first day offet
    const firstDate = new Date(dates[0][0]);
    const firstDayOfWeek = firstDate.getDay();

    //addd empty cells for the first week
    for(let i = 0;i< firstDayOfWeek;i++){
        currentWeek.push({date: '',count: 0});
    }

    //process all dates including future dates
    dates.forEach(([date,count]) => {
        currentWeek.push({date , count});
        if (currentWeek.length === 7) {
            weeks.push(currentWeek);
            currentWeek= [];
        }
    });

    //fill the last week if needed 
    if (currentWeek.length > 0) {
        while(currentWeek.length < 7) {
            currentWeek.push({date: '',count: 0});
        }
        weeks.push(currentWeek);
    }

    return weeks;
}


function getMonthLabels(weeks: Array<Array<{date: string;count: number} >> ) {
    const labels: {text: string;index: number}[] = [];
    let lastMonth = -1;

    weeks.forEach((week,weekIndex)=>{
        week.forEach(day => {
            if(day.date) {
                const date = new Date(day.date);
                const month = date.getMonth();
                if(month !== lastMonth) {
                    labels.push({ text: MONTHS[month],index: weekIndex});
                    lastMonth = month;
                }
            }
        });
    });

    return labels;
}

function getRandomAvatar(handle: string){
    const hash = handle.split('').reduce((acc,char) => acc + char.charCodeAt(0),0);
    const avatarNumber = (hash % 20) + 1;
    return `/avatars/avatar${avatarNumber}.png`;
}











