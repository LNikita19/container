"use client";

import type { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import Link from "next/link";
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
   const goTo = (path: string) => {
    window.location.href = path;
  };
  return (
    <div style={{ padding: 24 }}>
      <h1>Host App</h1>
      <p>Welcome, <b>{user}</b></p>
    <p style={{ marginTop: 16 }}>
        <button onClick={() => goTo("/dashboard")}>
          Go to Remote “dashboard”
        </button>{" "}
        &nbsp;|&nbsp;
        <button onClick={() => goTo("/remote2")}>
          Go to Remote “remote2”
        </button>{" "}
        &nbsp;|&nbsp;
        <button onClick={() => goTo("/api/logout")}>Logout</button>
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