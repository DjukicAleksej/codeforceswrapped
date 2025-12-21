import { clear } from 'console';
import { CodeforcesUser , Submission} from './types';

const FETCH_TIMEOUT = 10000;

async function fetchWithTimeout(url: string,options: RequestInit = {}) {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(),FETCH_TIMEOUT);
    try {
        const response = await fetch(url , {...options,signal: controller.signal});
        clearTimeout(id);
        return response;
    } catch (error) {
        clearTimeout(id);
        throw error;
    }
}

const CF_API_BASE = 'https://codeforces.com/api';

export async function fetchUserInfo(handle:string) {
    const res = await fetchWithTimeout(`${CF_API_BASE}/user.info?handles=${handle}`);
    if(!res.ok) throw new Error('Failed to fetch user info');
    const data = await res.json();
    if(data.status !== 'OK') throw new Error(data.comment || 'Failed to fetch user info');
    return data.result[0];
}

export async function fetchUserSubmissions(handle: string){
    const res = await fetch (`${CF_API_BASE}/user.status?handle=${handle}`);

    if (!res.ok) {
        throw new Error('Failed to fetch submissions');

    }

    const data = await res.json();
    if(data.status === 'FAILED'){
        throw new Error(data.comment || 'Failed to fetch submissions');
}
return data.result;
}

export function generateContributionData(submissions: Submission[]) : Record<string,number> {
    const contributionData : Record<string,number> = {};

    const currentYear = new Date().getFullYear();
    const startDate = new Date(currentYear,0,1);//jan 1st
    const endDate = new Date(currentYear,11,31);//dec 31st
    
}