import React from "react";
import "./navbar.css";
import { Searchbar } from "../SearchBar/Searchbar";
import { RecentSearches } from "../RecentSearches/RecentSearches";

const Navbar = ({
  text,
  setText,
  handleKeyDown,
  history,
  handleHistoryClick,
}) => {
  return (
    <nav className="navbar">
      <h2>Weather App</h2>
      <Searchbar
        handleInput={setText}
        text={text}
        handleKeyDown={handleKeyDown}
      />
      <RecentSearches
        history={history}
        handleHistoryClick={handleHistoryClick}
      />
    </nav>
  );
};

export default Navbar;
