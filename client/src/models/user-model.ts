export type UserProperties = {
  id: string;
  email?: string;
  username?: string;
  status: string;
  friends?: [];
};

export type AuthProperties = Omit<UserProperties, "id" | "status" | "friends">;

export type UserUpdateStatus = Omit<
  UserProperties,
  "id" | "email" | "username" | "friends"
>;

export type NotificationProperties = {
  message: string;
  type: string;
  created_at: string;
  _id: string;
  request_id: string;
};

export type UserActionIdProp = {
  blockedUserId: string;
  reportUserId: string;
};

export type BlockUserId = Omit<UserActionIdProp, "reportUserId">;

export type ReportUserId = Omit<UserActionIdProp, "blockedUserId">;
