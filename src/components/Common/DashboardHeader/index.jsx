import React, { useEffect, useState } from "react";
import "./DashboardHeader.css";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";
import { Button, Drawer, IconButton } from "@mui/material";
import useSocket from "../../../useSocket";
import { apiClient } from "../../../utils";
import { URLS } from "../../../constants";
import { useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CloseIcon from "@mui/icons-material/Close";
import CustomButton from "../CustomButton";
import CartItem from "../CartItem";

const DashboardHeader = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [cartDrawer, setCartDrawer] = useState(false);
  const open = Boolean(anchorEl);
  const { startConnection, closeConnection } = useSocket();
  const navigate = useNavigate();

  const onClickLogout = async () => {
    const payload = {
      userId: userData?.userId,
      sessionId: userData?.sessionId,
    };
    const response = await apiClient.post(URLS.LOGOUT, payload);
    if (response?.code === 200) {
      closeConnection();
      navigate("/");
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    startConnection();
  }, []);

  const handleCartClick = () => {
    setCartDrawer((prev) => !prev);
  };

  const handleCartClose = () => {
    setCartDrawer(false)
  }

  const userData = JSON.parse(localStorage.getItem("userData"));
  const firstName = userData.fullName.split(" ")[0];
  return (
    <div className="dashboard-header-root">
      <div className="logo">
        <h4>OSC</h4>
      </div>
      <div className="search-input-container">
        <input
          placeholder="Search for products, brands and more"
          className="search-input"
        />
        <SearchIcon className="search-icon" />
      </div>
      <div className="user-root">
        <PersonIcon className="icon" />
        <h4>{firstName}</h4>
        <Button onClick={handleClick}>
          <ArrowDropDownIcon className="icon" />
        </Button>
        <Menu
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <MenuItem onClick={handleClose}>My Account</MenuItem>
          <MenuItem onClick={handleClose}>Orders</MenuItem>
          <MenuItem onClick={handleClose}>Wishlist</MenuItem>
          <MenuItem onClick={() => onClickLogout()}>Logout</MenuItem>
        </Menu>
        <IconButton onClick={() => handleCartClick()}>
          <ShoppingCartIcon htmlColor="#15529C" />
        </IconButton>
      </div>
      <Drawer
        anchor="right"
        open={cartDrawer}
        onClose={() => setCartDrawer(false)}
      >
        <div className="drawer-content">
          <div className="drawer-header">
            <h4>Shopping Cart</h4>
            <IconButton className="close-icon" onClick={() => handleCartClose()}>
              <CloseIcon htmlColor="#fff" />
            </IconButton>
          </div>


          <div className="drawer-main">
            <CartItem />
          </div>


          <div className="drawer-footer">
            <p>Your Saving on this order ₹3646</p>
            <CustomButton>Place Order</CustomButton>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default DashboardHeader;
