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

function calculatePowerLevel(stats: {
    universalRank: number;
    totalSubmissions: number;
    acceptedSubmissions: number;
}) : PowerClass {
    //calculate based primarily on total submissions
    const submissions  = stats.totalSubmissions;

    if(submissions >= 9000){
        return {
            title: "GOD MODE ⚡",
            color: "text-yellow-400",
            description: "Absolutely legendary! You've transcended mortal coding limits!"
        };

    }else if(submissions >= 4000){
        return {
            title: "SUPER SAIYAN 🔥 💥",
            color: "text-orange-500",
            description: "Your power level is over 4000! Incredible mastery!"
        };
    } else if(submissions >= 2000){
        return {
            title: "SAGE MODE 🌀",
            color: "text-blue-400",
            description: "You've achieved perfect harmony with the code!"
        };
    }  else if(submissions >= 1000){
        return {
            title: "ELITE CLASS ⚡",
            color: "text-purple-500",
            description: "Your dedication to competitive programming is outsdanding!"
        };
    }   else if(submissions >= 500){
        return {
            title: "NINJA 🥷",
            color: "text-gray-300",
            description: "Stealthily solving problems with precision!"
        }; 
    }   else if(submissions >= 100){
        return {
            title: "ADVENTURER 🌊",
            color: "text-cyan-300",
            description: "Embarking on an epic coding journey!"
        }; 
    } else {
        return {
            title: "ROOKIE 🌱",
            color: "text-green-400",
            description: "Beginning your path to greatness!"
        };
    }
}

function calculateStreaks(contributionData: Record<string,number>) : {current: number,longest: number}{
    let current = 0;
    let longest = 0;
    let currentStreak = 0;

    //convert to array and sort by date
    const sortedDates = Object.entries(contributionData)
    .sort((a,b) => a[0].localeCompare(b[0]));

    //calculate streaks
    for(let i = 0;i< sortedDates.length;i++) {
        const [date, count] = sortedDates[i];

        if(count > 0){
            currentStreak++;
            longest = Math.max(longest,currentStreak);
        } else {
            currentStreak = 0;
        }

        //check if this is today or last submission
        const submissionDate = new Date(date);
        const today = new Date();
        if(submissionDate.toDateString()=== today.toDateString()){
            current = currentStreak;
        }
    }
    return {current , longest};
}

function calculateTopLanguage(submissions: Submission[]): string{
    const languageCounts: Record <string,number> = {};

    submissions.forEach(submission => {
        const lang = submission.programmingLanguage;
        languageCounts[lang] = (languageCounts[lang] || 0) + 1;
    });

    let topLanguage = 'Unknown';
    let maxCount = 0;

    Object.entries(languageCounts).forEach(([lang,count]) => {
        if(count > maxCount){
            maxCount = count;
            topLanguage = lang;
        }
    });
    return topLanguage;
}


function processSubmissionStats(submissions: Submission[]) {
    const languageCount = new Map<string, number>();
    const tagCount = new Map<string, number>();

    const thisYearSubmissions = submissions.filter(sub =>{
        const subDate = new Date(sub.creationTimeSeconds * 1000);
        return subDate.getFullYear() === new Date().getFullYear();
    });

    thisYearSubmissions.forEach(submission => {
        //process programming  language
        if(submission.programmingLanguage) {
            languageCount.set(
                submission.programmingLanguage,
                (languageCount.get(submission.programmingLanguage) || 0) + 1
            );
        }
        //proces problem tags safely
        if(submission.problem.tags && Array.isArray(submission.problem.tags)){
            submission.problem.tags.forEach(tag => {
                tagCount.set(tag, (tagCount.get(tag) || 0) + 1);
            });
        }
    });

    //get top lang
    let topLanguage = 'Unknown';
    let maxLangCount = 0;
    languageCount.forEach((count,lang)=> {
        if(count > maxLangCount) {
            maxLangCount = count;
            topLanguage = lang;
        }
    });

    //get top tags
    const topTags = Array.from(tagCount.entries())
    .sort((a,b) => b[1] - a[1])
    .slice(0,5)
    .map(([tag]) => tag);

    return {
        topLanguage,
        topTags,
        languageStats: Object.fromEntries(languageCount),
        tagStats: Object.fromEntries(tagCount)
    };
}