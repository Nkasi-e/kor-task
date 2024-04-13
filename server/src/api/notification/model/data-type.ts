export interface INotification {
  id: string;
  message: string;
  type: string;
  receiver_id: string | object;
}

export interface INotificationRepository {
  create(data: any): Promise<any>;
}
