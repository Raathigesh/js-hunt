require('source-map-support').install();
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 12);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const google = __webpack_require__(9);
const Promise = __webpack_require__(5);

class Sheet {
  constructor(credentials) {
    this.credentials = credentials;
    this.claims = ["https://www.googleapis.com/auth/spreadsheets"];
    this.apiVersion = "v4";
    this.sheets = null;
    this.tokens = null;
    this.NOT_AUTHORIZED_MESSAGE = "Not Authorized!";
  }

  authorize() {
    console.log("Authorizing...");

    const auth = new google.auth.JWT(this.credentials.client_email, null, this.credentials.private_key, this.claims, null);
    google.options({ auth });

    return new Promise((resolve, reject) => {
      auth.authorize((err, tokens) => {
        if (err) {
          reject(err);
        }

        this.sheets = google.sheets(this.apiVersion);
        this.tokens = tokens;
        resolve(tokens);
      });
    });
  }

  getSheetInfo(spreadsheetId) {
    if (!this.tokens) {
      throw new Error(this.NOT_AUTHORIZED_MESSAGE);
    }

    return new Promise((resolve, reject) => {
      this.sheets.spreadsheets.get({
        spreadsheetId
      }, (err, response) => {
        if (err) {
          reject(err);
        }

        resolve(response);
      });
    });
  }

