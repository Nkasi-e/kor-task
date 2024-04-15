/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import { getAllUsers } from "../../features/user/userSlice";
import UserProfile from "../../components/modal/profile";

const HomeScreen = () => {
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const dispatch = useDispatch<AppDispatch>();
  const { users, isLoading, isError } = useSelector(
    (store: RootState) => store.user
  );

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleUserClick = (user: any) => {
    setSelectedUser(user);
  };

  const handleCloseProfile = () => {
    setSelectedUser(null);
  };

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {isError && <p> Something went wrong... Please try again </p>}
      {users.length > 0 && (
        <div className="flex flex-col mt-4">
          {users.map((user) => (
            <div className="m-4 p-4 bg-white rounded shadow">
              <div
                key={user.id}
                className="flex flex-row gap-4 align-center bg-red cursor-pointer"
                onClick={() => handleUserClick(user)}
              >
                <div className="flex items-center justify-center mb-4">
                  <img src="https://picsum.photos/200/300" alt="image" />
                </div>
                <div className="">
                  <h3 className="text-lg font-semibold">
                    {user.username ? user.username : user.email}
                  </h3>
                  <h4 className="text-semibold">status</h4>
                  <p>
                    {user.status ? (
                      user.status
                    ) : (
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Modi non, voluptatum culpa exercitationem doloribus,
                        error impedit qui vel, debitis ratione aspernatur atque
                        est veniam rerum perspiciatis soluta possimus. Obcaecati
                        officia minus quas accusantium non ratione nesciunt,
                        repellendus officiis, commodi aliquam hic voluptatibus
                        earum! Nam, iure.
                      </p>
                    )}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {selectedUser && (
        <UserProfile user={selectedUser} onClose={handleCloseProfile} />
      )}
    </div>
  );
};

export default HomeScreen;
