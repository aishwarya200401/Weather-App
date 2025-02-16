import React from 'react';
import searchIcon from '../assets/search.png';

const Navbar = ({ text, setText, handleKeyDown, search, history, handleHistoryClick }) => {
  return (
    <nav className="navbar">
      <div className="search-container">
        <input
          type="text"
          className="cityInput"
          placeholder="Search City"
          onChange={(e) => setText(e.target.value)}
          value={text}
          onKeyDown={handleKeyDown}
        />
        <div className="search-icon" onClick={search}>
          <img src={searchIcon} alt="Search" />
        </div>
      </div>
      <div className="history-dropdown">
        <p>Search History ▼</p>
        <ul className="history-list">
          {history.map((item, index) => (
            <li key={index} onClick={() => handleHistoryClick(item)}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
