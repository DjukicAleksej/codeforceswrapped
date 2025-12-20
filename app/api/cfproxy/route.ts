import {NextResponse} from 'next/server';
import { headers } from 'next/headers';

const CF_API_BASE = 'https://codeforces.com/api';

export const dynamic ='force-dynamic';
export const revalidate = 0;

export async function GET(request: Request) {
    try {
        const headersList = headers();
        const host =  headersList.get('host') || 'localhost';
        const protocol = process.env.NODE_ENV === 'developmeny' ? 'http' : 'https';

        
    }
}