'use client';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {Card, CardHeader , CardTitle , CardDescription,CardContent} from '@/components/ui/card';
import {Badge} from '@/components/ui/badge';
import {Avatar} from '@/components/ui/avatar';
import Image from 'next/image';
import { useRouter} from 'next/navigation';
import { Trophy,ChevronRight} from 'lucide-react';
import Link from 'next/link';
import {toast,Toaster} from 'sonner';

export default function Home(){
    const [handle,setHandle] = useState('');
    const [loading,setLoading] = useState(false);
    const router = useRouter();
    const [showCopied,setShowCopied] = useState(false);

    const generateWrapped = async (e: React.FormEvent) => {
        e.preventDefault();
        if(!handle){
            toast.error("Please enter a Codeforces handle");
        return;        
    }
    setLoading(true);
    try{
        const res = await fetch(`/api/stats?handle=${handle}`);
        const data = await res.json();

        if(!res.ok) throw new Error(data.error || 'Failed to fetch user data');

        router.push(`/wrapped/${handle}`);
    } catch(error:any) {
        toast.error(error.message || 'Something went wrong');

    } finally {
        setLoading(false);
    }
    };
    const featuredUsers = [
        {handle: "tourist" , description:"Legendary Competitive Programmer",    image:"/assets/tourist.jpg"},
        {handle: "jiangly", description: "Competitive Programming Expert", image: "/assets/jiangly.jpg"},
        { handle: "Benq", description: "USACO Guide Contributor", image: "/assets/benq.jpg" },
        { handle: "Um_nik", description: "Expert Problem Solver", image: "/assets/umnik.jpg" },
        { handle: "Radewoosh", description: "Top Competitive Programmer", image: "/assets/radewoosh.jpg" }

    ];
    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText('40488690');
            setShowCopied(true);
            setTimeout(() => setShowCopied(false), 2000);
        } catch {
            toast.error(`Failed to copy`);
        }
    };

    return (
        <main className ="min-h-screen bg-gradient-to-b from-background to-secondary/20">
            <div className="container mx-auto px-4 py-16 flex flex-col items-center">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">Codeforces Wrapped</h1>
                    <p className="text-xl text-muted-foreground mb-8">
                        Discover your competitive programming journey in 2025
                    </p>
                    <div className="max-w-md mx-auto">
                        <form onSubmit={generateWrapped} className="flex gap-2 mb-4">
                            <Input 
                            placeholder="Enter your Codeforces handle"
                            value = {handle}
                            onChange={(e) => setHandle(e.target.value)}
                            className="text-lg"
                            />
                            <Button 
                            type="submit"
                            disabled={loading}
                            size="lg"
                            className="bg-primary hover:bg-primary/90"
                            >
                                {loading ? 'Loading...' : 'Generate My Wrapped'}
                                </Button>

                        </form>
                        <p className ="text-sm text-muted-foreground">
                            Best viewed on desktop
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full">
                    <h2 className="text-2xl font-semibold col-span-full mb-4">Featured Profiles</h2>
                    {featuredUsers.map((user) =>  (
                        <Link 
                        key={user.handle}
                        href={`/wrapped/${user.handle}`}
                        className="group relative overflow-hidden p-4 bg-[#1a1d24] rounded-xl transition-all duration-500 hover:bg-[#22262e] hover:scale-[1.02] hover:-translate-y-1 hover:shadow-xl"
                        >
                            <div className="flex items-center gap-3">
                                <div className="relative h-12 w-12 rounded-full overflow-hidden">
                                    <Image
                                    src={user.image}
                                    alt={`${user.handle}'s avatar`}
                                    fill
                                    className="object-cover transform transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>
                                <div className="transform transition-all duration-500 group-hover:translate-x-1">
                                      <h3 className="text-white font-medium">{user.handle}</h3>
                                      <p className="text-gray-400 text-sm">{user.description}</p>
                                </div>
                            </div>
                              <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-600 transform transition-all duration-500 group-hover:translate-x-1 group-hover:text-white" />
                        </Link>
                    ))}
                </div>
                <footer className="mt-8 text-center space-y-4">
                    <div className="flex justify-center space-x-6 text-sm">
                        <Link 
                        href="https://github.com/DjukicAleksej"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white transition-colors"
                        >
                            Created by Aleksej Djukic 🇧🇦
                        </Link>
                        <Link
                        href="https://github.com/DjukicAleksej/codeforceswrapped/issues"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white transition-colors"
                        >
                            Request a feature ⚡️ or report a bug 🐛
                        </Link>
                    </div>
                </footer>
            </div>
            <Toaster />
        </main>
    );
}