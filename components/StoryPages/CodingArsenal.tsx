'use client';

import {motion} from "framer-motion";
import {useState,useEffect} from "react";
import { UserStats } from "@/lib/types";  
import {Code2, Trophy, Medal} from "lucide-react";

interface CodingArsenalProps {
    stats: UserStats;
    onNext: () => void;
}
