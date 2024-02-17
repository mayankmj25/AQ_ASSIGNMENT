import React, { useEffect, useState } from "react";
import "./UserProfile.css";
import { useParams } from "react-router-dom";
import RepositoryList from "../RepositoryList/RepositoryList";

const UserProfile = () => {
  const { userName } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [showRepositories, setShowRepositories] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/users/${userName}`
        );
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("User not found");
          } else {
            throw new Error("Failed to fetch user data");
          }
        }
        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
        console.error(err.message);
      }
    };
    setError("");
    fetchUserData();
  }, [userName]);

  const toggleRepositories = () => setShowRepositories(!showRepositories);

  if (error) {
    return <div className="user-profile">Error: {error}</div>;
  }

  if (!user) {
    return <div className="user-profile">Loading...</div>;
  }

  return (
    <div className="user-profile">
      <img
        src={user.avatar_url}
        alt={`${user.name || "User"}'s avatar`}
        className="avatar"
      />
      <h2>{user.name}</h2>
      <p>{user.bio || "No bio available."}</p>
      <p>Repositories: {user.public_repos}</p>
      <button className="showAllBtn" onClick={toggleRepositories}>
        {showRepositories ? "Hide Repositories" : "Show All Repositories"}
      </button>
      {showRepositories && <RepositoryList totalRepos={user.public_repos} />}
    </div>
  );
};

export default UserProfile;
