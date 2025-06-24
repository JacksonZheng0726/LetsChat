import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

import { decrypt } from './auth/jwtAuth'

const publicRoutes = ['/login']
const encodedKey = new TextEncoder().encode(process.env.MASTER_SECRET)


export default async function middleware(req: NextRequest) {
  if (!publicRoutes.includes(req.nextUrl.pathname)) {
    try {
      const cookie = req.cookies.get('session')?.value
      await decrypt(cookie)
      if (cookie) {
        await jwtVerify(cookie, encodedKey, {algorithms: ['HS256']})
      } else {
        throw new Error('session cookie not found, authentication error')
      }
    } catch {
      return NextResponse.redirect(new URL('/login', req.nextUrl))
    }
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'],
}