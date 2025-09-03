"use client";

import type { GetServerSideProps } from "next";
import { parseCookies } from "nookies";

function decodeUser(token: string | undefined | null): string | null {
  if (!token) return null;
  try {
    const decoded = JSON.parse(Buffer.from(token, "base64").toString("utf8"));
    return decoded?.u ?? null;
  } catch {
    return null;
  }
}

export default function Home({ user }: { user: string }) {
  return (
    <div style={{ padding: 24 }}>
      <h1>Host App</h1>
      <p>Welcome, <b>{user}</b></p>

      <p style={{ marginTop: 16 }}>
        <a href="/dashboard">Go to Remote “dashboard”</a> &nbsp;|&nbsp;{" "}
        <a href="/remote2">Go to Remote “remote2”</a> &nbsp;|&nbsp;{" "}
        <a href="/api/logout">Logout</a>
      </p>
    </div>
  );
}

// Server-side auth gate
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { auth } = parseCookies(ctx);
  if (!auth) {
    return {
      redirect: { destination: "/login", permanent: false },
    };
  }
  const user = decodeUser(auth) || "user";
  return { props: { user } };
};