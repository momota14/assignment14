import { NextResponse } from "next/server";

export async function POST(req, res) {
  const JsonBody = await req.json();
  const { name, email, password } = JsonBody || {};

  const min = 1000; // Minimum 4-digit number (1000)
  const max = 9999; // Maximum 4-digit number (9999)

  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

  const response = NextResponse.json({ status: true });

  // Then set a cookie
  response.cookies.set({
    name: "verifying",
    value: randomNumber,
    httpOnly: true,
    maxAge: 60 * 60,
  });

  //Data Checking
  if (name !== "" && email !== "" && password !== "") {
    // response.redirect(new URL("/verify", req.url));
    console.log(response);
    return response;
  } else {
    return NextResponse.json({ status: false, message: "Request Fail" });
  }
}
