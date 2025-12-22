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

    ]
}