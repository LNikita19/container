import type { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";

// very basic credential check for demo
const VALID_USER = "admin";
const VALID_PASS = "1234";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(405).send("Method Not Allowed");
    return;
  }

  const { username, password } = req.body || {};

  if (username === VALID_USER && password === VALID_PASS) {
    // put anything you like in the token; here we store the username plainly for demo
    const token = Buffer.from(JSON.stringify({ u: username })).toString("base64");

    const cookie = serialize("auth", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    res.setHeader("Set-Cookie", cookie);
    // redirect to home (or /dashboard) after login
    res.writeHead(302, { Location: "/" });
    res.end();
  } else {
    // simple back redirect with a query flag
    res.writeHead(302, { Location: "/login?error=1" });
    res.end();
  }
}
