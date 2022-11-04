module.exports = class extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.status = this.statusCode >= 500 ? "fail" : "error";
    return this;
  }
};
