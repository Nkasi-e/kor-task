import NotificationSchema from "./model";
import { handleAsyncRequest } from "../../common/helper";
import { INotificationRepository } from "./model/data-type";

class NotificationHandler implements INotificationRepository {
  async create(data: any): Promise<any> {
    const notification = await handleAsyncRequest(
      NotificationSchema.create(data)
    );
    return notification;
  }

  async get(id: string): Promise<any> {
    const notification = await handleAsyncRequest(
      NotificationSchema.find({ receiver_id: id })
    );
    return notification;
  }
}

const NotificationRepository = new NotificationHandler();

export default NotificationRepository;