  getDataByRange(spreadsheetId, range) {
    if (!this.tokens) {
      throw new Error(this.NOT_AUTHORIZED_MESSAGE);
    }

    return new Promise((resolve, reject) => {
      this.sheets.spreadsheets.values.get({
        spreadsheetId,
        range: range
      }, (err, response) => {
        if (err) {
          reject(err);
        }

        resolve(response);
      });
    });
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Sheet;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__SheetQL__ = __webpack_require__(2);
const express = __webpack_require__(7);
const graphqlHTTP = __webpack_require__(8);
const credentials = __webpack_require__(4);
const cors = __webpack_require__(6);


const app = express();
app.use(cors());
const sheetQL = new __WEBPACK_IMPORTED_MODULE_0__SheetQL__["a" /* default */](credentials);
sheetQL.authorize();

app.use("/data", graphqlHTTP({
  schema: sheetQL.getSchema(),
  graphiql: true
}));

app.listen(process.env.port || 4000, function () {
  console.log("Example app listening on port 4000!");
});

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__schema_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Sheet_js__ = __webpack_require__(0);



class SheetQL {
  constructor(credentials) {
    this.credentials = credentials;
    this.sheet = new __WEBPACK_IMPORTED_MODULE_1__Sheet_js__["a" /* default */](credentials);
  }

  authorize() {
    return this.sheet.authorize();
  }

  getSchema() {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__schema_js__["a" /* default */])(this.sheet);
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = SheetQL;


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_graphql__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_graphql___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_graphql__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_node_cache__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_node_cache___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_node_cache__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Sheet_js__ = __webpack_require__(0);
/* harmony export (immutable) */ __webpack_exports__["a"] = getSchema;
//schema.js




const graphQLCache = new __WEBPACK_IMPORTED_MODULE_1_node_cache___default.a();

const SpreadSheet = new __WEBPACK_IMPORTED_MODULE_0_graphql__["GraphQLObjectType"]({
  name: "SpreadSheet",
  fields: () => ({
    spreadsheetId: {
      type: __WEBPACK_IMPORTED_MODULE_0_graphql__["GraphQLString"],
      description: "Id of the spreadsheet.",
      resolve: ({ spreadsheetId, sheet }) => {
        return spreadsheetId;
      }
    },
    spreadsheetUrl: {
      type: __WEBPACK_IMPORTED_MODULE_0_graphql__["GraphQLString"],
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
      type: __WEBPACK_IMPORTED_MODULE_0_graphql__["GraphQLInt"],
      description: "Protected rows in the sheet",
      resolve: ({ spreadsheetId, sheet }) => {
        const protectedRows = graphQLCache.get("protectedRows");
        if (protectedRows) {
          return protectedRows;
        } else {
          return sheet.getSheetInfo(spreadsheetId).then(res => {
            graphQLCache.set("protectedRows", res.sheets[0].properties.gridProperties.frozenRowCount);
            return Number(res.sheets[0].properties.gridProperties.frozenRowCount);
          });
        }
      }
    },
    dataByPage: {
      type: new __WEBPACK_IMPORTED_MODULE_0_graphql__["GraphQLList"](new __WEBPACK_IMPORTED_MODULE_0_graphql__["GraphQLList"](__WEBPACK_IMPORTED_MODULE_0_graphql__["GraphQLString"])),
      description: "Data by offset and limit",
      args: {
        sheetName: { type: __WEBPACK_IMPORTED_MODULE_0_graphql__["GraphQLString"] },
        startColumn: { type: __WEBPACK_IMPORTED_MODULE_0_graphql__["GraphQLString"] },
        endColumn: { type: __WEBPACK_IMPORTED_MODULE_0_graphql__["GraphQLString"] },
        startRowNumber: { type: __WEBPACK_IMPORTED_MODULE_0_graphql__["GraphQLInt"] },
        endRowNumber: { type: __WEBPACK_IMPORTED_MODULE_0_graphql__["GraphQLInt"] }
      },
      resolve: ({ spreadsheetId, sheet }, args) => {
        const fullRangeQuery = `${args.sheetName}!${args.startColumn}${args.startRowNumber}:${args.endColumn}${args.endRowNumber}`;
        const cacheKey = `${spreadsheetId}${fullRangeQuery}`;

        console.log("Range " + fullRangeQuery);
        const cachedData = graphQLCache.get(cacheKey);
        if (cachedData) {
          return cachedData;
        } else {
          return sheet.getDataByRange(spreadsheetId, fullRangeQuery).then(res => {
            graphQLCache.set(cacheKey, res.values);
            return res.values;
          });
        }
      }
    }
  })
});

function getSchema(authorizedSheet) {
  return new __WEBPACK_IMPORTED_MODULE_0_graphql__["GraphQLSchema"]({
    query: new __WEBPACK_IMPORTED_MODULE_0_graphql__["GraphQLObjectType"]({
      name: "RootQueryType",
      fields: {
        spreadSheet: {
          type: SpreadSheet,
          args: {
            id: { type: __WEBPACK_IMPORTED_MODULE_0_graphql__["GraphQLString"] }
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

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = {
	"type": "service_account",
	"project_id": "sheetql-161117",
	"private_key_id": "15c58ff0b447868c8767efb3eafcf5a406ec5c49",
	"private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC1yfc/1HiUkDXI\nPw/3zUMHrJqI+JoKpiNaMRvDa6in2L+RDrOqUzovir1v7Ebd73nc5TmTesUIPPCz\nCRKJVx4NAZCksxgLGLwmdSvXACFU/XFnCBl/9rkizluOTHWRi2aFGGR8yUebjI3+\nmeU3GTIoZPdDMY9yUo1YhefiQLG7IimPYqehW0OlihWXaTHOCPmLCKyJMvBm+l8r\n6gpb+vi0sCHccp0NkVYRcMX3Z2WI6TKAlK21kUGNDyLRUv9wxAPGi4roQHEJ7qhG\neQ1m39F/BlM031FQyXSSNSnzQsU7+FSldPy9ccxi3LkV+YKuoCQNKJjk9j37NB0K\nV3RTSTBfAgMBAAECggEAdYneibDRPg14GL9djbVz75RUXteOkfAVz40NDG+hntTw\nF9RPqoMhjffAwIsezwS14HN9pLOujcMJRllJWO+xCGvIoBUEKLiXfq4n6F23L4Kn\nPhzoj+pwjearH/ij07U0Vj4NSvnBiPt6G/JZWCS8X43YqeNzglGJ/oCmC44U3I8E\nEkb/iKDt4DWc8B7hoONgLuUQu4yjm9Q39bmtbAL5/Otn4k/pkkBlFeqGif8ByAMz\nMc60/J3AFPh6cGos7894t6KGota0pRxXRxOEOaLYXDg8HKCcfZJtkERVCk29agee\nAhhBmi+oxpfejYa65bC5V8FWjwT6CY2WMFvjdImsAQKBgQDrerkIxW18jBouv2m0\nrqq/D4QQwaYA+IrFOZYYURJ3fdUrVtsSb1x+9/vwZexjUURgCJ9fJCIgWqy6YAn+\nGyJKN96LIQBARe+0YmmPGMxorn/S1BBcyvHXT3SjHrPWTahsIneiursLEPRFPSmh\nluWqA+sTx3vOv55uDJrpBR5nXwKBgQDFoXhS0uNVx3tlz/CXkscW3EtZmQwc2R3i\n18vM/H2uFCH+Tg9ts+If9RPB9GGyRVcDX76mt4C314Fz1M7jMBNfi5ZOS/YETT1J\nMxPoaO36CEKX+587rYRR9L7gIYu1emtDf1z6M+hixRcY/MA3oLPGy7XNnDsBTKwT\nH1B52ubXAQKBgDh1PyH0O/DtomVs7UotyrBuZuqhk0yOSq9IxEzmOzg9CjwO4g2E\nd7fVeylDNq8FUBB6YMOt5SS+uMUiu6KaHNmQlaHj8qx2WCd2pPpzJqc+l1UUFSw6\nWEuYOE3X0aRjECuFBAwXGztnADoNlQqyJDRkJhui63NBjBm0mfueh5CfAoGAEgC9\nhz3yu5OqaAHjNsuGG00CCC1q7w3QLSPfStMNV9g5qILP4Pxr8uFOZXKvm5+5Z3NH\nWMSKkzSsdDLEjemJOkDq9kLxLD8lABAJFjjIxOgPuOyQ+sy5qwWShbRIl8WJE+L8\nQ0aLOsQdcIdFs0uOVOOlsg8zSNEFM9C8cf1A3gECgYEA00nVmXxmUKAW2u+lgzUa\nmXowG3EQF+wvCBjYQ17Gm+2U8XQMX3HEilQhrPJkZubTvYIUT67Q9T26OyJdMkXK\n8Nr4Ee9mC514mDlnhYh2zenrwHn06EWXXAmb7KJsGAlcInecyuEe6T/ErSR3+mT9\njTvgB1EZH7SBOBPATqdtd5Y=\n-----END PRIVATE KEY-----\n",
	"client_email": "909598269106-compute@developer.gserviceaccount.com",
	"client_id": "118412771069534665255",
	"auth_uri": "https://accounts.google.com/o/oauth2/auth",
	"token_uri": "https://accounts.google.com/o/oauth2/token",
	"auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
	"client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/909598269106-compute%40developer.gserviceaccount.com"
};

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("bluebird");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("cors");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("express-graphql");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("googleapis");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("graphql");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("node-cache");

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map