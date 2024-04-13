/**
 * Forbidden: Access Denied due to user privilege
 */
export default class AuthorizationError extends Error {
  statusCode: number = 403;
  language: string = "en";
  name: string = "AUTHORIZATION_ERROR";

  constructor(message?: string, language?: string) {
    super(message || "Access Denied");
    this.language = language || "en";
  }
}
