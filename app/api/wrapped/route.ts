import { NextResponse } from "next/server";
import { fetchUserInfo,fetchUserSubmissions } from "@/lib/api";
import { processUserStats } from "@/lib/stats";

export const dynamic = 'auto';
export const revalidate = 3600; //Revalidate every hour