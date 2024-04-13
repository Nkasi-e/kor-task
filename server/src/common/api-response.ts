import { Response } from "express";
import AuthenticationError from "../error/AuthenticationError";
import AuthorizationError from "../error/AuthorizationError";
import BadRequestError from "../error/BadRequestError";
import ConflictRequestError from "../error/ConflictRequestError";
import NotFoundError from "../error/NotFoundError";
import InternalServerError from "../error/InternalServerError";
import RunTimeExceptionError from "../error/RuntimeExceptionError";

interface Payload {
  [key: string]: any;
}

const ok = (
  res: Response | undefined,
  payload?: Payload | Payload[] | undefined,
  statusCode?: number
): Response<any, Record<string, any>> | undefined => {
  const json: { code: number; status: string; data?: Payload | Payload[] } = {
    code: statusCode || 200,
    status: "ok",
  };

  if (Array.isArray(payload)) {
    json["data"] = payload;
  } else {
    if (payload && Object.keys(payload).length !== 0) {
      json.data = payload;
    }
  }

  if (res) {
    return res.status(json.code).json(json);
  }
};

const error = (
  res: Response,
  error: any
): Response<any, Record<string, any>> => {
  let statusCode: number;
  let statusName: string;
  let message: string;

  const errorInstance = [
    AuthenticationError,
    AuthorizationError,
    BadRequestError,
    ConflictRequestError,
    NotFoundError,
    InternalServerError,
    RunTimeExceptionError,
  ].find((errorType) => error instanceof errorType);

  if (errorInstance) {
    statusCode = error.statusCode === 523 ? 500 : error.statusCode;
    statusName = error.name;
    message =
      error.statusCode === 523
        ? "Runtime Exception! Internal Server Error"
        : error.message;
  } else {
    statusCode = 500;
    statusName = "INTERNAL_SERVER_ERROR";
    message = "Oops! Try again later";
  }

  if (
    process.env.NODE_ENV &&
    ["test", "development"].includes(process.env.NODE_ENV)
  ) {
    //show table error if Runtime exception
    if (statusCode === 523 && process.env.NODE_ENV === "development") {
      console.debug("\nDEBUG ERROR", JSON.stringify(error));
    } else {
      console.log(error);
    }
  }

  return res.status(statusCode).json({
    code: statusCode,
    error: statusName,
    status: "error",
    msg: message,
  });
};

export default { ok, error };
