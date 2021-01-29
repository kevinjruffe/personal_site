import { getEntries } from "../graphql/queries";
import EntryCollection from "../components/EntryCollection";
import graphQLClient from "../graphql/client";
import marked from "marked";
import PageLayout from "../components/PageLayout";

export default function Home({ entries }) {
  return (
    <PageLayout>
      <EntryCollection heading="Recent Posts" entries={entries} />
    </PageLayout>
  );
}

export async function getStaticProps() {
  const {
    contentTypeEntryCollection: { items: entriesOriginal },
  } = await graphQLClient.request(getEntries);

  // Transform Markdown to HTML
  const entries = entriesOriginal.map((entry) => ({
    ...entry,
    body: marked(entry.body),
  }));

  return {
    props: { entries },
  };
}
