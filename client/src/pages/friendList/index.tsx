/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import { getUser } from "../../features/user/userSlice";

const FriendListScreen = () => {
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

  return (
    <>
      <div>
        <h1 className="text-3xl font-bold">Your Friends</h1>
        <div className="flex flex-col mt-4">
          {user?.friends?.map((friend: any, index: number) => (
            <div className="m-4 p-4 bg-white rounded shadow">
              <div
                key={index}
                className="flex flex-row gap-4 align-center bg-red cursor-pointer"
                onClick={() => navigate(`/profile/${friend._id}`)}
              >
                <p>{friend.username ? friend.username : friend.email}</p>
                <p>{friend.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FriendListScreen;
