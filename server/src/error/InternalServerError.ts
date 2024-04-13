export default class InternalServerError extends Error {
  statusCode: number = 500;
  language: string = "en";
  name: string = "SERVER_ERROR";

  constructor(message?: string, language?: string) {
    super(
      message || "Could not completed due to unknown error! Try again later."
    );
    this.language = language || "en";
  }
}
