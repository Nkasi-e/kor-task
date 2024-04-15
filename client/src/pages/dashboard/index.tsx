import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import { toast } from "react-toastify";
import { updateStatus, getUser } from "../../features/user/userSlice";

interface StatusUpdate {
  status: string;
}

const ProfileScreen = () => {
  const [status, setStatus] = useState<StatusUpdate>({ status: "" });
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { userInfo } = useSelector((store: RootState) => store.auth);
  const { user } = useSelector((store: RootState) => store.user);

  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    }
    dispatch(getUser(userInfo._id));
  }, [dispatch, navigate, userInfo]);

  const handleStatusUpdate = () => {
    setIsEditing(true);
  };

  const handleStatusChange = (e: React.FormEvent<HTMLInputElement>) => {
    setStatus({ status: (e.target as HTMLInputElement).value });
  };

  const handleSaveStatus = () => {
    const payload = {
      userId: userInfo._id,
      statusData: status,
    };
    dispatch(updateStatus(payload));
    setIsEditing(false);
    toast.success("Status updated successfully");
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Profile</h1>
      <div className="border rounded-lg p-6 mb-4">
        <div className="mb-4">
          <label className="block mb-2">Username:</label>
          <span className="block font-semibold">
            {user?.username ? user.username : user.email}
          </span>
        </div>
        <div className="mb-4">
          {isEditing ? (
            <form>
              <label className="block mb-2">Status:</label>
              <input
                type="text"
                value={status.status}
                onChange={handleStatusChange}
                className="border border-gray-400 rounded p-2 w-full"
              />
            </form>
          ) : (
            <div>
              <h3 className="block font-semibold">Status</h3>
              <h4>{user?.status}</h4>
            </div>
          )}
        </div>
        <div>
          {isEditing ? (
            <div className="flex flex-row gap-4 item-center">
              <button
                type="submit"
                onClick={handleSaveStatus}
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
              >
                Save
              </button>
              <button
                className="bg-gray-300 px-4 py-2 rounded"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={handleStatusUpdate}
              className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
            >
              Update Status
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
