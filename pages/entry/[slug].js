import { getEntryBySlug, getSlugs } from "../../graphql/queries";
import Article from "../../components/Article";
import graphQLClient from "../../graphql/client";
import marked from "marked";
import PageLayout from "../../components/PageLayout";

export default function Entry({ entry }) {
  return (
    <PageLayout>
      <Article entry={entry} />
    </PageLayout>
  );
}

export async function getStaticProps({ params: { slug } }) {
  const {
    contentTypeEntryCollection: { items: entries },
  } = await graphQLClient.request(getEntryBySlug, { slug });

  const entry = { ...entries[0], body: marked(entries[0].body) };

  return { props: { entry } };
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
