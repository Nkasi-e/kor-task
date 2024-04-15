import Api from "../../common/api";
import { AuthProperties } from "../../models/user-model";

const register = async (userData: AuthProperties) => {
  const response = await Api.post("/auth/signup/", userData);
  return response.data;
};

const authService = { register };

export default authService;
