
import {NextResponse} from 'next/server'
import type {NextRequest} from 'next/server'
import { jwtDecode } from "jwt-decode";
import {cookies} from "next/headers";


type IDecoded = {
    email: string,
    role: string,
}

export async function middleware(request: NextRequest) {
    const token = (await cookies()).get('accessToken')?.value
    if (!token) {
        const url = new URL('/register', request.url)
        return NextResponse.redirect(url)
    }

    try {
        const decoded = jwtDecode(token) as IDecoded;
        if (decoded?.role !== 'ADMIN') {
            const url = new URL('/register', request.url)
            return NextResponse.redirect(url)
        }
    } catch {
        const url = new URL('/register', request.url)
        return NextResponse.redirect(url)
    }

    return NextResponse.next()
}


export const config = {
    matcher: ['/dashboard/:path*'],
}
