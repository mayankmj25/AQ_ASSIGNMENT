import React, { useState } from "react";
import "./Home.css"
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate(`/user/${userName}`)
  }
  return (
    <div className="home">
      <h1>Welcome to Github Profile Viewer</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Gitub Username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />

      <button type="submit" >View Profile</button>

      </form>

    </div>
  );
};

export default Home;
