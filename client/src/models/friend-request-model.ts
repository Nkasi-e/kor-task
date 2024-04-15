type FriendRequestProperties = {
  id: string;
  sender_id: string;
  receiver_id: string;
};

export type RequestProperties = Omit<FriendRequestProperties, "id">;
