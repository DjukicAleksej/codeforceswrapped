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

        }
    }
}