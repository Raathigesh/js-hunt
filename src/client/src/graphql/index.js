import { ApolloClient, createNetworkInterface } from "react-apollo";

const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: "http://jshunt.azurewebsites.net/data"
  })
});

export default client;
