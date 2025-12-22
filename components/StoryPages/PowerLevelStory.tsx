'use client';

import { motion } from "framer-motion";
import { useState ,useEffect} from "react";
import { UserStats } from "@/lib/types";
import { Zap } from "lucide-react";

interface PowerLevelStoryProps{
    stats: UserStats;
    onNext: () => void;
}

