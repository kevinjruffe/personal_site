import { NextSeo } from "next-seo";
import H1 from "../components/H1";
import Image from "next/image";
import Link from "next/link";
import PageLayout from "../components/PageLayout";

export default function About() {
  const paragraphStyle = "py-2 text-xl sm:text-base";

  return (
    <>
      <NextSeo
        title="About"
        description="Who am I and what this site covers."
        openGraph={{ url: "https://kevinruffe.com/about" }}
      />
      <PageLayout>
        <div className="max-w-prose w-10/12 m-auto">
          <div className="w-1/3 mx-auto mt-8">
            <Image
              src="/me.png"
              alt="Me"
              width={182}
              height={182}
              loading="eager"
              className="border-solid border-2 border-green-light rounded-full"
            />
          </div>
          <H1>About Me</H1>
          <p className={paragraphStyle}>
            I'm a web developer, proudly based in rural Vermont. My passions are
            programming, roaming the forests and mountains of my adopted state,
            and my lovely wife, Katie.
          </p>
          <p className={paragraphStyle}>
            Here you'll find posts about my projects, adventures or whatever
            random thing happens to be at the forefront of my mind. Please feel
            free to{" "}
            <Link href="/contact">
              <a>drop me a line</a>
            </Link>
            .
          </p>
        </div>
      </PageLayout>
    </>
  );
}
