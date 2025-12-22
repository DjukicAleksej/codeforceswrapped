'use client';
import { motion } from "framer-motion";
import {useState,useEffect} from "react";
import { UserStats } from "@/lib/types"; 
import {Code2} from "lucide-react";

interface LanguagesProps{
    stats: UserStats;
    onNext: () => void;
}