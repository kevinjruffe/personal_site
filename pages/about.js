import H1 from "../components/H1";
import Link from "next/link";
import PageLayout from "../components/PageLayout";

export default function About() {
  const paragraphStyle = "py-2 text-xl sm:text-base";

  return (
    <PageLayout titleOverride="About">
      <div className="max-w-prose w-10/12 m-auto">
        <div className="w-1/3 mx-auto mt-8">
          <img
            src="/me.png"
            alt="Me"
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
  );
}
