import { Request, Response } from "express";

/**
 * Function that handles sending a friend request.
 *
 * @param {any} deps - dependencies needed for handling the request
 * @param {any} presenters - presenters for handling success and error responses
 * @return {Promise<any>} Promise that resolves when the friend request is sent successfully
 */
const sendFriendRequestHandler = (deps: any, presenters: any): any => {
  return async (req: Request, res: Response): Promise<any> => {
    try {
      await deps.sendFriendRequest(req.body);
      return presenters.ok(res, "Friend request sent successfully");
    } catch (error: any) {
      return presenters.error(res, error);
    }
  };
};

/**
 * Handles accepting a friend request.
 *
 * @param {any} deps - the dependencies needed for the function
 * @param {any} presenters - the presenters used for returning responses
 * @return {Promise<any>} a promise that resolves to the result of accepting the friend request
 */
const acceptFriendRequestHandler = (deps: any, presenters: any): any => {
  return async (req: Request, res: Response): Promise<any> => {
    try {
      await deps.acceptFriendRequest(req.params.request_id);
      return presenters.ok(res, "Friend request accepted successfully");
    } catch (error: any) {
      return presenters.error(res, error);
    }
  };
};

/**
 * Handler function to reject a friend request.
 *
 * @param {any} deps - dependencies object
 * @param {any} presenters - presenters object
 * @return {Promise<any>} promise with the result of rejecting the friend request
 */
const rejectFriendRequestHandler = (deps: any, presenters: any): any => {
  return async (req: Request, res: Response): Promise<any> => {
    try {
      await deps.rejectFriendRequest(req.params.request_id);
      return presenters.ok(res, "Friend request rejected");
    } catch (error: any) {
      return presenters.error(res, error);
    }
  };
};

export default {
  sendFriendRequestHandler,
  acceptFriendRequestHandler,
  rejectFriendRequestHandler,
};
