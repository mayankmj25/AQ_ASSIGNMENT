import React, { useState } from "react";
import "./Navbar.css"
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/user/${userName}`);
  };
  return (
    <nav>
      <div className="navbar">
        <a href="/">Github Profile Viewer</a>
        {location.pathname !== "/" && (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter Github Username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
