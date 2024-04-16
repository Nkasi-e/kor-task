import FriendRequestRepository from "./repository";
import UserSchema from "../user/model";
import UserRepository from "../user/repository";
import NotificationRepository from "../notification/repository";
import BadRequestError from "../../error/BadRequestError";
import ConflictRequestError from "../../error/ConflictRequestError";
import { io } from "../../server";
import NotFoundError from "../../error/NotFoundError";
import { FriendRequest } from "./model/data-type";
import Validator from "../../common/validator";

// const io = getIO();
/**
 * Validates the request data and throws a BadRequestError if validation fails.
 *
 * @param {any} data - the request data to be validated
 * @return {Promise<any>} the validated request data
 */
const validateRequest = (data: any): Promise<any> => {
  const { error } = Validator.validateFriendRequestInput(data);

  if (error) {
    const errorMessage = error.details[0].message;
    const message = `${errorMessage}`;
    throw new BadRequestError(message);
  }

  return data;
};

/**
 * A function that creates a notification for sending a friend request.
 *
 * @param {any} data - the data object containing information about the friend request
 * @param {any} sender - the sender object containing sender details
 * @return {any} the updated data object with the notification details
 */
const createSendFriendRequestNotification = async (
  data: any,
  sender: any,
  requestId: string
): Promise<any> => {
  return {
    ...data,
    receiver_id: data.receiver_id,
    request_id: requestId,
    message: `You have a new friend request from ${sender.username}`,
    type: "friend_request",
  };
};

/**
 * Sends a friend request after validating the request data, checking if sender and receiver exist,
 * ensuring no duplicate requests are sent, creating a notification, and storing the request in the database.
 *
 * @param {FriendRequest} data - the friend request data to be sent
 * @return {Promise<any>} a promise that resolves with the created friend request
 */
const sendFriendRequest = async (data: FriendRequest): Promise<any> => {
  validateRequest(data);

  const sender = await UserRepository.get(data.sender_id);
  const receiver = await UserRepository.get(data.receiver_id);

  if (!sender || !receiver) {
    throw new BadRequestError("Invalid sender or receiver");
  }

  const existingRequest = await FriendRequestRepository.findOne(
    data.sender_id,
    data.receiver_id
  );

  if (existingRequest) {
    throw new ConflictRequestError("Friend request already sent");
  }

  io.to(receiver.id).emit("friend_request", {
    message: `You have a new friend request from ${sender.username}`,
  });
  const friendRequest = await FriendRequestRepository.create(data);

  const payload = await createSendFriendRequestNotification(
    data,
    sender,
    friendRequest._id
  );

  await NotificationRepository.create(payload);

  return friendRequest;
};

/**
 * Creates an accept friend request notification with the given data and receiver.
 *
 * @param {any} data - the data for the notification
 * @param {any} receiver - the receiver of the notification
 * @return {any} the created accept friend request notification
 */
const createAcceptFriendRequestNotification = (
  data: any,
  receiver: any,
  requestId: string
): any => {
  return {
    ...data,
    receiver_id: data.id,
    request_id: requestId,
    message: `${receiver.username} accepted your friend request`,
    type: "friend_request_accepted",
  };
};

/**
 * Accepts a friend request by updating the status in the database, adding the sender and receiver as friends,
 * and creating a notification for the accepted request.
 *
 * @param {string} requestId - The unique identifier of the friend request to accept.
 * @return {Promise<any>} A promise that resolves to the updated friend request object with the status set to "accepted".
 */
const acceptFriendRequest = async (requestId: string): Promise<any> => {
  const friendRequest = await FriendRequestRepository.get(requestId);
  if (!friendRequest) {
    throw new NotFoundError("Friend request not found");
  }

  const senderId = friendRequest.sender_id;
  const receiverId = friendRequest.receiver_id;
  const receiver = await UserSchema.findById(receiverId);
  const sender = await UserSchema.findById(senderId);

  (receiver?.friends as any[]).push(senderId);
  (sender?.friends as any[]).push(receiverId);

  Promise.all([receiver?.save(), sender?.save()]);

  io.to(sender?.id).emit("friend_request", {
    message: `${receiver?.username} accepted your friend request`,
  });
  const payload = createAcceptFriendRequestNotification(
    sender,
    receiver,
    requestId
  );
  await NotificationRepository.create(payload);

  return await FriendRequestRepository.update(friendRequest.id, {
    status: "accepted",
  });
};

/**
 * Rejects a friend request by updating its status to "rejected" and removing it from the repository.
 *
 * @param {string} requestId - The ID of the friend request to be rejected
 * @return {Promise<any>} A Promise that resolves when the friend request is successfully rejected and removed
 */
const rejectFriendRequest = async (requestId: string): Promise<any> => {
  const friendRequest = await FriendRequestRepository.get(requestId);
  if (!friendRequest) {
    throw new NotFoundError("Friend request not found");
  }

  await FriendRequestRepository.update(friendRequest.id, {
    status: "declined",
  });

  return await FriendRequestRepository.remove(friendRequest.id);
};

export default { sendFriendRequest, acceptFriendRequest, rejectFriendRequest };
