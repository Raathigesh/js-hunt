//schema.js
import {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} from "graphql";
import NodeCache from "node-cache";
import Sheet from "./Sheet.js";

const graphQLCache = new NodeCache();

const SpreadSheet = new GraphQLObjectType({
  name: "SpreadSheet",
  fields: () => ({
    spreadsheetId: {
      type: GraphQLString,
      description: "Id of the spreadsheet.",
      resolve: ({ spreadsheetId, sheet }) => {
        return spreadsheetId;
      }
    },
    spreadsheetUrl: {
      type: GraphQLString,
      description: "Url of the spreadsheet.",
      resolve: ({ spreadsheetId, sheet }) => {
        const spreadSheetUrl = graphQLCache.get("spreadsheetUrl");
        if (spreadSheetUrl) {
          return spreadSheetUrl;
        } else {
          return sheet.getSheetInfo(spreadsheetId).then(res => {
            graphQLCache.set("spreadsheetUrl", res.spreadsheetUrl);
            return res.spreadsheetUrl;
          });
        }
      }
    },
    protectedRows: {
      type: GraphQLInt,
      description: "Protected rows in the sheet",
      resolve: ({ spreadsheetId, sheet }) => {
        const protectedRows = graphQLCache.get("protectedRows");
        if (protectedRows) {
          return protectedRows;
        } else {
          return sheet.getSheetInfo(spreadsheetId).then(res => {
            graphQLCache.set(
              "protectedRows",
              res.sheets[0].properties.gridProperties.frozenRowCount
            );
            return Number(
              res.sheets[0].properties.gridProperties.frozenRowCount
            );
          });
        }
      }
    },
    dataByPage: {
      type: new GraphQLList(new GraphQLList(GraphQLString)),
      description: "Data by offset and limit",
      args: {
        sheetName: { type: GraphQLString },
        startColumn: { type: GraphQLString },
        endColumn: { type: GraphQLString },
        startRowNumber: { type: GraphQLInt },
        endRowNumber: { type: GraphQLInt }
      },
      resolve: ({ spreadsheetId, sheet }, args) => {
        const fullRangeQuery = `${args.sheetName}!${args.startColumn}${args.startRowNumber}:${args.endColumn}${args.endRowNumber}`;
        const cacheKey = `${spreadsheetId}${fullRangeQuery}`;

        console.log("Range " + fullRangeQuery);
        const cachedData = graphQLCache.get(cacheKey);
        if (cachedData) {
          return cachedData;
        } else {
          return sheet
            .getDataByRange(spreadsheetId, fullRangeQuery)
            .then(res => {
              graphQLCache.set(cacheKey, res.values);
              return res.values;
            });
        }
      }
    }
  })
});

export default function getSchema(authorizedSheet) {
  return new GraphQLSchema({
    query: new GraphQLObjectType({
      name: "RootQueryType",
      fields: {
        spreadSheet: {
          type: SpreadSheet,
          args: {
            id: { type: GraphQLString }
          },
          resolve: (root, args) => {
            return {
              spreadsheetId: args.id,
              sheet: authorizedSheet
            };
          }
        }
      }
    })
  });
}
