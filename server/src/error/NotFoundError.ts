export default class NotFoundError extends Error {
  statusCode: number = 404;
  language: string = "en";
  name: string = "NOT_FOUND_ERROR";

  constructor(message?: string, language?: string) {
    super(message || "Resource not found");
    this.language = language || "en";
  }
}
