import { Request, Response } from "express";
import mongoose from "mongoose";

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

export default {
  updateUserStatusHandler,
  getUserHandler,
  getUserByIdHandler,
  getAllUserHandler,
};
