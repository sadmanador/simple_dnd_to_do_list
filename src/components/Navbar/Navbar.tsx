import React from "react";
import Login from "../Login/Login";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">daisyUI</a>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end mr-4">
          <Login />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
