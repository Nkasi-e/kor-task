import { Request, Response } from "express";

/**
 * Handles user sign up by creating a new account.
 *
 * @param {any} deps - dependencies needed for user sign up
 * @param {any} presenters - functions to present success or error responses
 * @return {Promise<any>} returns a promise with the result of the sign up operation
 */
const signUpUserHandler = (deps: any, presenters: any): any => {
  return async (req: Request, res: Response): Promise<any> => {
    try {
      const payload = await deps.create(req.body);
      return presenters.ok(res, payload, 201);
    } catch (error: any) {
      return presenters.error(res, error);
    }
  };
};

/**
 * Handles signing in a user.
 *
 * @param {any} deps - dependencies object
 * @param {any} presenters - presenters object
 * @return {Promise<any>} returns a promise with the result of the signin process
 */
const signinUserHandler = (deps: any, presenters: any): any => {
  return async (req: Request, res: Response): Promise<any> => {
    try {
      const payload = await deps.performSignin(req.body);
      return presenters.ok(res, payload);
    } catch (error: any) {
      return presenters.error(res, error);
    }
  };
};

export default { signUpUserHandler, signinUserHandler };
