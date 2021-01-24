import { getEntryBySlug, getSlugs } from "../../graphql/queries";
import Article from "../../components/Article";
import graphQLClient from "../../graphql/client";
import PageLayout from "../../components/PageLayout";

export default function Entry({ data }) {
  const entry = data.contentTypeEntryCollection.items[0];

  return (
    <PageLayout>
      <Article entry={entry} />
    </PageLayout>
  );
}

export async function getStaticProps({ params: { slug } }) {
  const data = await graphQLClient.request(getEntryBySlug, { slug });
  return { props: { data } };
}

export async function getStaticPaths() {
  const {
    contentTypeEntryCollection: { items: slugs },
  } = await graphQLClient.request(getSlugs);

  return {
    paths: slugs.map((entry) => ({ params: { slug: entry.slug } })),
    fallback: false,
  };
}
