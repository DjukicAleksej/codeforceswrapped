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