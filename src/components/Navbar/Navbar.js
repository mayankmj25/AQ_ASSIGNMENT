import React, { useState } from "react";
import "./Navbar.css";
import { useLocation, useNavigate, Link } from "react-router-dom";

const Navbar = () => {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/user/${userName}`);
    setUserName("");
  };
  return (
    <nav>
      <div className="navbar">
        <Link to="/" className="navbar-brand">
          GitHub Profile Viewer
        </Link>
        {location.pathname !== "/" && (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter Github Username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <button type="submit" disabled={!userName}>
              Search
            </button>
          </form>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
