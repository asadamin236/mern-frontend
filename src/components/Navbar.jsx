// components/Navbar.js

import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Navbar = ({ onProductClick }) => {
  const Navigate = useNavigate();

  const handleLogOut = () => {
    Navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
      <a className="navbar-brand" href="/">
        E Shop
      </a>

      <div className="ms-auto">
        <Dropdown align="end">
          <Dropdown.Toggle
            variant="light"
            id="dropdown-profile"
            className="d-flex align-items-center border-0 bg-transparent"
          >
            <img
              src="https://yt3.ggpht.com/yti/ANjgQV-lB7iwmLS9hVc0LXmUWoyJyxRuvrIogMnRntZithe0YVQ=s88-c-k-c0x00ffffff-no-rj"
              alt="Profile"
              className="rounded-circle"
              width="40"
              height="40"
              style={{ objectFit: "cover" }}
            />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={onProductClick}>Products</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleLogOut}>Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </nav>
  );
};

export default Navbar;
