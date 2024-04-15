type UserProperties = {
  id: string;
  email?: string;
  username?: string;
  status: string;
};

export type AuthProperties = Omit<UserProperties, "id" | "status">;

export type UserUpdateStatus = Omit<
  UserProperties,
  "id" | "email" | "username"
>;
