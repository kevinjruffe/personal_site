import { getEntries } from "../graphql/queries";
import EntryCollection from "../components/EntryCollection";
import graphQLClient from "../graphql/client";
import PageLayout from "../components/PageLayout";

export default function Home({ data }) {
  const entries = data.contentTypeEntryCollection.items;

  return (
    <PageLayout>
      <EntryCollection heading="Recent Posts" entries={entries} />
    </PageLayout>
  );
}

export async function getStaticProps() {
  const data = await graphQLClient.request(getEntries);

  return {
    props: { data },
  };
}
