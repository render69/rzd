import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
    const cookie = req.headers.get('cookie')?.split(';').find((c) => c.trim().startsWith('rzd-auth='));
    const userId = cookie?.split('=')[1];

    if (!userId && req.nextUrl.pathname.startsWith('/lk')) {
        return NextResponse.redirect(new URL('/', req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/lk/:path*']
}
