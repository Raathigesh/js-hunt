const express = require("express");
const graphqlHTTP = require("express-graphql");
const credentials = require("./credentials.json");
const cors = require("cors");
import SheetQL from "./SheetQL";

const app = express();
app.use(cors());
const sheetQL = new SheetQL(credentials);
sheetQL.authorize();

app.use(
  "/data",
  graphqlHTTP({
    schema: sheetQL.getSchema(),
    graphiql: true
  })
);

app.listen(process.env.port || 4000, function() {
  console.log("Example app listening on port 4000!");
});
