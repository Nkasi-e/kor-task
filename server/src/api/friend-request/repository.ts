import FriendRequestSchema from "./model";
import { handleAsyncRequest } from "../../common/helper";
import { IFriendRequestRepository } from "./model/data-type";

class FriendRequestHandler implements IFriendRequestRepository {
  async create(data: any): Promise<any> {
    const request = await handleAsyncRequest(FriendRequestSchema.create(data));
    return request;
  }

  async get(id: string): Promise<any> {
    const request = await handleAsyncRequest(FriendRequestSchema.findById(id));
    return request;
  }

  async update(id: string, data: any): Promise<any> {
    const options = {
      lean: true,
      new: true,
      upsert: true,
      fields: {} as { [key: string]: number },
    };

    Object.keys(data).forEach((field) => {
      options.fields[field] = 1;
    });
    const request = await handleAsyncRequest(
      FriendRequestSchema.findByIdAndUpdate(id, data, options)
    );

    return request;
  }

  async findOne(senderId: string, receiverId: string): Promise<any> {
    const request = await handleAsyncRequest(
      FriendRequestSchema.findOne({
        sender_id: senderId,
        receiver_id: receiverId,
      })
    );
    return request;
  }

  async remove(id: string): Promise<any> {
    const request = await handleAsyncRequest(
      FriendRequestSchema.findByIdAndDelete(id)
    );

    return request;
  }
}

const FriendRequestRepository = new FriendRequestHandler();

export default FriendRequestRepository;
