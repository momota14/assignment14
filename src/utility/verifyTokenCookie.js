import { CreateToken } from "./JWTHelper";

export async function VerifyTokenCookie({tokenName, tokenVal}) {
  let token = await CreateToken({ tokenName, tokenVal });
  return {
    "Set-Cookie": `verify=${token}; Max-Age=7200; Secure; HttpOnly; Path=/; SameSite=Strict`,
  };
}
