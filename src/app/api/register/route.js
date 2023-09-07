import { VerifyTokenCookie } from "@/utility/verifyTokenCookie";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  const JsonBody = await req.json();
  const { name, email, password } = JsonBody || {};

  const min = 1000;
  const max = 9999;
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  const Token = await VerifyTokenCookie("verifyToken", randomNumber);

  //Data Checking
  if (name !== "" && email !== "" && password !== "") {
    return NextResponse.json(
      { status: true, message: "Register Sucessful" },
      { status: 200, headers: Token }
    );
  } else {
    return NextResponse.json({ status: false, message: "Request Fail" });
  }
}
