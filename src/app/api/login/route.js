import { TokenCookie } from "@/utility/TokenCookie";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  const JsonBody = await req.json();
  // console.log(JSON.stringify(JsonBody));
  let email = JsonBody["email"];
  let password = JsonBody["password"];
  //Data Checking
  if (email === "email@email.com" && password === "123") {
    let Cookie = await TokenCookie("email", email);
    return NextResponse.json(
      { status: true, message: "Request completed" },
      { status: 200, headers: Cookie }
    );
  } else {
    return NextResponse.json({ status: false, message: "Request Fail" });
  }
}

export async function GET(req, res) {
  cookies().delete("token");
  return NextResponse.json({ status: true, message: "Request Completed" });
}
