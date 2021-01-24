import { gql } from "graphql-request";

export const itemsDataFragment = gql`
  fragment itemsData on ContentTypeEntry {
    title
    slug
    date
    body
    coordinates {
      lat
      lon
    }
  }
`;

export const tagsDataFragment = gql`
  fragment tagsCollection on ContentTypeEntry {
    tagsCollection {
      items {
        name
      }
    }
  }
`;
