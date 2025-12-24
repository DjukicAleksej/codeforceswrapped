'use client';

import { useEffect, useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { UserStats } from '@/lib/types';
import { Crown, Zap, Trophy, Calendar, CalendarDays, Code2, Share2, Download, Home, ChevronLeft, ChevronRight } from 'lucide-react';
import StoryContainer from '@/components/StoryPages/StoryContainer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { toast, Toaster } from 'sonner';
import html2canvas from 'html2canvas';

import { useParams } from 'next/navigation';

import Image from 'next/image';

export default function WrappedPage() {
    const params = useParams();
    const handle = params.handle as string;
    const [stats, setStats] = useState<UserStats | null>(null);
    const [loading, setLoading] = useState(true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [error, setError] = useState<any>(null);
    const [showStory, setShowStory] = useState(true);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                setLoading(true);
                setError(null);
                const res = await fetch(`/api/stats?handle=${handle}`);
                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.error || 'Failed to fetch user data');
                }

                console.log('Fetched stats:', data);
                setStats(data);
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
                console.error('Failed to fetch stats:', error);
                setError(error.message || 'Failed to load stats');
                toast.error("Could not load user stats");
            } finally {
                setLoading(false);
            }
        };
        if (handle) {
            fetchStats();
        }
    }, [handle]);

    const downloadImage = async () => {
        try {
            const element = document.getElementById('wrapped-summary');
            if (!element) return;

            const canvas = await html2canvas(element, {
                useCORS: true,
                scale: 2,
                backgroundColor: '#000000',
            });

            const link = document.createElement('a');
            link.download = `${handle}-wrapped-2025.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
            toast.success("Image downloaded!");
        } catch (err) {
            console.log(err);
            toast.error("Failed to download image");
        }
    };

    const shareImage = async () => {
        try {
            const element = document.getElementById('wrapped-summary');
            if (!element) return;
            const canvas = await html2canvas(element, {
                useCORS: true,
                scale: 2,
                backgroundColor: "#000000"
            });

            canvas.toBlob(async (blob) => {
                if (!blob) return;

                const filesArray = [
                    new File(
                        [blob],
                        `${handle}-codeforces-wrapped-2025.png`,
                        { type: 'image/png' }
                    )
                ];
                if (navigator.share) {
                    if (navigator.canShare && navigator.canShare({ files: filesArray })) {
                        await navigator.share({
                            files: filesArray,
                            title: 'Codeforces Wrapped 2025',
                            text: `Checkout my Codeforces Wrapped 2025! @${handle}`,

                        });
                    } else {
                        //fallback
                        const shareUrl = canvas.toDataURL('image/png');
                        const shareText = encodeURIComponent(`Check out my Codeforces Wrapped 2025! @${handle}`);
                        const shareLink = encodeURIComponent(window.location.href);

                        window.open(
                            `https://twitter.com/intent/tweet?text=${shareText}&url=${shareLink}`,
                            '_blank'
                        );
                    }

                } else {
                    //fallback
                    const shareText = encodeURIComponent(`Check out my Codeforces Wrapped 2025! @${handle}`);

                    window.open(
                        `https://twitter.com/intent/tweet?text=${shareText}`,
                        '_blank'
                    );
                }
            })

        } catch (error) {
            console.error('Error sharing:', error);
            //fallback to twitter sharing if native sharing fails
            const shareText = encodeURIComponent(`Check out my Codeforces Wrapped 2025! @${handle}`);
            const shareLink = encodeURIComponent(window.location.href);


            window.open(
                `https://twitter.com/intent/tweet?text=${shareText}&url=${shareLink}`,
                '_blank'
            );
        }
    };

    const handleDownloadSummary = () => {
        if (stats) {
            const summary = {
                username: handle,
                problemsSolved: stats.problemsSolved,
                maxRating: stats.rating?.maxRating,
                currentRating: stats.rating?.currentRating,
                rank: stats.rating?.currentRank,
                contributions: stats.contributionData,
                year: 2025
            };
            const blob = new Blob([JSON.stringify(summary, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${handle}-github-summary.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    }


    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 border-4 border-white/10 border-t-primary rounded-full animate-spin" />
                    <p className="text-white animate-pulse">Generating your Wrapped...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center p-4">
                <div className="glass-card p-8 max-w-md w-full text-center space-y-4">
                    <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mx-auto">
                        <Zap className="w-6 h-6 text-red-500" />
                    </div>
                    <h2 className="text-xl font-bold text-white">Something went wrong</h2>
                    <p className="text-gray-400">{error}</p>
                    <div className="pt-4">
                        <Link href="/">
                            <Button variant="outline" className="border-white/10 hover:bg-white/5 text-white">
                                <Home className="mr-2 h-4 w-4" /> Go Home
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-black text-white relative flex flex-col items-center justify-center p-4">
            {/* Background Effects */}
            <div className="absolute inset-0 mesh-bg opacity-20 pointer-events-none" />

            {showStory && stats ? (
                <StoryContainer
                    stats={stats}
                    onComplete={() => setShowStory(false)}
                    onSkip={() => setShowStory(false)}
                />
            ) : null}

            {!showStory && stats && (
                <div className="flex flex-col items-center gap-8 w-full max-w-lg z-10 animate-fade-in-down py-8">
                    <div className="flex gap-4 w-full justify-between">
                        <Link href="/">
                            <Button variant="ghost" className="text-gray-400 hover:text-white">
                                <Home className="mr-2 h-4 w-4" /> Home
                            </Button>
                        </Link>
                        <Button onClick={() => setShowStory(true)} variant="ghost" className="text-primary hover:text-primary/80">
                            Replay Story <ChevronLeft className="ml-2 h-4 w-4 rotate-180" />
                        </Button>
                    </div>

                    {/* Summary Card To Capture */}
                    <div className="relative group perspective-1000">
                        <div
                            id="wrapped-summary"
                            ref={wrapperRef}
                            className="w-full bg-gradient-to-br from-[#1a1d24] to-black rounded-3xl overflow-hidden shadow-2xl border border-white/10 relative transition-transform duration-500 ease-out transform group-hover:scale-[1.01] group-hover:rotate-x-2 group-hover:rotate-y-2"
                        >
                            {/* Card Background */}
                            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
                            <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
                            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl pointer-events-none animate-pulse-glow delay-1000" />

                            <div className="p-8 space-y-8 relative z-10">
                                {/* Header */}
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Codeforces Wrapped</h2>
                                        <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 mt-1">2025</h1>
                                    </div>
                                    <div className="p-3 bg-white/5 rounded-2xl border border-white/10 shadow-inner">
                                        <Code2 className="w-8 h-8 text-white" />
                                    </div>
                                </div>

                                {/* Profile */}
                                <div className="flex items-center gap-6 py-6 border-b border-white/10">
                                    <div className="relative w-28 h-28 rounded-full p-1.5 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 shadow-xl">
                                        <div className="relative w-full h-full rounded-full overflow-hidden bg-black border-4 border-black">
                                            {stats.profilePicture ? (
                                                <Image
                                                    src={stats.profilePicture}
                                                    alt={stats.handle}
                                                    fill
                                                    className="object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-gray-800">
                                                    <span className="text-3xl font-bold">{stats.handle.substring(0, 2).toUpperCase()}</span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="absolute bottom-0 right-0 bg-black rounded-full p-1.5 border border-white/20 shadow-lg">
                                            <Trophy className="w-5 h-5 text-yellow-400" />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-3xl font-bold text-white tracking-tight">@{stats.handle}</h3>
                                        <p className={`font-medium text-lg ${stats.rating.currentColor}`}>{stats.rating.currentRank}</p>
                                        <div className="flex gap-2 mt-3">
                                            <Badge className="bg-white/10 hover:bg-white/20 text-white border-white/10 backdrop-blur-md px-3 py-1 text-xs">
                                                Peak: <span className="font-bold ml-1">{stats.rating.maxRating}</span>
                                            </Badge>
                                        </div>
                                    </div>
                                </div>

                                {/* Stats Grid */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-5 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
                                        <p className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-2">Problems Solved</p>
                                        <p className="text-3xl font-black text-white">{stats.problemsSolved}</p>
                                    </div>
                                    <div className="p-5 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
                                        <p className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-2">Total Submissions</p>
                                        <p className="text-3xl font-black text-white">{stats.totalSubmissions}</p>
                                    </div>
                                    <div className="p-5 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
                                        <p className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-2">Active Streak</p>
                                        <p className="text-3xl font-black text-white">{stats.longestStreak} <span className="text-lg font-normal text-gray-500">Days</span></p>
                                    </div>
                                    <div className="p-5 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
                                        <p className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-2">Top Language</p>
                                        <p className="text-2xl font-black text-white truncate">{stats.topLanguage}</p>
                                    </div>
                                </div>

                                {/* Power Class */}
                                <div className="p-6 bg-gradient-to-r from-yellow-500/10 via-orange-500/5 to-red-500/10 rounded-2xl border border-yellow-500/20 text-center relative overflow-hidden">
                                    <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay"></div>
                                    <div className="relative z-10">
                                        <p className="text-yellow-500 text-xs font-bold uppercase tracking-[0.2em] mb-2">Power Level</p>
                                        <h3 className={`text-4xl font-black ${stats.PowerClass.color} drop-shadow-lg`}>{stats.PowerClass.title}</h3>
                                    </div>
                                </div>

                                <div className="text-center pt-2">
                                    <p className="text-gray-600 text-xs font-mono tracking-widest">codeforces-wrapped.vercel.app</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 w-full">
                        <Button onClick={shareImage} className="flex-1 bg-white text-black hover:bg-gray-200">
                            <Share2 className="mr-2 h-4 w-4" /> Share
                        </Button>
                        <Button onClick={downloadImage} variant="outline" className="flex-1 border-white/10 text-white hover:bg-white/5">
                            <Download className="mr-2 h-4 w-4" /> Download Image
                        </Button>
                        <Button onClick={handleDownloadSummary} variant="outline" className="flex-1 border-white/10 text-white hover:bg-white/5">
                            <Code2 className="mr-2 h-4 w-4" /> JSON
                        </Button>
                    </div>
                </div>
            )}
        </main>
    );
}
