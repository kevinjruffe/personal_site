import { NextSeo } from "next-seo";
import H1 from "../components/H1";
import Image from "next/image";
import PageLayout from "../components/PageLayout";

export default function About() {
  const imgClass = "w-32 transition-opacity hover:opacity-70 sm:w-24";
  const liClass = "p-10 sm:p-5";

  return (
    <>
      <NextSeo
        title="Contact"
        description="Where to reach me."
        openGraph={{ url: "https://kevinruffe.com/contact" }}
      />
      <PageLayout>
        <div className="text-center pt-32">
          <H1>You Can Find Me At...</H1>
          <address>
            <ul className="flex items-center justify-center">
              <li className={liClass}>
                <a href="https://www.instagram.com/kevinjruffe/">
                  <Image
                    src="/instagram.png"
                    alt="Instagram"
                    width={128}
                    height={128}
                    className={imgClass}
                  />
                </a>
              </li>
              <li className={liClass}>
                <a href="https://github.com/kevinjruffe">
                  <Image
                    src="/github.png"
                    alt="GitHub"
                    width={128}
                    height={125}
                    className={imgClass}
                  />
                </a>
              </li>
            </ul>
          </address>
        </div>
      </PageLayout>
    </>
  );
}
