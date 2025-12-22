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


