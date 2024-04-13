export default class RunTimeExceptionError extends Error {
  statusCode: number = 523;
  language: string = "en";
  name: string = "RUNTIME_EXCEPTION_ERROR";

  constructor(message?: string, language?: string) {
    super(message || "This is an internal run time warning.");
    this.language = language || "en";
  }
}
