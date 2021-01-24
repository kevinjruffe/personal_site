import { GraphQLClient } from "graphql-request";

const graphQLClient = new GraphQLClient(process.env.API_ENDPOINT, {
  headers: {
    authorization: `Bearer ${process.env.API_AUTH_TOKEN}`,
  },
});

export default graphQLClient;
