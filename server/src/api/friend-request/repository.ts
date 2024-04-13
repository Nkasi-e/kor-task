import FriendRequestSchema from "./model";
import { handleAsyncRequest, handleResponseFormat } from "../../common/helper";
import { IFriendRequestRepository } from "./model/data-type";

class FriendRequestHandler implements IFriendRequestRepository {
  async create(data: any): Promise<any> {
    const friendRequest = await handleAsyncRequest(
      FriendRequestSchema.create(data)
    );
    return handleResponseFormat(friendRequest);
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
      FriendRequestSchema.findByIdAndUpdate({ _id: id }, data, options)
    );

    return handleResponseFormat(request);
  }
}

const FriendRequestRepository = new FriendRequestHandler();

export default FriendRequestRepository;
