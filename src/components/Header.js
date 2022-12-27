import React, { useContext, useState } from "react";
import "./header.css";
import Avatar from "@mui/material/Avatar";
import { NavLink, useNavigate } from "react-router-dom";
import { LoginContext } from "./contextProvider/Context";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

function Header() {
  // use context 
  const { logindata, setLoginData } = useContext(LoginContext);
  // navigate
  const navigate = useNavigate();

  // material ui components
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  // logout user function
  const logoutuser = async () => {
    localStorage.clear();
    navigate("/");
    setLoginData("");
  };

  // navigation function
  const goProfile = () => {
    navigate("/profile");
  };
  const goLogin = () => {
    navigate("/");
  };
  const goRegister = () => {
    navigate("/register");
  };
  //=======================
  
  return (
    <>
      <header>
        <nav>
          <NavLink to="/" style={{ textDecoration: "none" }}>
            <h1>Kimshuka Technology</h1>
          </NavLink>
          <div className="avtar">
            {logindata.userData ? (
              <h1 onClick={handleClick}>
                Profile:{logindata.userData.username}
              </h1>
            ) : (
              <Avatar style={{ background: "blue" }} onClick={handleClick} />
            )}
          </div>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >

          {/* if user logged in then one of the else block will run */}
            {logindata.userData ? (
              <>
                <MenuItem
                  onClick={() => {
                    goProfile();
                    handleClose();
                  }}
                >
                  Profile
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    logoutuser();
                    handleClose();
                  }}
                >
                  Logout
                </MenuItem>
              </>
            ) : (
              <>
                <MenuItem
                  onClick={() => {
                    goRegister();
                    handleClose();
                  }}
                >
                  Register
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    goLogin();
                    handleClose();
                  }}
                >
                  Login
                </MenuItem>
              </>
            )}
          </Menu>
        </nav>
      </header>
    </>
  );
}

export default Header;
