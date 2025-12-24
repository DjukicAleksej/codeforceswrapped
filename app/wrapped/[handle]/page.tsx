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
import { toPng } from 'html-to-image';

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
        const toastId = toast.loading("Generating image...");
        try {
            const element = document.getElementById('wrapped-summary');
            if (!element) {
                toast.error("Summary element not found", { id: toastId });
                return;
            }

            const dataUrl = await toPng(element, {
                cacheBust: true,
                pixelRatio: 2,
                backgroundColor: '#000000',
            });

            const link = document.createElement('a');
            link.download = `${handle}-wrapped-2025.png`;
            link.href = dataUrl;
            link.click();
            toast.success("Image downloaded!", { id: toastId });
        } catch (err) {
            console.error("Download failed:", err);
            toast.error("Failed to download image. Please try again.", { id: toastId });
        }
    };

    const shareImage = async () => {
        try {
            const element = document.getElementById('wrapped-summary');
            if (!element) return;

            const dataUrl = await toPng(element, {
                cacheBust: true,
                pixelRatio: 2,
                backgroundColor: '#000000'
            });

            const blob = await (await fetch(dataUrl)).blob();

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

    // Use a proxy URL for the profile picture to ensure CORS headers are present for html2canvas
    const profilePictureUrl = stats && stats.profilePicture
        ? `/api/image-proxy?url=${encodeURIComponent(stats.profilePicture)}`
        : null;

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

                            <div className="p-8 space-y-8 relative z-10 flex flex-col h-full">
                                {/* Header: Avatar + Title */}
                                <div className="flex flex-col items-center text-center space-y-4">
                                    <div className="relative w-32 h-32 rounded-full p-1.5 bg-gradient-to-br from-white via-gray-200 to-gray-400 shadow-2xl">
                                        <div className="relative w-full h-full rounded-full overflow-hidden bg-black border-4 border-white">
                                            {profilePictureUrl ? (
                                                <Image
                                                    src={profilePictureUrl}
                                                    alt={stats.handle}
                                                    fill
                                                    className="object-cover"
                                                    unoptimized
                                                    priority
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-gray-800">
                                                    <span className="text-4xl font-bold text-white">{stats.handle.substring(0, 2).toUpperCase()}</span>
                                                </div>
                                            )}
                                        </div>
                                        {/* Logo Badge */}
                                        <div className="absolute top-0 right-0 bg-white rounded-full p-1.5 shadow-lg">
                                            <Code2 className="w-5 h-5 text-black" />
                                        </div>
                                    </div>

                                    <div>
                                        <h1 className="text-4xl font-black text-white tracking-tight">@{stats.handle}</h1>
                                        <p className="text-xl text-purple-400 font-medium mt-1">2024 Year in Code</p>
                                    </div>
                                </div>

                                {/* Contribution Graph (Simplified Visual) */}
                                <div className="bg-[#161b22] p-6 rounded-xl border border-white/5 space-y-4">
                                    <div className="flex justify-between items-end text-xs text-gray-400 mb-2">
                                        <span>{stats.totalSubmissions} submissions in 2024</span>
                                    </div>
                                    <div className="flex flex-wrap gap-1 justify-center opacity-80">
                                        {/* Generating a visual pattern of squares since we don't have full calendar data mapped to UI yet */}
                                        {Array.from({ length: 147 }).map((_, i) => {
                                            // Mocking intensity for visual similarity to screenshot
                                            const intensity = Math.random() > 0.8 ? 'bg-green-500' : Math.random() > 0.6 ? 'bg-green-700' : 'bg-[#2d333b]';
                                            return <div key={i} className={`w-3 h-3 rounded-[2px] ${intensity}`} />
                                        })}
                                    </div>
                                    <div className="flex justify-between text-xs text-gray-500 pt-2">
                                        <span>Less</span>
                                        <div className="flex gap-1">
                                            <div className="w-3 h-3 bg-[#2d333b] rounded-[2px]" />
                                            <div className="w-3 h-3 bg-green-900 rounded-[2px]" />
                                            <div className="w-3 h-3 bg-green-700 rounded-[2px]" />
                                            <div className="w-3 h-3 bg-green-500 rounded-[2px]" />
                                        </div>
                                        <span>More</span>
                                    </div>
                                </div>

                                {/* Stats Grid Main */}
                                <div className="grid grid-cols-2 gap-4">
                                    {/* Current Rating */}
                                    <div className="bg-[#161b22] px-6 py-5 rounded-xl border-l-4 border-green-500 shadow-lg">
                                        <div className="flex items-center gap-2 mb-1">
                                            <Trophy className="w-4 h-4 text-yellow-500" />
                                            <span className="text-gray-400 text-xs font-bold uppercase">Current Rating</span>
                                        </div>
                                        <div className="text-3xl font-black text-red-500">{stats.rating.current}</div>
                                        <div className="text-xs text-red-400 font-medium">{stats.rating.currentRank}</div>
                                    </div>

                                    {/* Highest Rating */}
                                    <div className="bg-[#1f1e1b] px-6 py-5 rounded-xl border-l-4 border-yellow-600 shadow-lg">
                                        <div className="flex items-center gap-2 mb-1">
                                            <Crown className="w-4 h-4 text-orange-500" />
                                            <span className="text-gray-400 text-xs font-bold uppercase">Highest Rating</span>
                                        </div>
                                        <div className="text-3xl font-black text-red-500">{stats.rating.maxRating}</div>
                                        <div className="text-xs text-red-400 font-medium">{stats.rating.maxRank}</div>
                                    </div>

                                    {/* Universal Rank (Top 0.1%) */}
                                    <div className="bg-[#1f1e1b] px-6 py-5 rounded-xl border-l-4 border-yellow-500 shadow-lg">
                                        <div className="flex items-center gap-2 mb-1">
                                            <Crown className="w-4 h-4 text-yellow-500" />
                                            <span className="text-gray-400 text-xs font-bold uppercase">Universal Rank</span>
                                        </div>
                                        <div className="text-2xl font-black text-yellow-400">Top 0.1%</div>
                                    </div>

                                    {/* Longest Streak */}
                                    <div className="bg-[#18161b] px-6 py-5 rounded-xl border-l-4 border-purple-500 shadow-lg">
                                        <div className="flex items-center gap-2 mb-1">
                                            <Zap className="w-4 h-4 text-purple-400" />
                                            <span className="text-gray-400 text-xs font-bold uppercase">Longest Streak</span>
                                        </div>
                                        <div className="text-2xl font-black text-purple-300">{stats.longestStreak} days</div>
                                    </div>
                                </div>

                                {/* Secondary Stats */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-[#161b22] px-6 py-5 rounded-xl border-l-4 border-teal-500">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Calendar className="w-4 h-4 text-teal-500" />
                                            <span className="text-gray-400 text-xs font-bold">Most Active Day</span>
                                        </div>
                                        <div className="text-xl font-bold text-teal-400">{stats.mostActiveDay}</div>
                                    </div>
                                    <div className="bg-[#1a161f] px-6 py-5 rounded-xl border-l-4 border-pink-500">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Code2 className="w-4 h-4 text-pink-500" />
                                            <span className="text-gray-400 text-xs font-bold">Top Language</span>
                                        </div>
                                        <div className="text-xl font-bold text-pink-400 truncate">{stats.topLanguage}</div>
                                    </div>
                                </div>

                                {/* Power Level Footer */}
                                <div className="bg-[#111827] rounded-xl p-8 text-center border-t-4 border-blue-500 relative overflow-hidden">
                                    <div className="relative z-10 space-y-2">
                                        <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Power Level</p>
                                        <div className="flex justify-center items-center gap-3">
                                            <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 uppercase">
                                                {stats.PowerClass.title}
                                            </h2>
                                            <span className="text-4xl">🌊</span>
                                        </div>
                                        <p className="text-gray-400 text-sm">Embarking on an epic coding journey!</p>
                                    </div>
                                    <div className="absolute top-0 right-0 text-gray-700 text-[10px] p-2">
                                        {stats.totalSubmissions} submissions
                                    </div>
                                </div>

                                <div className="text-center pt-4 border-t border-white/5">
                                    <p className="text-gray-600 text-[10px] font-mono tracking-widest uppercase">Created by @AleksejDjukic • codeforces-wrapped.vercel.app</p>
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
