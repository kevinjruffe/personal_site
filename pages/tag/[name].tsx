import type {
  ContentfulEntry,
  Entry,
  Tag as TagType,
} from "../../types/contentful";
import { GetStaticProps, GetStaticPaths } from "next";

import { getEntriesByTag, getTags } from "../../graphql/queries";
import {
  markdownToHtml,
  repackageTagData,
} from "../../lib/repackageContentfulData";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import EntryCollection from "../../components/EntryCollection";
import graphQLClient from "../../graphql/client";
import PageLayout from "../../components/PageLayout";

type Props = {
  entries: Array<Entry>;
};

export default function Tag({ entries }: Props) {
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

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const entriesOriginal: Array<ContentfulEntry> = (
    await graphQLClient.request(getEntriesByTag, { tag: params!.name })
  ).tagCollection.items[0].linkedFrom.contentTypeEntryCollection.items;

  const entries: Array<Entry> = [
    ...(await Promise.all(
      entriesOriginal.map(repackageTagData).map(markdownToHtml)
    )),
  ];

  return { props: { entries } };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const tags: Array<TagType> = (await graphQLClient.request(getTags))
    .tagCollection.items;

  return {
    paths: tags.map((tag) => ({ params: { name: tag.name } })),
    fallback: false,
  };
};
