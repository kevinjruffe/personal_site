import { getEntryBySlug, getSlugs } from "../../graphql/queries";
import { NextSeo } from "next-seo";
import Article from "../../components/Article";
import graphQLClient from "../../graphql/client";
import markdownToHtml from "../../lib/markdownToHtml";
import PageLayout from "../../components/PageLayout";

export default function Entry({ entry }) {
  return (
    <>
      <NextSeo description={getSeoDescription(entry.tagsCollection.items)} />
      <PageLayout>
        <Article entry={entry} />
      </PageLayout>
    </>
  );
}

export async function getStaticProps({ params: { slug } }) {
  const entryOriginal = (await graphQLClient.request(getEntryBySlug, { slug }))
    .contentTypeEntryCollection.items[0];

  // Transform Markdown to HTML
  const entry = await markdownToHtml(entryOriginal);

  return { props: { entry } };
}

export async function getStaticPaths() {
  const slugs = (await graphQLClient.request(getSlugs))
    .contentTypeEntryCollection.items;

  return {
    paths: slugs.map((entry) => ({ params: { slug: entry.slug } })),
    fallback: false,
  };
}

function getSeoDescription(tags) {
  return tags.length
    ? `A blog post covering: ${tags.map((tagObj) => tagObj.name).join(", ")}`
    : "A blog post by Kevin Ruffe.";
}
