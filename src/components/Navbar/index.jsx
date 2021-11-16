import React from "react";
import "./style.scss";
import { useDispatch } from "react-redux";
import { logout } from "../../actions/comom";

const Navbar = () => {
  const dispatch = useDispatch();
  return (
    <div className="navbar">
      <i
        className="bx bx-exit"
        onClick={() => {
          dispatch(logout());
        }}
      ></i>
    </div>
  );
};

export default Navbar;
