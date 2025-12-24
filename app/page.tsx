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
        <main className="min-h-screen bg-black text-white relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 mesh-bg opacity-30 pointer-events-none" />
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] pointer-events-none opacity-20" />

            <div className="container mx-auto px-4 py-8 relative z-10">
                {/* Hero Section */}
                <div className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-12">
                    <div className="animate-fade-in-down space-y-6 max-w-4xl mx-auto">
                        <Badge variant="secondary" className="bg-white/10 text-primary-foreground border-white/10 hover:bg-white/20 transition-all px-4 py-1.5 rounded-full text-sm font-medium backdrop-blur-md mb-4 inline-flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-yellow-400" />
                            <span>Codeforces Wrapped 2025 is here!</span>
                        </Badge>

                        <h1 className="text-6xl md:text-8xl font-black font-heading tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-gray-500 pb-2">
                            UNWRAP YOUR <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-glow">
                                CP LEGACY
                            </span>
                        </h1>

                        <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                            Visualize your competitive programming journey. Analyze your stats, streaks, and styling in a stunning story format.
                        </p>
                    </div>

                    <div className="w-full max-w-md mx-auto relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                        <form onSubmit={generateWrapped} className="relative flex gap-2 p-2 bg-black/80 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl">
                            <div className="relative flex-1">
                                <Code2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <Input
                                    placeholder="Enter your Codeforces handle..."
                                    value={handle}
                                    onChange={(e) => setHandle(e.target.value)}
                                    className="pl-10 h-12 bg-transparent border-none text-lg text-white placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0"
                                />
                            </div>
                            <Button
                                type="submit"
                                disabled={loading}
                                size="lg"
                                className="h-12 px-8 bg-white text-black hover:bg-gray-200 font-bold tracking-wide transition-all duration-300"
                            >
                                {loading ? 'Loading...' : 'Generate'}
                            </Button>
                        </form>
                    </div>
                </div>

                {/* Featured Section */}
                <div className="py-24 space-y-16">
                    <div className="text-center space-y-4 animate-on-scroll">
                        <h2 className="text-4xl md:text-5xl font-black font-heading tracking-tight text-white">Hall of Fame</h2>
                        <p className="text-xl text-gray-400">Legends of the arena</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
                        {featuredUsers.map((user, i) => (
                            <Link
                                key={user.handle}
                                href={`/wrapped/${user.handle}`}
                                className="group relative glass-card p-8 flex flex-col items-center text-center space-y-6 hover:-translate-y-2 transition-all duration-300 border border-white/5 hover:border-primary/50 overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-all duration-500" />

                                <div className="relative w-28 h-28 rounded-full p-1 bg-gradient-to-br from-gray-800 to-black group-hover:from-blue-500 group-hover:to-purple-500 transition-all duration-500 shadow-2xl">
                                    <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-black bg-black">
                                        <Image
                                            src={user.image}
                                            alt={user.handle}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />
                                    </div>
                                    <div className="absolute -bottom-2 -right-2 bg-black border border-white/10 rounded-full p-2 shadow-lg">
                                        <TrendingUp className="w-5 h-5 text-green-400" />
                                    </div>
                                </div>

                                <div className="relative z-10 space-y-2">
                                    <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">{user.handle}</h3>
                                    <div className="flex items-center justify-center gap-2">
                                        <span className={`w-2.5 h-2.5 rounded-full ${user.rating >= 3000 ? 'bg-red-500 shadow-[0_0_10px_red]' : 'bg-orange-500'}`} />
                                        <p className="text-sm text-gray-400 font-medium">{user.description}</p>
                                    </div>
                                </div>

                                <div className="w-full pt-6 border-t border-white/5 relative z-10">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-500 uppercase tracking-wider text-xs font-bold">Rating</span>
                                        <span className="font-mono text-white font-black text-lg">{user.rating}</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                <footer className="py-12 text-center text-sm text-gray-500 border-t border-white/5">
                    <p className="flex items-center justify-center gap-2">
                        Built with <span className="text-red-500">♥</span> by
                        <Link href="https://github.com/DjukicAleksej" className="text-white hover:underline underline-offset-4">
                            Aleksej Djukic
                        </Link>
                    </p>
                </footer>
            </div>
        </main>
    );
}