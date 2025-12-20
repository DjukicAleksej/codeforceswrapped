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