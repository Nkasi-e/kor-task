export default class AuthenticationError extends Error {
  statusCode: number = 401;
  language: string = "en";
  name: string = "AUTHENTICATION_ERROR";

  constructor(message?: string, language?: string) {
    super(message || "Unathorized");
    this.language = language || "en";
  }
}
