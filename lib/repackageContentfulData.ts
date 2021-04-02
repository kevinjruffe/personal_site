import type {
  ContentfulEntry,
  Entry,
  ImgDimensions,
} from "../types/contentful";

import { getAssetsDimensionsByUrls } from "../graphql/queries";
import graphQLClient from "../graphql/client";
import marked, { MarkedOptions, Renderer } from "marked";

// Global State
const currentEntryImgDimensions: Array<ImgDimensions> = [];

// Customize how `marked` deals with img tags. We want to add width and height
// as attributes that can be grabbed later in the rendering process.
const renderer: any = {
  image(href: string, title: string, text: string): string {
    const dimensions:
      | ImgDimensions
      | undefined = currentEntryImgDimensions.find((img) =>
      href.endsWith(img.fileName.replace(/\s/g, "_"))
    );
    return `<img src="https:${href}"
            alt="${text}"
            width=${dimensions?.width}
            height=${dimensions?.height} />`;
  },
};
marked.use({ renderer });

/*
|-------------------------------------------------------------------------------
| Exported Functions
|-------------------------------------------------------------------------------
 */

/**
 * Convert markdown to HTML
 */
export async function markdownToHtml(entry: Entry): Promise<Entry> {
  currentEntryImgDimensions.push(
    ...(await getImgDimensionsByUrls(getImgUrlsFromMarkdown(entry.body)))
  );

  return { ...entry, body: marked(entry.body) };
}

export function repackageTagData(contentfulEntry: ContentfulEntry): Entry {
  return {
    ...contentfulEntry,
    tags: contentfulEntry.tagsCollection?.items ?? [],
  };
}

/*
|-------------------------------------------------------------------------------
| Image Helper Functions
|-------------------------------------------------------------------------------
 */

function getImgUrlsFromMarkdown(markdown: string): Array<string> {
  const imgTags = [...markdown.matchAll(/!\[.+/g)].map(
    (matchResultArray) => matchResultArray[0]
  );
  return imgTags
    ? imgTags.map((markdownTag) => {
        const result = markdownTag.match(/[^!\[\w\s\]\(].+[^\)]/);
        return result ? result[0] : "";
      })
    : [""];
}

async function getImgDimensionsByUrls(
  urls: Array<string>
): Promise<ImgDimensions[]> {
  return (await graphQLClient.request(getAssetsDimensionsByUrls, { urls }))
    .assetCollection.items;
}
