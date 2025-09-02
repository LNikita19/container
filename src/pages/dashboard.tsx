"use client";

import type { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import dynamic from "next/dynamic";

const DashboardPage = dynamic(() => import("dashboard/DashboardPage"), {
  ssr: false,
  loading: () => <div>Loading Dashboard...</div>,
});

export default function DashboardRoute() {
  return <DashboardPage />;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { auth } = parseCookies(ctx);
  if (!auth) {
    return { redirect: { destination: "/login", permanent: false } };
  }
  return { props: {} };
};
