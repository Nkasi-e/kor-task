import React from "react";

const Header = () => {
  return (
    <header
      className="text-#3B3B3B py-4 bg-cover bg-center h-auto md:h-60 px-4 md:px-30"
      style={{ backgroundImage: "url('/vector-bg.svg')" }}
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <p className="text-4xl font-bold text-blue-600 uppercase tracking-wider">
            KOR
          </p>
          {/* <span className="text-lg font-semibold">Your Logo</span> */}
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex md:space-x-4">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            <a href="#" className="block md:inline-block hover:text-gray-300">
              Click to Join
            </a>
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
