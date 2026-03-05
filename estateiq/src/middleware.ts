import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

// Public routes that don't require authentication
const PUBLIC_ROUTES = ['/', '/login', '/auth/callback', '/api']

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    // Update the Supabase auth session and check if user is actually authenticated
    const { response, isAuthenticated } = await updateSession(request)

    const isPublicRoute = PUBLIC_ROUTES.some(
        (route) => pathname === route || pathname.startsWith(`${route}/`) || pathname.startsWith(`${route}?`)
    )

    // If user is NOT authenticated and trying to access a protected route → redirect to login
    if (!isAuthenticated && !isPublicRoute) {
        const url = request.nextUrl.clone()
        url.pathname = '/login'
        url.searchParams.set('redirect', pathname)
        return NextResponse.redirect(url)
    }

    // If user IS authenticated and on landing page → redirect to /home
    if (isAuthenticated && pathname === '/') {
        const url = request.nextUrl.clone()
        url.pathname = '/home'
        return NextResponse.redirect(url)
    }

    return response
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - images, icons, etc.
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}
