import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import { toast } from "react-toastify";
import { getNotifications } from "../../features/user/userSlice";
import {
  acceptRequest,
  rejectRequest,
} from "../../features/friendRequest/friendRequestSlice";
import { useNavigate } from "react-router-dom";
import NotificationPopup from "../../components/modal/notification";

const NotificationScreen = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedNotification, setSelectedNotification] = useState<any>(null);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { userInfo } = useSelector((store: RootState) => store.auth);
  const { notification } = useSelector((store: RootState) => store.user);

  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    }
    dispatch(getNotifications(userInfo._id));
  }, [dispatch, navigate, userInfo]);

  const handleAccept = async (requestId: string): Promise<void> => {
    try {
      await dispatch(acceptRequest(requestId));
      setSelectedNotification(null);
      toast.success("Friend request accepted");
    } catch (error) {
      console.error(error);
      toast.error("Failed to accept friend request");
    }
  };

  const handleReject = async (requestId: string): Promise<void> => {
    try {
      await dispatch(rejectRequest(requestId));
      setSelectedNotification(null);
      toast.success("Friend request rejected");
    } catch (error) {
      console.error(error);
      toast.error("Failed to reject friend request");
    }
  };

  const handleCancel = () => {
    setSelectedNotification(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
        <h1 className="text-3xl font-bold mb-4">Notifications</h1>
        <div className="flex flex-col space-y-4">
          {notification.map((notifications) => (
            <div
              key={notifications._id}
              className="flex items-center space-x-4 bg-blue-50 px-4 py-2 rounded"
            >
              <div className="flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 14l9-5-9-5-9 5 9 5z"
                  />
                </svg>
              </div>
              <div className="flex-grow">
                <p className="text-sm text-blue-900 font-medium">
                  {notifications.message}
                </p>
                <p className="text-xs text-gray-500">
                  {notifications.created_at}
                </p>
              </div>
              {selectedNotification && (
                <NotificationPopup
                  key={notifications._id}
                  notification={notifications}
                  onAccept={() => handleAccept(notifications.request_id)}
                  onReject={() => handleReject(notifications.request_id)}
                  onCancel={handleCancel}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationScreen;
