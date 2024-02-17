import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Pagination from "../Pagination/Pagination";

const RepositoryList = ({ totalRepos }) => {
  const { userName } = useParams();
  const [repositories, setRepositories] = useState([]);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  // Assuming totalRepos is managed or updated elsewhere as needed
  const reposPerPage = 10; // Adjust as needed

  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        const url = `https://api.github.com/users/${userName}/repos?per_page=${reposPerPage}&page=${currentPage}`;
        const response = await fetch(url);
        const data = await response.json();
        if (response.ok) {
          setRepositories(data);
          // Optionally handle totalRepos here if possible
        } else {
          throw new Error(data.message || "Failed to fetch repositories");
        }
      } catch (err) {
        setError(err.message);
        console.error(err);
      }
    };
    fetchRepositories();
  }, [userName, currentPage, reposPerPage]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // pageCount calculation might need adjustment based on how totalRepos is managed
  const pageCount = Math.ceil(totalRepos / reposPerPage);

  console.log(pageCount, totalRepos, currentPage);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!repositories.length) {
    return <div>Loading Repositories...</div>;
  }

  return (
    <div>
      <h3>{userName}'s Repositories</h3>
      <div>
        {repositories.map((repo) => (
          <RepositoryCard key={repo.id} repo={repo} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        pageCount={pageCount}
        paginate={paginate}
      />
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
