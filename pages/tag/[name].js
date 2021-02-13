import { getEntriesByTag, getTags } from "../../graphql/queries";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import EntryCollection from "../../components/EntryCollection";
import graphQLClient from "../../graphql/client";
import markdownToHtml from "../../lib/markdownToHtml";
import PageLayout from "../../components/PageLayout";

export default function Tag({ entries }) {
  const router = useRouter();

  return (
    <>
      <NextSeo
        description={`Blog posts tagged "${router.query.name}"`}
        openGraph={{ url: `https://kevinruffe.com/tag/${router.query.name}` }}
      />
      <PageLayout>
        <EntryCollection
          heading={`Posts Tagged "${router.query.name}"`}
          entries={entries}
        />
      </PageLayout>
    </>
  );
}

export async function getStaticProps({ params: { name } }) {
  const entriesOriginal = (
    await graphQLClient.request(getEntriesByTag, { tag: name })
  ).tagCollection.items[0].linkedFrom.contentTypeEntryCollection.items;

  const entries = await Promise.all(entriesOriginal.map(markdownToHtml));

  return { props: { entries } };
}

export async function getStaticPaths() {
  const tags = (await graphQLClient.request(getTags)).tagCollection.items;

  return {
    paths: tags.map((tag) => ({ params: { name: tag.name } })),
    fallback: false,
  };
}
