import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const RepositoryList = () => {
  const { userName } = useParams();
  const [repositories, setRepositories] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/users/${userName}/repos`
        );
        const data = await response.json();
        setRepositories(data);
      } catch {
        setError("Failed to fetch repositories");
        console.error(error);
      }
    };
    fetchRepositories();
  });

  if (error) {
    return <div> Error : {error}</div>;
  }

  if (!repositories.length) {
    return <div>Loading Repositories...</div>;
  }
  return (
    <div>
      <h3>{userName}'s Repositories</h3>
      <div>
        {repositories.map((repo) => {
          return <RepositoryCard key={repo.id} repo={repo} />;
        })}
      </div>
    </div>
  );
};

function RepositoryCard({ repo }) {
  return (
    <div style={{ border: "1px solid #ddd", margin: "10px", padding: "10px" }}>
      <h4>{repo.name}</h4>
      <p>{repo.description}</p>
      <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
        View on GitHub
      </a>
    </div>
  );
}

export default RepositoryList;
