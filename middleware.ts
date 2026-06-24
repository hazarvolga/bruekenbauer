import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { routing } from "./i18n/routing";
import { isServiceInMaintenance } from "./lib/serviceControl";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const rawPathname = new URL(request.url).pathname;
  const localePrefixPattern = new RegExp(`^/(${routing.locales.join("|")})(/|$)`);
  const hasLocalePrefix = localePrefixPattern.test(rawPathname);
  const pathWithoutLocale = rawPathname.replace(localePrefixPattern, "/");
  const isMaintenancePath = pathWithoutLocale === "/maintenance";

  if (isServiceInMaintenance() && !isMaintenancePath) {
    const localeMatch = rawPathname.match(localePrefixPattern);
    const localePrefix =
      localeMatch?.[1] && localeMatch[1] !== routing.defaultLocale ? `/${localeMatch[1]}` : "";
    const url = request.nextUrl.clone();
    url.pathname = `${localePrefix}/maintenance`;

    return NextResponse.redirect(url);
  }

  if (!hasLocalePrefix) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("X-NEXT-INTL-LOCALE", routing.defaultLocale);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  return intlMiddleware(request);
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
