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
