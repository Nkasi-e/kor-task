import { Request, Response } from "express";

/**
 * Handles user update by updating an existing account info.
 *
 * @param {any} deps - dependencies needed for user sign up
 * @param {any} presenters - functions to present success or error responses
 * @return {Promise<any>} returns a promise with the result of the sign up operation
 */
const updateUserStatusHandler = (deps: any, presenters: any): any => {
  return async (req: Request, res: Response): Promise<any> => {
    try {
      const payload = await deps.update(req.params.user_id, req.body);
      return presenters.ok(res, payload);
    } catch (error: any) {
      return presenters.error(res, error);
    }
  };
};

/**
 * Returns an asynchronous function that handles getting a user and presenting the result.
 *
 * @param {any} deps - the dependencies needed for getting the user
 * @param {any} presenters - the presenters used for presenting the result
 * @return {Promise<any>} a promise that resolves to the result of getting the user
 */
const getUserHandler = (deps: any, presenters: any): any => {
  return async (req: Request, res: Response): Promise<any> => {
    try {
      const payload = await deps.getUser(req.body.user_id);
      return presenters.ok(res, payload);
    } catch (error: any) {
      return presenters.error(res, error);
    }
  };
};

/**
 * Handles the request to retrieve a user by their ID.
 *
 * @param {any} deps - The dependencies for the handler function
 * @param {any} presenters - The presenters for handling success and error responses
 * @return {Promise<any>} A promise that resolves to the result of handling the request
 */
const getUserByIdHandler = (deps: any, presenters: any): any => {
  return async (req: Request, res: Response): Promise<any> => {
    try {
      const payload = await deps.getUser(req.params.user_id);
      return presenters.ok(res, payload);
    } catch (error: any) {
      return presenters.error(res, error);
    }
  };
};

/**
 * Returns an asynchronous function that handles retrieving all users.
 *
 * @param {any} deps - The dependencies object containing the getAllUsers function.
 * @param {any} presenters - The presenters object used to present the response.
 * @param {Request} req - The request object containing the user_id in the params.
 * @param {Response} res - The response object used to send the response.
 * @return {Promise<any>} A promise that resolves to the result of retrieving all users.
 */
const getAllUserHandler = (deps: any, presenters: any): any => {
  return async (req: Request, res: Response): Promise<any> => {
    try {
      const payload = await deps.getAllUsers(req.params.user_id);
      return presenters.ok(res, payload);
    } catch (error: any) {
      return presenters.error(res, error);
    }
  };
};

/**
 * Returns an asynchronous function that handles retrieving user notifications.
 *
 * @param {any} deps - The dependencies object containing the getUserNotifications function.
 * @param {any} presenters - The presenters object used to present the response.
 * @param {Request} req - The request object containing the user_id parameter.
 * @param {Response} res - The response object used to send the response.
 * @return {Promise<any>} A promise that resolves to the result of retrieving the user notifications.
 */
const getUserNotificationsHandler = (deps: any, presenters: any): any => {
  return async (req: Request, res: Response): Promise<any> => {
    try {
      const payload = await deps.getUserNotifications(req.params.user_id);
      return presenters.ok(res, payload);
    } catch (error: any) {
      return presenters.error(res, error);
    }
  };
};

/**
 * Returns an asynchronous function that handles blocking a user by their ID.
 *
 * @param {any} deps - The dependencies object containing the blockUser function.
 * @param {any} presenters - The presenters object used to present the response.
 * @param {Request} req - The request object containing the user_id and blockedUserId in the body.
 * @param {Response} res - The response object used to send the response.
 * @return {Promise<any>} A promise that resolves to the result of blocking the user.
 */
const blockUserHandler = (deps: any, presenters: any): any => {
  return async (req: Request, res: Response): Promise<any> => {
    try {
      const { blockedUserId } = req.body;
      await deps.blockUser(req.params.user_id, blockedUserId);
      return presenters.ok(res, "User blocked successfully");
    } catch (error: any) {
      return presenters.error(res, error);
    }
  };
};

/**
 * Handles the report user status request by calling the reportStatusContent function from the dependencies and
 * presenting the result using the presenters.
 *
 * @param {any} deps - The dependencies object containing the reportStatusContent function.
 * @param {any} presenters - The presenters object used to present the response.
 * @param {Request} req - The request object containing the user_id and reportUserId in the body.
 * @param {Response} res - The response object used to send the response.
 * @return {Promise<any>} A promise that resolves to the result of reporting the user status.
 */
const reportUserStausHandler = (deps: any, presenters: any): any => {
  return async (req: Request, res: Response): Promise<any> => {
    try {
      const { reportUserId } = req.body;
      await deps.reportStatusContent(req.params.user_id, reportUserId);
      return presenters.ok(res, "User content reported successfully");
    } catch (error: any) {
      return presenters.error(res, error);
    }
  };
};

export default {
  updateUserStatusHandler,
  getUserHandler,
  getUserByIdHandler,
  getAllUserHandler,
  getUserNotificationsHandler,
  blockUserHandler,
  reportUserStausHandler,
};
