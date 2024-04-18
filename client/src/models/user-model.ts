export type UserProperties = {
  id: string;
  email?: string;
  username?: string;
  status: string;
  friends?: [];
  blocked_users?: [];
  reported_by?: [];
};

export type AuthProperties = Omit<
  UserProperties,
  "id" | "status" | "friends" | "blocked_users" | "reported_by"
>;

export type UserUpdateStatus = Omit<
  UserProperties,
  "id" | "email" | "username" | "friends" | "blocked_users" | "reported_by"
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
