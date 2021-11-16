import React from "react";
import "./style.scss";
import { NavLink } from "react-router-dom";
import { Avatar } from "@mui/material";
const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <Avatar
            alt="Remy Sharp"
            src="https://banner2.cleanpng.com/20180623/iqh/kisspng-computer-icons-avatar-social-media-blog-font-aweso-avatar-icon-5b2e99c40ce333.6524068515297806760528.jpg"
            sx={{ width: 100, height: 100 }}
          />
          <h3>Anh Quân</h3>
          <h5>Nhân viên</h5>
        </li>
        <li>
          <NavLink to="/home/dashboard" exact activeClassName = "active">
            <span>
              <i className="bx bxs-dashboard"></i>
            </span>
            <span>Dashboard</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/home/staff" activeClassName = "active">
            <span>
              <i className="bx bx-group"></i>
            </span>
            <span>Staff</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/home/products" activeClassName = "active">
            <span>
              <i className="bx bxs-shopping-bags"></i>
            </span>
            <span>Products</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/home/account" activeClassName = "active">
            <span>
              <i className="bx bx-user-circle"></i>
            </span>
            <span>Account</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
