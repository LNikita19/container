import type { AppProps } from "next/app";
// import "@/styles/globals.css"; // keep if you have global css

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
