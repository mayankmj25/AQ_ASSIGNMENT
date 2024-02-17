import React, { useEffect, useState } from "react";
import "./RepositoryList.css";
import { useParams } from "react-router-dom";
import Pagination from "../Pagination/Pagination";

const RepositoryList = () => {
  const { userName } = useParams();
  const [repositories, setRepositories] = useState([]);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRepos, setTotalRepos] = useState(0);
  const reposPerPage = 10;

  useEffect(() => {
    const fetchRepositories = async () => {
      setError("");
      try {
        const response = await fetch(
          `https://api.github.com/users/${userName}/repos?per_page=${reposPerPage}&page=${currentPage}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch repositories");
        }
        const data = await response.json();
        setRepositories(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchRepositories();
  }, [userName, currentPage]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/users/${userName}`
        );
        if (!response.ok) {
          throw new Error(`User not found: ${userName}`);
        }
        const { public_repos } = await response.json();
        setTotalRepos(public_repos);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUserData();
  }, [userName]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageCount = Math.ceil(totalRepos / reposPerPage);

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div>
      <h3>
        {userName}'s Repositories ({totalRepos})
      </h3>
      {repositories.length > 0 ? (
        <div className="repository-list">
          {repositories.map((repo) => (
            <RepositoryCard key={repo.id} repo={repo} />
          ))}
        </div>
      ) : (
        <div>No repositories found.</div>
      )}
      {pageCount > 1 && (
        <Pagination
          currentPage={currentPage}
          pageCount={pageCount}
          paginate={paginate}
        />
      )}
    </div>
  );
};

function RepositoryCard({ repo }) {
  return (
    <div className="repository-card">
      <h4>{repo.name}</h4>
      <p>{repo.description || "No description available."}</p>
      <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
        View on GitHub
      </a>
    </div>
  );
}

export default RepositoryList;
