const google = require("googleapis");
const Promise = require("bluebird");

export default class Sheet {
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

    const auth = new google.auth.JWT(
      this.credentials.client_email,
      null,
      this.credentials.private_key,
      this.claims,
      null
    );
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
      this.sheets.spreadsheets.get(
        {
          spreadsheetId
        },
        (err, response) => {
          if (err) {
            reject(err);
          }

          resolve(response);
        }
      );
    });
  }

  getDataByRange(spreadsheetId, range) {
    if (!this.tokens) {
      throw new Error(this.NOT_AUTHORIZED_MESSAGE);
    }

    return new Promise((resolve, reject) => {
      this.sheets.spreadsheets.values.get(
        {
          spreadsheetId,
          range: range
        },
        (err, response) => {
          if (err) {
            reject(err);
          }

          resolve(response);
        }
      );
    });
  }
}
