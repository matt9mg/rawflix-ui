import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import {JWT_TOKEN} from "@/lib/helpers";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    if (!request.cookies.has(JWT_TOKEN)) {
        return NextResponse.redirect(new URL('/auth', request.url))
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: '/',
}