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

        //for parsing the url paramss
        const fullURl = new URL(request.url);
        const endpoint = fullURl.searchParams.get('endpoint');
        const params = fullURl.searchParams.get('params');
        if(!endpoint){
            return NextResponse.json(
                {error :'Endpoint is required'},
                {status: 400}
            );
        }
        //construct Codeforces API URL
        const cfUrl = new URL(`${CF_API_BASE}/${endpoint}`);
        if(params){
            cfUrl.search = params;
        }

    }
}