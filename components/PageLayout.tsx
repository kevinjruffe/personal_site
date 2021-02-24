import Head from "next/head";
import Header from "./Header";
import react, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function PageLayout({ children }: Props) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className="bg-gray"
        style={{ minHeight: "calc(100vh - 3rem)", minWidth: "320px" }}
      >
        <Header />
        <main className="max-w-prose m-auto md:w-5/6">{children}</main>
      </div>
      <footer className="flex items-center justify-center border-t-solid border-t border-green-light h-12">
        <div className="text-green-dark italic font-serif">Amor Fati</div>
      </footer>
    </>
  );
}
