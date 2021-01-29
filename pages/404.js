import H1 from "../components/H1";
import PageLayout from "../components/PageLayout";

export default function Custom404() {
  return (
    <PageLayout>
      <div className="text-center">
        <div className="text-green-light text-9xl pt-40 md:text-7xl sm:text-5xl">
          ¯\_(ツ)_/¯
        </div>
        <H1>
          <span className="md:text-2xl">404 - Page Not Found</span>
        </H1>
      </div>
    </PageLayout>
  );
}
