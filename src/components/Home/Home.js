import React, { useState } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/user/${userName}`);
  };

  return (
    <div className="home">
      <div className="home-container">
        <h1>Welcome to GitHub Profile Viewer</h1>
        <form onSubmit={handleSubmit} className="search-form">
          <input
            type="text"
            placeholder="Enter GitHub Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <button type="submit" disabled={!userName}>
            View Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
