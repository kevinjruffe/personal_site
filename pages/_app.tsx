import type { AppProps } from "next/app";
import { DefaultSeo } from "next-seo";
import SEO from "../next-seo.config";
import "tailwindcss/tailwind.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />
    </>
  );
}
