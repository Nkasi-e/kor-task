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
