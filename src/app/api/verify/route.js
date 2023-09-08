import { VerifyToken } from "@/utility/JWTHelper";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req, res) {
  const JsonBody = await req.json();
  const { email } = JsonBody || {};

  let token = req.cookies.get("verify");
  let payload = token && (await VerifyToken(token.value));
  const VerifyCode = payload["verifyCode"];
  // console.log(JSON.stringify(VerifyCode));

  try {
    const transporter = nodemailer.createTransport({
      host: "mail.teamrabbil.com",
      port: 25,
      secure: false,
      auth: { user: "info@teamrabbil.com", pass: "~sR4[bhaC[Qs" },
      tls: { rejectUnauthorized: false },
    });

    const mailOptions = {
      from: "Verify you mail <info@teamrabbil.com>",
      to: email,
      subject: "Your Verification code",
      html: `<h1>Yur verification code is ${VerifyCode}</h1>`,
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json({
      status: true,
      message: "message sent successfully",
    });
  } catch (e) {
    return NextResponse.json({ status: false, Message: "Error sending" });
  }
}
export async function GET(req, res) {
  // const JsonBody = await req.json();
  // const { inpVal } = JsonBody || {};

  const { searchParams } = new URL(req.url);
  const codeVal = searchParams.get("code");
  console.log(codeVal)

  let token = req.cookies.get("verify");
  let payload = token && (await VerifyToken(token.value));
  const verifyCode = token && payload["verifyCode"];

  if ("" + verifyCode === codeVal) {
    return NextResponse.json({ status: true });
  } else {
    return NextResponse.json({ status: false });
  }
}
