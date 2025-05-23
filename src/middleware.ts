
import {NextResponse} from 'next/server'
import type {NextRequest} from 'next/server'
import jwt from 'jsonwebtoken'


type IDecoded = {
    email: string,
    role: string,
}

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value

    if (!token) {
        const url = new URL('/register', request.url)
        url.searchParams.set('error', 'Please login first!!')
        return NextResponse.redirect(url)
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as IDecoded
        if (decoded?.role !== 'ADMIN') {
            const url = new URL('/register', request.url)
            url.searchParams.set('error', 'You are not admin!!')
            return NextResponse.redirect(url)
        }
    } catch {
        const url = new URL('/register', request.url)
        url.searchParams.set('error', 'Invalid token')
        return NextResponse.redirect(url)
    }

    return NextResponse.next()
}


export const config = {
    matcher: ['/dashboard/:path*'],
}
