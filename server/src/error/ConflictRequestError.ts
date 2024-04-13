export default class ConflictRequestError extends Error {
  statusCode: number = 409;
  language: string = "en";
  name: string = "CONFLICT_REQUEST_ERROR";

  constructor(message?: string, language?: string) {
    super(message || "Conflict! This requst has been proceed already");
    this.language = language || "en";
  }
}
