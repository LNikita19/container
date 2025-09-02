"use client";
import type { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import dynamic from "next/dynamic";

const Remote2Page = dynamic(() => import("remote2/RemotePage"), {
  ssr: false,
  loading: () => <div>Loading Remote2...</div>,
});

export default function Remote2Route() {
  return <Remote2Page />;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { auth } = parseCookies(ctx);
  if (!auth) {
    return { redirect: { destination: "/login", permanent: false } };
  }
  return { props: {} };
};
