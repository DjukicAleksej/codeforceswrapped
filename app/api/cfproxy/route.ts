import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

const CF_API_BASE = 'https://codeforces.com/api';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: Request) {
    try {
        const headersList = (headers() as unknown) as Readonly<Headers>;
        const host = headersList.get('host') || 'localhost';

        //for parsing the url paramss
        const fullUrl = new URL(request.url);
        const endpoint = fullUrl.searchParams.get('endpoint');
        const params = fullUrl.searchParams.get('params');
        if (!endpoint) {
            return NextResponse.json(
                { error: 'Endpoint is required' },
                { status: 400 }
            );
        }
        //construct Codeforces API URL
        const cfUrl = new URL(`${CF_API_BASE}/${endpoint}`);
        if (params) {
            cfUrl.search = params;
        }
        console.log('Fetching from CF API:', cfUrl.toString());

        const response = await fetch(cfUrl.toString(), {
            headers: {
                'Accept': 'application/json',
            },
        });

        if (!response.ok) {
            return NextResponse.json(
                { error: `CF API returned status ${response.status}` },
                { status: response.status }
            );
        }
        const data = await response.json();
        return NextResponse.json(data);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error('CF Proxy Error:  ', error);
        return NextResponse.json(
            { error: error.message || 'Failed to fetch data from CF' },
            { status: 500 }
        );
    }
}