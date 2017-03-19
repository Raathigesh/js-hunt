import { ApolloClient, createNetworkInterface } from "react-apollo";

const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: "http://localhost:4000/data"
  })
});

export default client;
