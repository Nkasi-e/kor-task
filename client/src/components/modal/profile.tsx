import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import { toast } from "react-toastify";
import { sendRequest } from "../../features/friendRequest/friendRequestSlice";
import { block, reportContent } from "../../features/user/userSlice";

interface UserProfileProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any;
  onClose: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { userInfo } = useSelector((store: RootState) => store.auth);

  const name = user?.username ? user?.username : user?.email;
  const handleSendFriendRequest = () => {
    if (!userInfo._id || !user._id) {
      toast.error(
        "You must be a registered user to be able to perform this action"
      );
      return;
    }
    try {
      const payload = { sender_id: userInfo._id, receiver_id: user._id };
      dispatch(sendRequest(payload));
      toast.success(
        `Friend request sent to ${
          user?.username ? user.username : user.email
        } successfully`
      );
      onClose();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong, please try again later");
    }
  };

  const handleBlockUser = () => {
    if (!userInfo._id && !user._id) {
      toast.error(
        "You must be a registered user to be able to perform this action"
      );
      return;
    }
    try {
      const payload = {
        userId: userInfo._id,
        blockUserData: { blockedUserId: user._id },
      };
      dispatch(block(payload));
      toast.success(`You blocked ${name} successfully`);
      onClose();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong, please try again later");
    }
  };

  const handleReportStatus = () => {
    if (!userInfo._id && !user._id) {
      toast.error(
        "You must be a registered user to be able to perform this action"
      );
      return;
    }
    try {
      const payload = {
        userId: user._id,
        reportUserData: { reportUserId: userInfo._id },
      };
      dispatch(reportContent(payload));
      toast.success(`Report successful`);
      onClose();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong, please try again later");
    }
  };

  return (
    <div className="fixed top-0 left-0  h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded shadow-md">
        <h2 className="text-xl font-semibold mb-4">Profile: {name}</h2>
        <p>Status: {user.status}</p>
        <div>
          <button
            className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
            onClick={onClose}
          >
            Close
          </button>
        </div>
        <div className="flex flex-row align-center justify-between">
          <button
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            onClick={handleSendFriendRequest}
          >
            Send Friend Request
          </button>
          <div className="flex flex-row align-center gap-4">
            <button
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              onClick={handleBlockUser}
            >
              Block {name}
            </button>

            <button
              className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-700"
              onClick={handleReportStatus}
            >
              Report status as inappropriate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
