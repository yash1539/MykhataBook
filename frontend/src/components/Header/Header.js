import React from "react";

const Header = () => {
  return (
    <header className="bg-gray-900 text-white p-4 flex items-center">
      <img src="/logo.png" alt="Logo" className="h-10 w-10 mr-5" />
      <h1 className="text-xl font-bold">My Wallet</h1>
    </header>
  );
};

export default Header;