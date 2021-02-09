import { getEntriesByTag, getTags } from "../../graphql/queries";
import { useRouter } from "next/router";
import EntryCollection from "../../components/EntryCollection";
import graphQLClient from "../../graphql/client";
import markdownToHtml from "../lib/markdownToHtml";
import PageLayout from "../../components/PageLayout";

export default function Tag({ entries }) {
  const router = useRouter();

  return (
    <PageLayout>
      <EntryCollection
        heading={`Posts Tagged "${router.query.name}"`}
        entries={entries}
      />
    </PageLayout>
  );
}

export async function getStaticProps({ params: { name } }) {
  const linkedFrom = (
    await graphQLClient.request(getEntriesByTag, { tag: name })
  ).tagCollection.items[0].linkedFrom;
  const {
    contentTypeEntryCollection: { items: entriesOriginal },
  } = linkedFrom;

  // Transform Markdown to HTML
  const entries = await Promise.all(entriesOriginal.map(markdownToHtml));

  return { props: { entries } };
}

export async function getStaticPaths() {
  const tags = (await graphQLClient.request(getTags)).tagCollection.items;
  console.log(tags);
  return {
    paths: tags.map((tag) => ({ params: { name: tag.name } })),
    fallback: false,
  };
}
