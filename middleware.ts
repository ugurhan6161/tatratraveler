import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const pathnameIsMissingLocale = ["/en", "/ar", "/tr"].every((locale) => !pathname.startsWith(locale))

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request)
    return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url))
  }

  // Add security headers
  const response = NextResponse.next()

  // Security headers
  response.headers.set("X-Frame-Options", "DENY")
  response.headers.set("X-Content-Type-Options", "nosniff")
  response.headers.set("Referrer-Policy", "origin-when-cross-origin")
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()")

  // SEO headers
  response.headers.set("X-Robots-Tag", "index, follow")

  return response
}

function getLocale(request: NextRequest) {
  // Check if locale is in URL
  const pathname = request.nextUrl.pathname
  if (pathname.startsWith("/ar")) return "ar"
  if (pathname.startsWith("/tr")) return "tr"

  // Check Accept-Language header
  const acceptLanguage = request.headers.get("accept-language")
  if (acceptLanguage) {
    if (acceptLanguage.includes("ar")) return "ar"
    if (acceptLanguage.includes("tr")) return "tr"
  }

  // Default to English
  return "en"
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!_next|api|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
}
