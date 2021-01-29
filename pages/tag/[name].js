import { getEntriesByTag, getTags } from "../../graphql/queries";
import { useRouter } from "next/router";
import EntryCollection from "../../components/EntryCollection";
import graphQLClient from "../../graphql/client";
import marked from "marked";
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
  const data = await graphQLClient.request(getEntriesByTag, { tag: name });
  const {
    contentTypeEntryCollection: { items: entriesOriginal },
  } = data.tagCollection.items[0].linkedFrom;

  const entries = entriesOriginal.map((entry) => ({
    ...entry,
    body: marked(entry.body),
  }));

  return { props: { entries } };
}

export async function getStaticPaths() {
  const {
    tagCollection: { items: tags },
  } = await graphQLClient.request(getTags);

  return {
    paths: tags.map((tag) => ({ params: { name: tag.name } })),
    fallback: false,
  };
}
