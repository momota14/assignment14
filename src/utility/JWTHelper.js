import { SignJWT, jwtVerify } from "jose";

export async function CreateToken({tokenName, tokenVal}) {
  const secret = new TextEncoder().encode(process.env.jWT_SECRET);
  let token = await new SignJWT({ [tokenName]: tokenVal })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setIssuer(process.env.JWT_ISSUER)
    .setExpirationTime(process.env.JWT_EXPIRATION_TIME)
    .sign(secret);
  return token;
}

export async function VerifyToken({tokenName, tokenVal}) {
  const secret = new TextEncoder().encode(process.env.jWT_SECRET);
  const decoded = await jwtVerify(tokenVal, secret);
  return decoded["payload"];
}
