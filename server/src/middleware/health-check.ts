import { Request, Response, NextFunction } from "express";

/**
 * Handles API health checks and returns the current environment.
 *
 * @param {Request} req - the request object
 * @param {Response} res - the response object
 * @return {Object} response with ok status and environment information
 */
const handleAPIHealthChecks = (req: Request, res: Response): object => {
  return res.json({
    ok: true,
    environment: process.env.NODE_ENV,
    msg: "Pong",
  });
};

/**
 * Handle API Whitelist Endpoints.
 *
 * @param {Request} req - the request object
 * @param {Response} res - the response object
 * @param {NextFunction} next - the next function
 * @return {Response} the response with status 404 and error message
 */
const handleAPIWhitlistEndponts = (
  req: Request,
  res: Response,
  next: NextFunction
): Response => {
  return res.status(404).json({
    status: "INVALID_ROUTE",
    msg: "This route is not supported",
  });
};

/**
 * Handles API health status by returning a JSON response with a greeting message.
 *
 * @param {Request} req - the request object
 * @param {Response} res - the response object
 * @return {Object} JSON response with a message containing the name from the request parameters
 */
const handleAPIHealthStatus = (req: Request, res: Response): object => {
  return res.json({
    msg: `Hello ${req.params.name}`,
  });
};

export {
  handleAPIHealthChecks,
  handleAPIWhitlistEndponts,
  handleAPIHealthStatus,
};
