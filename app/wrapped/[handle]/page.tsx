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



export default function WrappedPage ({ params} : { params: {handle: string}}) {
    const [stats,setStats] = useState<UserStats | null>(null);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState<string | null>(null);
    const [showStory , setShowStory] = useState(true);
    const router = useRouter();
    const wrapperRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                setLoading(true);
                setError(null);
                const res = await fetch(`/api/stats?handle=${params.handle}`);
                const data = await res.json();

                if(!res.ok){
                    throw new Error(data.error || 'Failed to fetch');
                }

                console.log('Fetched stats:',data);
                setStats(data);
            } catch(error: any){
                console.error('Failed to fetch stats:',error);
                setError(error.message || 'Failed to load stats');
            } finally {
                setLoading(false);
            }
        };
        if(params.handle){
            fetchStats();
        }
    }, [params.handle]);

    const downloadImage = async => {
        try {
            const element = document.getElementById('wrap');
            if(!element){
                console.error('Element to capture not found');
                return;
            }
            const canvas = await html2canvas(element, {
                logging: true,
                useCORS: true,
                backgroundColor: '#000000',
                scale: 2,
                onclone: (clonedDoc) => {
                    const clonedElement = clonedDoc.getElementById('wrap');
                    if(clonedElement){
                        clonedElement.style.backgroundColor='#000000';
                    }
                }
            });

            const dataUrl = canvas.toDataURL('image/png');

            const link = document.createElement('a');
            link.href = dataUrl;
            link.download = 'wrapped_stats.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }catch(error){
            console.error('Failed to capture or download the image:',error);
        }
    };

    const shareImage = async () => {
        try {
            const element = document.getElementById('wrap');
            if(!element){
                console.error('Element to capture not found!');
                return;
            }

            const canvas = await html2canvas(element, {
                backgroundColor: '#000000',
                useCORS: true,
                scale: 2,
                onclone: (clonedDoc) => {
                    const clonedElement = clonedDoc.getElementById('wrap');
                    if(clonedElement){
                        clonedElement.style.backgroundColor = '#000000';
                    }
                }
            });

            canvas.toBlob(async (blob) => {
                if(!blob) {
                    console.error('Failed to create blob');
                    return;
                }

                const filesArray = [
                    new File(
                        [blob],
                        `${params.handle}-codeforces-wrapped-2025.png`,
                        {type: 'image/png'}
                    )
                ];

                try {
                    if(navigator.share && navigator.canShare({files: filesArray})){
                        await navigator.share({
                            files: filesArray,
                            title: 'Codeforces Wrapped 2025',
                            text:  `Checkout my Codeforces Wrapped 2025! @${params.handle}`,

                        });
                    } else {
                        //fallback for browser sthat dfont support native sharing
                        const shareUrl = canvas.toDataURL('image/png');
                        const shareText = encodeURIComponent(`Check out my Codeforces Wrapped 2025! @${params.handle}`);
                        const shareLink = encodeURIComponent(window.location.href);

                        window.open(
                            `https://twitter.com/intent/tweet?text=${shareText}&url=${shareLink}`,
                            '_blank'
                        );

                    }
                } catch (error) {
                    console.error('Error sharing:', error);
                    //fallback to twitter sharing if native sharing fails
                    const shareText = encodeURIComponent(`Check out my Codeforces Wrapped 2025! @${params.handle}`);
                    const shareLink = encodeURIComponent(window.location.href);


                    window.open(
                        `https://twitter.com/intent/tweet?text=${shareText}&url=${shareLink}`,
                        '_blank'
                    );
                }

            },'image/png')
        }catch (error){
            console.error('Error generating image:', error);
        }
    };


    const handleDownloadSummary = () => {
        if(stats) {
            const summary = {
                username: params.handle,
                problemsSolved: stats.problemsSolved,
                maxRating: stats.rating?.maxRating,
                currentRating: stats.rating?.currentRating,
                mostActiveDay: stats.mostActiveDay,
                mostActiveMonth: stats.mostActiveMonth,
                totalSolved: stats.problemsSolved,
                topLanguage: stats.topLanguage,
            };

            const blob = new Blob([JSON.stringify(summary,null,2)],{type: 'application/json'});
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${params.handle}-github-summary.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }
    };


    const getProfilePicture = (handle: string) => {
        return `https://userpic.codeforces.org/user/avatar/${handle}`;
    };

    const profilePicture = stats?.profilePicture
    ? stats.profilePicture.replace(/^http:/,'https:')
    : null;

    const scrollLeft = () =>{
        if(scrollContainerRef.current){
            scrollContainerRef.current.scrollBy({
                left: -200,
                behavior: 'smooth'
            });
        }
    };
    
    const scrollRight = () => {
        if(scrollContainerRef.current){
            scrollContainerRef.current.scrollBy({
                left: 200,
                behavior: 'smooth'
            });
        }
    };

    if(loading){
        return (
            <div className="min-h-screen flex items-center justify-center bg-black">
                <div className="animate-pulse text-xl text-white">Loading your coding journey...</div>
            </div>
        );
    }

    if(error) {
        return (

            <div className ="min-h-screen flex flex-col items-center justify-center bg-black text-white gap-4">
                <div className="text-xl text-red-400">{error}</div>
                <button onClick={() => router.push('/')}
                className="text-blue-400 hover:underline">
                    Return to Home
                </button>
            </div>
        );
    }

    if(!stats){
        return null;
    }

    if(showStory) {
        return (
            <StoryContainer
            stats={stats}
            onComplete={() => setShowStory(false)}
            onSkip={() => setShowStory(false)}
            />
        );
    }

    return (
        <motion.div
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{duration: 1}}
        className="min-h-screen bg-black text-white p-8"
        >
            {/*wrap everything that should be caputerd in a div with id="wrap" */}
            <div id="wrap" className="max-w-3xl mx-auto space-y-8 bg-black">
                {/*Header*/}
                <div className="text-center space-y-4 mb-8">
                    <div className="w-28 h-28 mx-auto rounded-full overflow-hidden bg-gray-800 relative">
                        {stats?.profilePicture ? (
                            <Image
                            src = {stats.profilePicture}
                            alt={`${stats.handle}'s profile picture`}
                            width={112}
                            height={112}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                try {
                                    const target = e.target as HTMLImageElement;
                                    const parent = target.parentElement;

                                    if(parent) {
                                        //hide failed image
                                        target.style.display = 'none';

                                        //update paren element
                                        parent.style.backgroundColor = '#6366f1';
                                        parent.innerHTML=`
                                        <div class="w-full flex items-center justify-center text-2xl font-bold text-white>
                                        ${stats.handle.substring(0,2).toUpperCase()}
                                        </div>
                                        `;
                                    }
                                } catch (error) {
                                    console.error('Error handling image fallback:',error);
                                }
                            }}
                            />
                        ) : (
                            //default fallback if no pfp
                            <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-white bg-[#6366f1]">
                                {stats.handle.substring(0,2).toUpperCase()}
                                </div>
                        )}
                    </div>
                    <h1 className="text-4xl font-bold">@{stats.handle}</h1>
                    <div className="text-purple-400 text-2xl font-semibold">2025 Year in Code</div>
                </div>

                    {/* Contribution Graph */}
                    <Card className="bg-[#0d1117] p-6 rounded-xl hover:bg-[#161b22] transition-al duration-300">
                        <div className="space-y-4">
                            {stats && (
                                <>
                                <div className="text-sm text-gray-400">
                                    {stats.totalSubmissions} submissions in {new Date().getFullYear()}
                                </div>
                                <div className="relative group">
                                    <div
                                    ref={scrollContainerRef}
                                    className="relative w-full overflow-x-auto scrollbar-none"
                                    style={{
                                        msOverflowStyle: 'none',
                                        scrollbarWidth: 'none',                                   }}
                                    >
                                        <div
                                        className="flex gap-1 py-1"
                                        style={{
                                            width: 'max-content'
                                        }}
                                        >
                                            {formatContributionData(stats.contributionData).map((week,weekIndex) => (
                                                <div key={weekIndex} className="grid grid-rows-7 gap-1">
                                                    {week.map((day,dayIndex) => (
                                                        <div
                                                        key={`${weekIndex}-${dayIndex}`}
                                                        className={`w-3 h-3 rounded-sm ${getContributionColor(day.count)}`}
                                                        title={day.date ? `${day.date}: ${day.count} contributions` : 'No contributions'}
                                                        />
                                                    ))}    
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <button
                                    onClick={scrollLeft}
                                    className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center
                                    bg-black/20 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100
                                    transition-opacity duration-200 hover:bg-black/40 z-10"
                                    aria-label="Scroll left"
                                    >
                                        <ChevronLeft className="w-4 h-4 text-white/80" /> 

                                    </button>

                                    <button
                                    onClick={scrollRight}
                                    className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-black/20 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100
                                    transition-opacity duration-200 hover:bg-black/40 z-10"
                                    aria-label="Scroll right"
                                    >
                                        <ChevronRight className="w-4 h-4 text-white/80" />

                                    </button>                 
                                </div>

                                <div className="flex justify-between items-center text-sm text-gray-400 mt-2">
                                    <span>Less</span>
                                    <div className="flex gap-1">
                                        {[0,1,2,3,4].map((level)=> (
                                            <div
                                            key={level}
                                            className={`w-3 h-3 rounded-sm ${getContributionColor(level*2)}`}
                                            />
                                        ))}
                                    </div>
                                    <span>More</span>
                                </div>
                                </>
                            )}
                        </div>
                    </Card>

                    {/*Stats grid */}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Current rating */}
                        <Card className="bg-[#162321] p-6 rounded-xl transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-[#1c2c28]">
                            <div className="flex items-center gap-2 text-gray-400 mb-2 group">
                                <Trophy className="text-yellow-400 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12"/>
                                <span className="transition-colors duration-300 group-hover:text-yellow-400">Current Rating</span>
                            </div>
                            <div className={`text-2xl font-bold ${stats?.rating?.currentColor || 'text-gray-500'} transition-all duration-300 hover:scale-105`}>
                                 {stats?.rating?.current || 'Unrated'}
                           </div>
                            <div
                            className={`text-sm ${stats?.rating?.currentColor || 'text-gray-500'} transition-all duration-300 hover:scale-105`}
                            >
                                {stats?.rating?.currentRank || 'Unrated'}
                            </div>
                        </Card>
                        {/* Max Rating */}
                        <Card className="bg-[#2d2215] p-6 rounded-xl transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-[#382a1a]">
                            <div className="flex items-center gap-2 text-gray-400 mb-2 group">
                                <Crown className="text-orange-400 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
                                <span className="transition-colors duration-300 group-hover:text-orange-400">Highest Rating</span>
                            </div>
                            <div className={`text-2xl font-bold ${stats?.rating?.maxColor || 'text-gray-500'} transition-all duration-300 hover:scale-105`}>
                                {stats?.rating?.maxRating || 'Unrated'}
                            </div>
                            <div className={`text-sm ${stats?.rating?.maxColor || 'text-gray-500'} transition-all duration-300 hover:scale-105`}>
                                {stats?.rating?.maxRank || 'Unrated'}
                            </div>
                        </Card>
                        {/* Universal Rank*/}
                        <Card className="bg-[#2d2215] p-6 rounded-xl transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-[#382a1a]">
                            <div className="flex items-center gap-2 text-gray-400 mb-2 group">
                                <Crown className="text-yellow-500 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
                                <span className="transition-colors duration-300 group-hover:text-yellow-500">Universal rank</span>
                            </div>
                            <div className="text-yellow-500 text-2xl font-bold transition-all duration-300 hover:scale-105">
                                Top {stats?.universalRank}%
                            </div>
                        </Card>

                        {/* Longest streak */}
                        <Card className="bg-[#231f2e] p-6 rounded-xl transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-[#2d2839]">
                            <div className="flex items-center gap-2 text-gray-400 mb-2 group">
                                <Zap className="text-purple-400 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
                                <span className="transition-colors duration-300 group-hover:text-purple-400">Longest Streak</span>
                            </div>
                            <div className="text-purple-400 text-2xl font-bold transition-all duration-300 hover:scale-105">
                                {stats?.longestStreak} days
                            </div>
                        </Card>

                        {/*Total Submissions */}


                    </div>
            </div>
        </motion.div>
    )

}










