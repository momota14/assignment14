import { NextResponse } from "next/server";
import { CheckCookieAuth } from "./utility/MiddlewareUtility";
import protectedPath from "./utility/protectedPath";

export async function middleware(req, res) {
  if (
    req.nextUrl.pathname === "/login" ||
    req.nextUrl.pathname === "/register"
  ) {
    return await protectedPath(req);
  }

  if (req.nextUrl.pathname.startsWith("/dashboard")) {
    return await CheckCookieAuth(req, res);
  }

  if (req.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}
