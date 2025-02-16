import React from "react";
import "./recentSearches.css";

export const RecentSearches = ({ history, handleHistoryClick }) => {
  return (
    <div className="history-dropdown">
      <p>Recent Searches</p>
      <ul className="history-list">
        {history.map((item, index) => (
          <li key={index} onClick={() => handleHistoryClick(item)}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
