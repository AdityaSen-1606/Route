import React from "react";
import { Link } from "react-router-dom";
import "./App.css"
const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/AIRBUS_RGB.png/640px-AIRBUS_RGB.png"
          alt="Airbus Logo"
        />
      </div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/team">Team Page</Link>
      </div>
    </nav>
  );
};

export default Navbar;
