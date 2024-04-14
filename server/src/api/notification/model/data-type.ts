import mongoose from "mongoose";

export interface INotification {
  id: mongoose.Types.ObjectId;
  message: string;
  type: string;
  receiver_id: string | object;
}

export interface INotificationRepository {
  create(data: any): Promise<any>;
}
