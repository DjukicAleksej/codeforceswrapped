import { NextResponse } from "next/server";
import { fetchUserInfo,fetchUserSubmissions } from "@/lib/api";
import { processUserStats } from "@/lib/stats";

export const dynamic = 'auto';
export const revalidate = 3600; //Revalidate every hour

function getRankAndColor(rating: number) : {rank: string;color: string}{
    if(rating === 0) return {rank: 'Unrated', color: 'text-gray-500'};
    if (rating < 1200) return { rank: 'Newbie', color: 'text-gray-500' };
    if (rating < 1400) return { rank: 'Pupil', color: 'text-green-500' };
    if (rating < 1600) return { rank: 'Specialist', color: 'text-cyan-500' };
    if (rating < 1900) return { rank: 'Expert', color: 'text-blue-500' };
    if (rating < 2100) return { rank: 'Candidate Master', color: 'text-purple-500' };
    if (rating < 2300) return { rank: 'Master', color: 'text-[#FFA500]' };
    if (rating < 2400) return { rank: 'International Master', color: 'text-[#FFA500]' };
    if (rating < 2600) return { rank: 'Grandmaster', color: 'text-[#FF0000]' };
    if (rating < 3000) return { rank: 'International Grandmaster', color: 'text-[#FF0000]' };
    if (rating < 4000) return { rank: 'Legendary Grandmaster', color: 'text-[#FF0000]' };
    return { rank: 'Tourist', color: 'text-[#FF0000]' };
}

async function getUserInfo(handle: string) {
    try{
        const response =await fetch (`https://codeforces.com/api/user.info?handles=${handle}`);
        const data = await response.json();

        if(data.status === 'OK' && data.result.length > 0) {
            const user = data.result[0];
            const currentRating = user.rating || 0;
            const maxRating = user.maxRating || 0;
            const currentRankInfo = getRankAndColor(currentRating);
            const maxRankInfo = getRankAndColor(maxRating);

            //ensure https and gandle both titlephoto and avatar
            let profilePicture = user.titlePhoto || user.avatar || '';
            if(profilePicture){
                profilePicture = profilePicture.replace(/^http:/,'https:');
            }
            
        }
    }
}