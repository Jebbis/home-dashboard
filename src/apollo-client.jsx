import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const client = new ApolloClient({
  link: new HttpLink({
    uri: "https://api.digitransit.fi/routing/v2/hsl/gtfs/v1?digitransit-subscription-key=154d783c2741481c89cebfaf13ba5275",
    headers: {
      "Content-Type": "application/json",
    },
  }),
  cache: new InMemoryCache(),
});

export default client;
