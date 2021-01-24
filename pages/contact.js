import H1 from "../components/H1";
import PageLayout from "../components/PageLayout";

export default function About() {
  const imgClass = "w-32 transition-opacity hover:opacity-70 sm:w-24";
  const liClass = "p-10 sm:p-5";

  return (
    <PageLayout titleOverride="Contact">
      <div className="text-center pt-32">
        <H1>You Can Find Me At...</H1>
        <address>
          <ul className="flex items-center justify-center">
            <li className={liClass}>
              <a href="https://www.instagram.com/kevinjruffe/">
                <img
                  src="/instagram.png"
                  alt="Instagram"
                  className={imgClass}
                />
              </a>
            </li>
            <li className={liClass}>
              <a href="https://github.com/kevinjruffe">
                <img src="/github.png" alt="GitHub" className={imgClass} />
              </a>
            </li>
          </ul>
        </address>
      </div>
    </PageLayout>
  );
}
