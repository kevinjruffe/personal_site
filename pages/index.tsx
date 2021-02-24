import type { ContentfulEntry, Entry } from "../types/contentful";
import { GetStaticProps } from "next";

import { getEntries } from "../graphql/queries";
import {
  markdownToHtml,
  repackageTagData,
} from "../lib/repackageContentfulData";
import { NextSeo } from "next-seo";
import EntryCollection from "../components/EntryCollection";
import graphQLClient from "../graphql/client";
import PageLayout from "../components/PageLayout";

type Props = {
  entries: Array<Entry>;
};

export default function Home({ entries }: Props) {
  return (
    <>
      <NextSeo description="Kevin's personal blog." />
      <PageLayout>
        <EntryCollection heading="Recent Posts" entries={entries} />
      </PageLayout>
    </>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const entriesOriginal: Array<ContentfulEntry> = (await graphQLClient.request(getEntries))
    .contentTypeEntryCollection.items;

  // Transform Markdown to HTML
  const entries: Array<Entry> = [
    ...(await Promise.all(
      entriesOriginal.map(repackageTagData).map(markdownToHtml)
    )),
  ];

  return {
    props: { entries },
  };
};
