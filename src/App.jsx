import React, { useEffect, useState } from "react";
import JobItem from "./components/JobItem";
import "./App.css";

const API_ENDPOINT = " https://hacker-news.firebaseio.com/v0";
const ITEMS_PER_PAGE = 6;

function App() {
  const [jobIds, setJobIds] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const fetchJobIds = async (cp) => {
    setCurrentPage(cp);
    setIsLoading(true);

    let itemIdsList = jobIds;
    if (itemIdsList === null) {
      const response = await fetch(`${API_ENDPOINT}/jobstories.json`);
      itemIdsList = await response.json();
      setJobIds(itemIdsList);
    }
    const itemIdsPerPage = itemIdsList.slice(
      cp * ITEMS_PER_PAGE,
      cp * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );
    const jobsPerPage = await Promise.all(
      itemIdsPerPage.map((id) =>
        fetch(`${API_ENDPOINT}/item/${id}.json`).then((res) => res.json())
      )
    );
    setJobs([...jobs, ...jobsPerPage]);
    setIsLoading(false);
  };

  useEffect(() => {
    if (currentPage === 0) fetchJobIds(currentPage);
  }, []);

  return (
    <div className="app">
      <h1 className="app-title">Hacker News Jobs Board</h1>
      {jobIds === null || jobs.length < 1 ? (
        <p>Loading...</p>
      ) : (
        <div>
          {jobs.map((item, index) => (
            <JobItem
              key={item.id}
              title={item.title}
              by={item.by}
              dateTime={item.time}
              url={item.url}
            />
          ))}
          <button
            className="load-more-btn"
            onClick={() => fetchJobIds(currentPage + 1)}
          >
            {isLoading ? "Loading Jobs..." : "Load more jobs"}
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
