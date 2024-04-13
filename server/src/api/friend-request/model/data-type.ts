export interface IRequest {
  id: string;
  sender_id: string | object;
  receiver_id: string | object;
  status: string;
}

export interface IFriendRequestRepository {
  create(data: any): Promise<any>;
  update(id: string, data: any): Promise<any>;
  // findBySenderIdAndReceiverId(
  //   sender_id: string | object,
  //   receiver_id: string | object
  // ): Promise<any>;
}
