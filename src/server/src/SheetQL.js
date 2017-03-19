import getSchema from "./schema.js";
import Sheet from "./Sheet.js";

export default class SheetQL {
  constructor(credentials) {
    this.credentials = credentials;
    this.sheet = new Sheet(credentials);
  }

  authorize() {
    return this.sheet.authorize();
  }

  getSchema() {
    return getSchema(this.sheet);
  }
}
