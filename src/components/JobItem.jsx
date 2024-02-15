import React from "react";

const JobItem = ({ url, title, by, dateTime }) => {
  const readableTime = new Date(dateTime * 1000).toLocaleString();
  return (
    <div className="card">
      <a className="card-job" href={url} target="_blank" rel="noopener">
        <div className="job-title">{title}</div>
        <div className="footer">
          <div className="employer">{`By ${by} ·`}</div>
          <div className="timestamp">{readableTime}</div>
        </div>
      </a>
    </div>
  );
};

export default JobItem;
