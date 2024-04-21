import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { IoNotificationsSharp } from "react-icons/io5";

const Header = () => {
  const { userInfo } = useSelector((store: RootState) => store.auth);

  return (
    <div>
      {userInfo ? (
        <>
          <header className="text-#3B3B3B py-4 bg-cover bg-center h-auto md:h-10 px-4 md:px-10">
            <div className="container mx-auto flex justify-between items-center">
              {/* Logo */}
              <div className="flex items-center gap-5">
                <Link to="/">
                  <p className="text-4xl font-bold text-blue-600 uppercase tracking-wider">
                    KOR
                  </p>
                </Link>
                <h1 className="text-4xl font-bold text-grey-600">Dashboard</h1>
              </div>

              {/* Navigation Links */}
              <div className="flex justify-center hidden md:flex md:space-x-4 align-middle item-center gap-2">
                <h3>
                  <Link
                    to="/friends"
                    className="block md:inline-block hover:text-gray-300"
                  >
                    Friends
                  </Link>
                </h3>
                <h3>
                  <Link
                    to="/notification"
                    className="block md:inline-block hover:text-gray-300"
                  >
                    <IoNotificationsSharp size={20} />
                  </Link>
                </h3>
                <h2 className="font-bold">
                  <Link to="/profile" className="hover:text-gray-300">
                    {userInfo?.username ? userInfo.username : userInfo.email}
                  </Link>
                </h2>
              </div>
            </div>
          </header>
        </>
      ) : (
        <>
          <header className="text-#3B3B3B py-4 bg-cover bg-center h-auto md:h-10 px-4 md:px-10">
            <div className="container mx-auto flex justify-between items-center align-center">
              {/* Logo */}
              <div className="flex items-center">
                <p className="text-4xl font-bold text-blue-600 uppercase tracking-wider">
                  KOR
                </p>
              </div>

              {/* Navigation Links */}
              <nav className="hidden md:flex md:space-x-4">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  <Link
                    to="/join"
                    className="block md:inline-block hover:text-gray-300"
                  >
                    Click to Join
                  </Link>
                </button>
              </nav>
            </div>
          </header>
        </>
      )}
    </div>
  );
};

export default Header;
