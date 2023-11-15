import Negotiator from "negotiator";
import { NextResponse } from "next/server";
import { match } from "@formatjs/intl-localematcher";

// 1 completed
const locales = ["en-us", "en", "fa-ir", "fa"];
function getLocale(request) {
  // 2 completed
  const defaultLocale = "fa-ir";

  //  be in shekel miam header ha ro migiram v daron yek object zakhire mikonam
  const negotiatorHeaders = {};
  request.headers.forEach((value, key) => {
    negotiatorHeaders[key] = value;
  });

  // 3 completed
  let languages = new Negotiator({ headers: negotiatorHeaders }).languages();

  const locale = match(languages, locales, defaultLocale);

  //   console.log(locale);
  return locale;
}

export function middleware(request) {
  const { pathname } = request.nextUrl;
  // check mikonim user khudesh zaban ro vared karde ye na
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  if (pathnameHasLocale) return;
  const locale = getLocale(request);

  // agr hala vared nakarde bod v niyaz has dynamic khudmon handle konim
  return NextResponse.redirect(
    new URL(`/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`, request.url)
  );
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};


