import type {
  ContentfulEntry,
  Entry as EntryType,
  Tag,
} from "../../types/contentful";
import { GetStaticProps, GetStaticPaths } from "next";

import { getEntryBySlug, getSlugs } from "../../graphql/queries";
import { ParsedUrlQuery } from "querystring";
import {
  markdownToHtml,
  repackageTagData,
} from "../../lib/repackageContentfulData";
import { NextSeo } from "next-seo";
import Article from "../../components/Article";
import graphQLClient from "../../graphql/client";
import PageLayout from "../../components/PageLayout";

type EntryProps = {
  entry: EntryType;
};

export default function Entry({ entry }: EntryProps) {
  return (
    <>
      <NextSeo
        description={getSeoDescription(entry.tags)}
        openGraph={{
          title: `${entry.title}`,
          url: `https://kevinruffe.com/entry/${entry.slug}`,
          type: "article",
          article: {
            publishedTime: `${entry.date}`,
            authors: ["https://kevinruffe.com/about"],
            tags: [
              `${entry.tags
                .map((tagObj: Tag): string => tagObj.name)
                .join(",")}`,
            ],
          },
        }}
      />
      <PageLayout>
        <Article entry={entry} />
      </PageLayout>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const entryOriginal: ContentfulEntry = (
    await graphQLClient.request(getEntryBySlug, { slug: params!.slug })
  ).contentTypeEntryCollection.items[0];

  // Transform Markdown to HTML
  const entry: EntryType = await markdownToHtml(
    repackageTagData(entryOriginal)
  );

  return { props: { entry } };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs: Array<EntryType> = (await graphQLClient.request(getSlugs))
    .contentTypeEntryCollection.items;

  return {
    paths: slugs.map((entry) => ({ params: { slug: entry.slug } })),
    fallback: false,
  };
};

function getSeoDescription(tags: Array<Tag>): string {
  return tags.length
    ? `A blog post covering: ${tags.map((tagObj) => tagObj.name).join(", ")}`
    : "A blog post by Kevin Ruffe.";
}
