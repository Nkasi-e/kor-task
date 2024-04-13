import UserRepository from "../user/repository";
import Validator from "../../common/validator";
import { RegisterUser } from "./data-type";
import BadRequestError from "../../error/BadRequestError";
import ConflictRequestError from "../../error/ConflictRequestError";

/**
 * Validates the sign-up request data and throws errors for invalid data, duplicate username or duplicate email.
 *
 * @param {any} data - the sign-up request data
 * @return {Promise<any>} the validated sign-up request data
 */
const validateSignUpRequest = async (data: any): Promise<any> => {
  const { error } = Validator.validateSignup(data);

  if (error) {
    const errorMessage = error.details[0].message;
    const message = `${errorMessage}`;
    throw new BadRequestError(message);
  }

  const payload = data.email || data.username;
  const duplicateData = await UserRepository.findOne(data.username);

  if (duplicateData) {
    throw new ConflictRequestError(`User with ${payload} already exists`);
  }

  return data;
};

/**
 * Creates a new user by first generating a signup payload using the provided data, and then
 * calling the UserRepository to create the user.
 *
 * @param {RegisterUser} data - the data object containing information to register a new user
 * @return {Promise<any>} a promise that resolves with the result of creating the new user
 */
const create = async (data: RegisterUser): Promise<any> => {
  await validateSignUpRequest(data);
  return await UserRepository.create(data);
};

/**
 * Retrieves a user based on the provided data email or username.
 *
 * @param {any} data - the data containing the email or username of the user
 * @return {Promise<any>} the user object if found
 */
const getUser = async (data: any): Promise<any> => {
  const payload = data.email || data.username;
  const user = await UserRepository.findOne(payload);
  if (!user) {
    throw new BadRequestError(
      `This user account for ${payload} does not exist! Signup to create an account.`
    );
  }

  return user;
};

/**
 * Perform user sign-in using the provided login data.
 *
 * @param {LoginUser} data - the login user data to be validated and used for sign-in
 * @return {Promise<any>} the user object after sign-in
 */
const performSignin = async (data: RegisterUser): Promise<any> => {
  // - find the user account
  const user = await getUser(data);

  return user;
};

export default { create, performSignin };
