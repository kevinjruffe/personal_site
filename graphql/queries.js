import { gql } from "graphql-request";
import { itemsDataFragment, tagsDataFragment } from "./fragments";

export const getEntries = gql`
  {
    contentTypeEntryCollection {
      items {
        ...itemsData
        ...tagsCollection
      }
    }
  }
  ${itemsDataFragment}
  ${tagsDataFragment}
`;

export const getEntriesByTag = gql`
  query getEntriesByTag($tag: String!) {
    tagCollection(where: { name: $tag }) {
      items {
        linkedFrom {
          contentTypeEntryCollection {
            items {
              ...itemsData
            }
          }
        }
      }
    }
  }
  ${itemsDataFragment}
`;

export const getEntryBySlug = gql`
  query getEntryBySlug($slug: String!) {
    contentTypeEntryCollection(where: { slug: $slug }) {
      items {
        ...itemsData
        ...tagsCollection
      }
    }
  }
  ${itemsDataFragment}
  ${tagsDataFragment}
`;

export const getSlugs = gql`
  {
    contentTypeEntryCollection {
      items {
        slug
      }
    }
  }
`;

export const getTags = gql`
  query getTags {
    tagCollection {
      items {
        name
      }
    }
  }
`;
