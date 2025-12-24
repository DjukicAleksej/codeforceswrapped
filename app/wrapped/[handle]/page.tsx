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

// ... imports remain the same, remove html2canvas

const downloadImage = async () => {
    const toastId = toast.loading("Generating image...");
    try {
        const element = document.getElementById('wrapped-summary');
        if (!element) {
            toast.error("Summary element not found", { id: toastId });
            return;
        }

        // html-to-image is much more robust with modern CSS
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
                        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('/grid.svg')" }} />
                        {/* Replaced 'bg-primary/20' and 'bg-purple-500/20' with explicit RGBA/Hex to avoid oklch */}
                        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl pointer-events-none animate-pulse-glow" style={{ backgroundColor: '#6366f133' }} />
                        <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full blur-3xl pointer-events-none animate-pulse-glow delay-1000" style={{ backgroundColor: '#a855f733' }} />

                        <div className="p-8 space-y-8 relative z-10 flex flex-col h-full">
                            {/* Header: Avatar + Title */}
                            <div className="flex flex-col items-center text-center space-y-4">
                                {/* Replaced bg-gradient and shadow with inline styles */}
                                <div className="relative w-32 h-32 rounded-full p-1.5" style={{ background: 'linear-gradient(135deg, #ffffff, #e5e7eb, #9ca3af)', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}>
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
                                    <p className="text-xl font-medium mt-1" style={{ color: '#c084fc' }}>2024 Year in Code</p>
                                </div>
                            </div>

                            {/* Contribution Graph (Simplified Visual) */}
                            <div className="p-6 rounded-xl space-y-4" style={{ backgroundColor: '#161b22', borderColor: 'rgba(255,255,255,0.05)', borderWidth: '1px', borderStyle: 'solid' }}>
                                <div className="flex justify-between items-end text-xs mb-2" style={{ color: '#9ca3af' }}>
                                    <span>{stats.totalSubmissions} submissions in 2024</span>
                                </div>
                                <div className="flex flex-wrap gap-1 justify-center opacity-80">
                                    {/* Generating a visual pattern of squares since we don't have full calendar data mapped to UI yet */}
                                    {Array.from({ length: 147 }).map((_, i) => {
                                        // Mocking intensity for visual similarity to screenshot
                                        const intensityColor = Math.random() > 0.8 ? '#22c55e' : Math.random() > 0.6 ? '#15803d' : '#2d333b';
                                        return <div key={i} className="w-3 h-3 rounded-[2px]" style={{ backgroundColor: intensityColor }} />
                                    })}
                                </div>
                                <div className="flex justify-between text-xs pt-2" style={{ color: '#6b7280' }}>
                                    <span>Less</span>
                                    <div className="flex gap-1">
                                        <div className="w-3 h-3 rounded-[2px]" style={{ backgroundColor: '#2d333b' }} />
                                        <div className="w-3 h-3 rounded-[2px]" style={{ backgroundColor: '#14532d' }} />
                                        <div className="w-3 h-3 rounded-[2px]" style={{ backgroundColor: '#15803d' }} />
                                        <div className="w-3 h-3 rounded-[2px]" style={{ backgroundColor: '#22c55e' }} />
                                    </div>
                                    <span>More</span>
                                </div>
                            </div>

                            {/* Stats Grid Main */}
                            <div className="grid grid-cols-2 gap-4">
                                {/* Current Rating */}
                                <div className="px-6 py-5 rounded-xl border-l-4 shadow-lg" style={{ backgroundColor: '#161b22', borderColor: '#22c55e' }}>
                                    <div className="flex items-center gap-2 mb-1">
                                        <Trophy className="w-4 h-4" style={{ color: '#eab308' }} />
                                        <span className="text-xs font-bold uppercase" style={{ color: '#9ca3af' }}>Current Rating</span>
                                    </div>
                                    <div className="text-3xl font-black" style={{ color: '#ef4444' }}>{stats.rating.current}</div>
                                    <div className="text-xs font-medium" style={{ color: '#f87171' }}>{stats.rating.currentRank}</div>
                                </div>

                                {/* Highest Rating */}
                                <div className="px-6 py-5 rounded-xl border-l-4 shadow-lg" style={{ backgroundColor: '#1f1e1b', borderColor: '#ca8a04' }}>
                                    <div className="flex items-center gap-2 mb-1">
                                        <Crown className="w-4 h-4" style={{ color: '#f97316' }} />
                                        <span className="text-xs font-bold uppercase" style={{ color: '#9ca3af' }}>Highest Rating</span>
                                    </div>
                                    <div className="text-3xl font-black" style={{ color: '#ef4444' }}>{stats.rating.maxRating}</div>
                                    <div className="text-xs font-medium" style={{ color: '#f87171' }}>{stats.rating.maxRank}</div>
                                </div>

                                {/* Universal Rank (Top 0.1%) */}
                                <div className="px-6 py-5 rounded-xl border-l-4 shadow-lg" style={{ backgroundColor: '#1f1e1b', borderColor: '#eab308' }}>
                                    <div className="flex items-center gap-2 mb-1">
                                        <Crown className="w-4 h-4" style={{ color: '#eab308' }} />
                                        <span className="text-xs font-bold uppercase" style={{ color: '#9ca3af' }}>Universal Rank</span>
                                    </div>
                                    <div className="text-2xl font-black" style={{ color: '#facc15' }}>Top 0.1%</div>
                                </div>

                                {/* Longest Streak */}
                                <div className="px-6 py-5 rounded-xl border-l-4 shadow-lg" style={{ backgroundColor: '#18161b', borderColor: '#a855f7' }}>
                                    <div className="flex items-center gap-2 mb-1">
                                        <Zap className="w-4 h-4" style={{ color: '#c084fc' }} />
                                        <span className="text-xs font-bold uppercase" style={{ color: '#9ca3af' }}>Longest Streak</span>
                                    </div>
                                    <div className="text-2xl font-black" style={{ color: '#d8b4fe' }}>{stats.longestStreak} days</div>
                                </div>
                            </div>

                            {/* Secondary Stats */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="px-6 py-5 rounded-xl border-l-4" style={{ backgroundColor: '#161b22', borderColor: '#14b8a6' }}>
                                    <div className="flex items-center gap-2 mb-2">
                                        <Calendar className="w-4 h-4" style={{ color: '#14b8a6' }} />
                                        <span className="text-xs font-bold" style={{ color: '#9ca3af' }}>Most Active Day</span>
                                    </div>
                                    <div className="text-xl font-bold" style={{ color: '#2dd4bf' }}>{stats.mostActiveDay}</div>
                                </div>
                                <div className="px-6 py-5 rounded-xl border-l-4" style={{ backgroundColor: '#1a161f', borderColor: '#ec4899' }}>
                                    <div className="flex items-center gap-2 mb-2">
                                        <Code2 className="w-4 h-4" style={{ color: '#ec4899' }} />
                                        <span className="text-xs font-bold" style={{ color: '#9ca3af' }}>Top Language</span>
                                    </div>
                                    <div className="text-xl font-bold truncate" style={{ color: '#f472b6' }}>{stats.topLanguage}</div>
                                </div>
                            </div>

                            {/* Power Level Footer */}
                            <div className="rounded-xl p-8 text-center relative overflow-hidden" style={{ backgroundColor: '#111827', borderTop: '4px solid #3b82f6' }}>
                                <div className="relative z-10 space-y-2">
                                    <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#6b7280' }}>Power Level</p>
                                    <div className="flex justify-center items-center gap-3">
                                        {/* Gradient Text for Power Level */}
                                        <h2 className="text-4xl font-black uppercase" style={{
                                            backgroundImage: 'linear-gradient(to right, #22d3ee, #3b82f6)',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                            backgroundClip: 'text',
                                            color: 'transparent'
                                        }}>
                                            {stats.PowerClass.title}
                                        </h2>
                                        <span className="text-4xl">🌊</span>
                                    </div>
                                    <p className="text-sm" style={{ color: '#9ca3af' }}>Embarking on an epic coding journey!</p>
                                </div>
                                <div className="absolute top-0 right-0 text-[10px] p-2" style={{ color: '#374151' }}>
                                    {stats.totalSubmissions} submissions
                                </div>
                            </div>

                            <div className="text-center pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                                <p className="text-[10px] font-mono tracking-widest uppercase" style={{ color: '#4b5563' }}>Created by @AleksejDjukic • codeforces-wrapped.vercel.app</p>
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
