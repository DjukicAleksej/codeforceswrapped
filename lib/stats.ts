import { CodeforcesUser,Submission,UserStats,PowerClass,RatingPoint }  from "./types";
import {generateContributionData} from './api'


//Utility fuctions

function getRankAndColor(rating: number): {rank: string; color: string} {
    if(!rating || rating === 0) return { rank: 'Unrated',color:'text-gray-500'};
    if(rating < 1200) return { rank: 'Newbie',color:'text-gray-500'};
    if(rating < 1400) return { rank: 'Pupil',color:'text-green-500'};
    if(rating < 1600) return { rank: 'Specialist',color:'text-cyan-500'};
    if(rating < 1900) return { rank: 'Expert',color:'text-blue-500'};
    if(rating < 2100) return { rank: 'Candidate Master',color:'text-purple-500'};
    if(rating < 2300) return { rank: 'Master',color:'text-[#FFA500]'};
    if(rating < 2400) return { rank: 'International Master',color:'text-[#FFA500]'};
    if(rating < 2600) return { rank: 'Grandmaster',color:'text-[#FF0000]'};
    if(rating < 3000) return { rank: 'International Grandmaster',color:'text-[#FF0000]'};
    return {rank: 'Legendary Grandmaster',color: 'text-[#FF0000]'};
}

function calculatePercentileRank(rating: number): number{
    //Codeforces rating distribution approximation
    const maxRating = 3800;
    const currentRating = Math.max(rating,0);

    //calculate percentile (lower is better, like actual ranks)
    return Math.round((1-(currentRating/maxRating)) * 100);
}

function calculateUniversalRank(rating: number): number {
    if(rating === 0) return 100;

    //codeforces uses these tresholds for the ranks
    if(rating >= 3000) return 0.1;//Legendary Grandmaster
    if(rating >= 2600) return 0.3;//international grandmaster
    if(rating >= 2400) return 1;//grandmaster
    if(rating >= 2300) return 2;//international master
    if(rating >= 2100) return 5;//master
    if(rating >= 1900) return 10;//candidate master
    if(rating >= 1600) return 20;//expert
    if(rating >= 1400) return 50;//specialist
    if(rating >= 1200) return 70;//pupil
    return 100;
    
}


function getRankPercentage(rank:string) : number {
    return parseFloat(rank.replace('%', ''));
}