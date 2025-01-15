import { NextResponse } from 'next/server';
import { getSession } from 'next-auth/react';

export async function middleware(req: any) {
    const session = await getSession({ req });

    if (!session) {
        return NextResponse.redirect(new URL('/', req.url));
    }

    return NextResponse.next();
}
