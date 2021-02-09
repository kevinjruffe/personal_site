import { getAssetsDimensionsByUrls } from "../graphql/queries";
import graphQLClient from "../graphql/client";
import marked from "marked";

// Global State
let currentEntryImgDimensions = [];

// Customize how `marked` deals with img tags. We want to add width and height
// as attributes that can be grabbed later in the rendering process.
const renderer = {
  image(href, title, text) {
    const dimensions = currentEntryImgDimensions.pop();
    return `<img src="https:${href}"
            alt=${text}
            width=${dimensions.width}
            height=${dimensions.height} />`;
  },
};
marked.use({ renderer });

/**
 * Convert markdown to HTML
 */
export default async function markdownToHtml(entry) {
  currentEntryImgDimensions = await getImgDimensionsByUrls(
    getImgUrlsFromMarkdown(entry.body)
  );

  return { ...entry, body: marked(entry.body) };
}

/*
|-------------------------------------------------------------------------------
| Image Helper Functions
|-------------------------------------------------------------------------------
 */

function getImgUrlsFromMarkdown(markdown) {
  return [...markdown.matchAll(/!\[.+/g)]
    .map((matchResultArray) => matchResultArray[0])
    .map((markdownTag) => markdownTag.match(/[^!\[\w\s\]\(].+[^\)]/)[0]);
}

async function getImgDimensionsByUrls(urls) {
  return (await graphQLClient.request(getAssetsDimensionsByUrls, { urls }))
    .assetCollection.items;
}
