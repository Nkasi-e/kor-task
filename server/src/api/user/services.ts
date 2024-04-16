import UserRepository from "./repository";
import Validator from "../../common/validator";
import { UpdateInfo } from "./model/data-type";
import BadRequestError from "../../error/BadRequestError";
import { io } from "../../server";
import NotificationRepository from "../notification/repository";

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
 * Retrieves all users from the UserRepository.
 *
 * @return {Promise<any>} The list of all users.
 */
const getAllUsers = async (): Promise<any> => {
  return await UserRepository.getAll();
};

/**
 *  update payload using the provided data, and then
 * calling the UserRepository to update user status the user.
 *
 * @param {UpdateInfo} data - the data object containing information to register a new user
 * @return {Promise<any>} a promise that resolves with the result of creating the new user
 */
const update = async (id: any, data: UpdateInfo): Promise<any> => {
  validateUpdateRequest(data);
  const user = await getUser(id);
  const updatedStatus = await UserRepository.update(user._id, data);
  user.friends.map((friendsId: any) => {
    io.to(friendsId).emit("status_update", {
      message: `${user.username} just updated their status`,
    });
  });

  return updatedStatus;
};

/**
 *  block a user using the provided data, and then
 * calling the UserRepository to block the user.
 *
 * @param {any} id - the id of the user
 * @param {any} blockedUserId - the id of the user to block
 * @return {Promise<any>} a promise that resolves with the result of blocking the user
 */
const blockUser = async (id: any, blockedUserId: any): Promise<any> => {
  const user = await getUser(id);
  return await UserRepository.blockUser(user._id, blockedUserId);
};

/**
 *  report a user status using the provided data, and then
 * calling the UserRepository to report the content.
 *
 * @param {any} id - the id of the user
 * @param {any} reportUserId - the id of the user to report
 * @return {Promise<any>} a promise that resolves with the result of reporting the user status content
 */
const reportStatusContent = async (
  id: any,
  reportUserId: any
): Promise<any> => {
  const user = await getUser(id);
  return await UserRepository.reportStatus(user._id, reportUserId);
};

/**
 * Retrieves all notifications for a user based on the provided user id.
 *
 * @param {any} userId - the id of the user
 * @return {Promise<any>} the list of notifications for the user
 */
const getUserNotifications = async (userId: any): Promise<any> => {
  return await NotificationRepository.get(userId);
};

export default {
  update,
  getUser,
  getAllUsers,
  getUserNotifications,
  blockUser,
  reportStatusContent,
};
