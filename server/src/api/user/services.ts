import UserRepository from "./repository";
import Validator from "../../common/validator";
import { UpdateInfo } from "./model/data-type";
import BadRequestError from "../../error/BadRequestError";

/**
 * Validates the update information request data and throws errors for invalid data.
 *
 * @param {any} data - the update request data
 * @return {Promise<any>} the validated update request data
 */
const validateUpdateRequest = (data: any): Promise<any> => {
  const { error } = Validator.validateProfileInput(data);

  if (error) {
    const errorMessage = error.details[0].message;
    const message = `${errorMessage}`;
    throw new BadRequestError(message);
  }

  return data;
};

/**
 * Retrieves a user based on the provided data id.
 *
 * @param {any} data - the data containing the id of the user
 * @return {Promise<any>} the user object if found
 */
const getUser = async (data: any): Promise<any> => {
  const user = await UserRepository.get(data);
  if (!user) {
    throw new BadRequestError(
      `This user account for ${data} does not exist! Signup to create an account.`
    );
  }

  return user;
};

/**
 * Creates a new user by first generating a signup payload using the provided data, and then
 * calling the UserRepository to create the user.
 *
 * @param {UpdateInfo} data - the data object containing information to register a new user
 * @return {Promise<any>} a promise that resolves with the result of creating the new user
 */
const update = async (id: any, data: UpdateInfo): Promise<any> => {
  validateUpdateRequest(data);
  const user = await getUser(id);
  return await UserRepository.update(user.id, data);
};

export default { update, getUser };