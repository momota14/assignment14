import { VerifyToken } from "@/utility/JWTHelper";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req, res) {
  const JsonBody = await req.json();
  const { email } = JsonBody || {};

  // let token = req.cookies.get("verify");
  //  let payload = token && (await VerifyToken(token.value));
  //  const VerifyCode = payload["verifyToken"];
  //   console.log(verifyCode)

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
      html: `<h1>YOur verification code is 1234</h1>`,
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
