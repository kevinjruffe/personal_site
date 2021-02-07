import { getEntries } from "../graphql/queries";
import EntryCollection from "../components/EntryCollection";
import graphQLClient from "../graphql/client";
import markdownToHtml from "../lib/markdownToHtml";
import PageLayout from "../components/PageLayout";

export default function Home({ entries }) {
  return (
    <PageLayout>
      <EntryCollection heading="Recent Posts" entries={entries} />
    </PageLayout>
  );
}

export async function getStaticProps() {
  const entriesOriginal = (await graphQLClient.request(getEntries))
    .contentTypeEntryCollection.items;

  // Transform Markdown to HTML
  const entries = await Promise.all(entriesOriginal.map(markdownToHtml));

  return {
    props: { entries },
  };
}
