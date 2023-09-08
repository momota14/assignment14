import { CreateToken } from "./JWTHelper";

export async function TokenCookie(tokenName, tokenVal) {
  let token = await CreateToken(tokenName, tokenVal);
  return {
    "Set-Cookie": `token=${token}; Max-Age=7200; Secure; HttpOnly; Path=/; SameSite=Strict`,
  };
}
