import { NextResponse } from "next/server";
import { VerifyToken } from "./JWTHelper";

export default async function protectedPath(req) {
  let token = req.cookies.get("token");
  let payload = token && (await VerifyToken(token["value"]));

  if (token && payload) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }
}
