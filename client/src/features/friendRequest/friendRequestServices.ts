import Api from "../../common/api";
import { RequestProperties } from "../../models/friend-request-model";

const sendRequest = async (requestData: RequestProperties) => {
  const response = await Api.post("/friend-request/", requestData);
  return response.data;
};

const acceptRequest = async (id: string) => {
  const response = await Api.patch(`/friend-request/${id}/accept/`);
  return response.data;
};

const rejectRequest = async (id: string) => {
  const response = await Api.patch(`/friend-request/${id}/decline/`);
  return response.data;
};

const friendRequestService = { sendRequest, acceptRequest, rejectRequest };

export default friendRequestService;
