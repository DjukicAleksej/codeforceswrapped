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
                    </div>
                </div>
            </div>
        </main>
    )
}