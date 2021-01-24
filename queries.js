import { gql } from "graphql-request";

export const getEntries = gql`
  query {
    contentTypeEntryCollection {
      items {
        title
      }
    }
  }
`;
