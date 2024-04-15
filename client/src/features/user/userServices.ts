import Api from "../../common/api";
import { UserUpdateStatus } from "../../models/user-model";

const getUsers = async () => {
  const response = await Api.get("/users/");
  return response.data;
};

const updateStatus = async (userId: string, statusData: UserUpdateStatus) => {
  const response = await Api.patch(`/users/${userId}/update`, statusData);
  return response.data;
};

const getUser = async (userId: string) => {
  const response = await Api.get(`/users/${userId}`);
  return response.data;
};

const userService = { getUsers, updateStatus, getUser };

export default userService;
