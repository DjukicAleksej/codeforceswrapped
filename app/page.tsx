'use client';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArrowRight, Sparkles, Terminal, Code2, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

export default function Home() {
    const [handle, setHandle] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const generateWrapped = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!handle) {
            toast.error("Please enter a Codeforces handle");
            return;
        }
        setLoading(true);
        try {
            const res = await fetch(`/api/stats?handle=${handle}`);
            const data = await res.json();

            if (!res.ok) throw new Error(data.error || 'Failed to fetch user data');

            router.push(`/wrapped/${handle}`);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast.error(error.message || 'Something went wrong');
            setLoading(false);
        }
    };

    const featuredUsers = [
        { handle: "tourist", description: "Legendary Grandmaster", image: "/assets/tourist.jpg", rating: 3979 },
        { handle: "jiangly", description: "Legendary Grandmaster", image: "/assets/jiangly.jpg", rating: 3859 },
        { handle: "Benq", description: "Legendary Grandmaster", image: "/assets/benq.jpg", rating: 3691 },
        { handle: "Um_nik", description: "Legendary Grandmaster", image: "/assets/umnik.jpg", rating: 3450 },
        { handle: "Radewoosh", description: "Legendary Grandmaster", image: "/assets/radewoosh.jpg", rating: 3720 }
    ];

    return (
        <main className="min-h-screen bg-black text-white relative overflow-x-hidden w-full selection:bg-indigo-500/30">
            {/* Background Effects */}
            <div className="fixed inset-0 mesh-bg opacity-40 pointer-events-none z-0" />
            <div className="fixed inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] pointer-events-none opacity-20 z-0" />

            <div className="relative z-10 w-full">
                {/* Hero Section */}
                <div className="flex flex-col items-center justify-center min-h-screen px-4 py-20 text-center space-y-16">
                    <div className="animate-fade-in-down space-y-8 max-w-5xl mx-auto">
                        <Badge variant="secondary" className="bg-white/5 text-slate-200 border-white/10 hover:bg-white/10 transition-all px-6 py-2 rounded-full text-base font-medium backdrop-blur-xl mb-6 inline-flex items-center gap-3">
                            <Sparkles className="w-5 h-5 text-indigo-400" />
                            <span className="tracking-wide">Codeforces Wrapped 2025</span>
                        </Badge>

                        <h1 className="text-7xl md:text-9xl font-black font-heading tracking-tighter text-white leading-[0.9] drop-shadow-2xl">
                            UNWRAP YOUR <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400 animate-pulse-glow">
                                CP LEGACY
                            </span>
                        </h1>

                        <p className="text-xl md:text-3xl text-slate-400 max-w-3xl mx-auto leading-relaxed font-light">
                            Visualize your competitive programming journey. Analyze your stats, streaks, and style in a stunning story format.
                        </p>
                    </div>

                    <div className="w-full max-w-lg mx-auto relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-3xl blur-xl opacity-20 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>
                        <form onSubmit={generateWrapped} className="relative flex p-3 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl items-center transition-transform hover:scale-[1.01]">
                            <div className="relative flex-1 group/input">
                                <Code2 className="absolute left-6 top-1/2 -translate-y-1/2 w-8 h-8 text-slate-500 group-focus-within/input:text-indigo-400 transition-colors" />
                                <Input
                                    placeholder="Enter user handle..."
                                    value={handle}
                                    onChange={(e) => setHandle(e.target.value)}
                                    className="pl-20 h-20 bg-transparent border-none text-2xl text-white placeholder:text-slate-600 focus-visible:ring-0 focus-visible:ring-offset-0 font-bold tracking-tight w-full"
                                />
                            </div>
                            <Button
                                type="submit"
                                disabled={loading}
                                size="lg"
                                className="h-20 px-10 ml-4 bg-white text-black hover:bg-indigo-50 hover:text-indigo-900 font-bold text-xl tracking-wide transition-all duration-300 rounded-2xl shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_50px_rgba(99,102,241,0.5)] hover:scale-105 active:scale-95"
                            >
                                {loading ? (
                                    <div className="flex items-center gap-3">
                                        <div className="w-6 h-6 border-3 border-black/30 border-t-black rounded-full animate-spin" />
                                    </div>
                                ) : (
                                    <ArrowRight className="w-8 h-8" />
                                )}
                            </Button>
                        </form>
                    </div>
                </div>

                {/* Hall of Fame Section */}
                <div className="py-32 px-4 w-full max-w-[1920px] mx-auto">
                    <div className="flex flex-col items-center text-center space-y-6 mb-24 animate-on-scroll">
                        <h2 className="text-5xl md:text-7xl font-black font-heading tracking-tight text-white mb-4">Hall of Fame</h2>
                        <div className="h-2 w-32 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full" />
                        <p className="text-2xl text-slate-400 font-light">Legends of the arena</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-12 px-8">
                        {featuredUsers.map((user, i) => (
                            <Link
                                key={user.handle}
                                href={`/wrapped/${user.handle}`}
                                className="group relative glass-card p-10 flex flex-col items-center text-center space-y-8 hover:-translate-y-4 hover:scale-[1.02] transition-all duration-500 border border-white/5 hover:border-indigo-500/30 overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700" />

                                {/* Large Avatar */}
                                <div className="relative w-48 h-48 rounded-full p-1.5 bg-gradient-to-tr from-slate-800 to-slate-900 group-hover:from-indigo-500 group-hover:to-cyan-400 transition-all duration-500 shadow-2xl">
                                    <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-black bg-black">
                                        <Image
                                            src={user.image}
                                            alt={user.handle}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110 saturate-0 group-hover:saturate-100"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />
                                    </div>
                                </div>

                                <div className="relative z-10 space-y-3">
                                    <h3 className="text-3xl font-black text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-cyan-400 transition-all duration-300">
                                        {user.handle}
                                    </h3>
                                    <div className="flex items-center justify-center gap-3">
                                        <span className={`w-3 h-3 rounded-full ${user.rating >= 3000 ? 'bg-red-500 shadow-[0_0_15px_red]' : 'bg-orange-500'} animate-pulse`} />
                                        <p className="text-base text-slate-400 font-medium tracking-wide">{user.description}</p>
                                    </div>
                                </div>

                                <div className="w-full pt-8 border-t border-white/5 relative z-10 mt-auto">
                                    <div className="flex flex-col gap-1 items-center">
                                        <span className="text-slate-500 uppercase tracking-[0.2em] text-xs font-bold">Rating</span>
                                        <span className="font-heading text-white font-black text-4xl tracking-tight">{user.rating}</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                <footer className="py-20 text-center text-slate-500 border-t border-white/5 bg-black/50 backdrop-blur-xl">
                    <p className="flex items-center justify-center gap-2 text-lg">
                        Built with <span className="text-red-500 animate-pulse">♥</span> by
                        <Link href="https://github.com/DjukicAleksej" className="text-indigo-400 hover:text-indigo-300 hover:underline underline-offset-4 font-bold transition-colors">
                            Aleksej Djukic
                        </Link>
                    </p>
                </footer>
            </div>
        </main>
    );
}