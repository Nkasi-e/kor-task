export default class BadRequestError extends Error {
  statusCode: number = 400;
  language: string = "en";
  name: string = "BAD_REQUEST_ERROR";

  constructor(message?: string, language?: string) {
    super(message || "Invalid request");
    this.language = language || "en";
  }
}
