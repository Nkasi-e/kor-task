import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import { toast } from "react-toastify";
import { sendRequest } from "../../features/friendRequest/friendRequestSlice";

interface UserProfileProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any;
  onClose: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { userInfo } = useSelector((store: RootState) => store.auth);

  const handleSendFriendRequest = () => {
    if (!userInfo._id || !user._id) {
      toast.error(
        "You must be a registered user to be able to perform this action"
      );
      return;
    }
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

  return (
    <div className="fixed top-0 left-0  h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded shadow-md">
        <h2 className="text-xl font-semibold mb-4">
          Profile: {user?.username ? user?.username : user?.email}
        </h2>
        <p>
          Status:{" "}
          {user.status ? (
            user.status
          ) : (
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi non,
              voluptatum culpa exercitationem doloribus, error impedit qui vel,
              debitis ratione aspernatur atque est veniam rerum perspiciatis
              soluta possimus. Obcaecati officia minus quas accusantium non
              ratione nesciunt, repellendus officiis, commodi aliquam hic
              voluptatibus earum! Nam, iure.
            </p>
          )}
        </p>
        <div>
          <button
            className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
            onClick={onClose}
          >
            Close
          </button>
        </div>
        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          onClick={handleSendFriendRequest}
        >
          Send Friend Request
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
