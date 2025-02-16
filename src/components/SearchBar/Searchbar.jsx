import searchIcon from "../../assets/search.png";
import "./searchbar.css";
import React, { useState } from "react";

export const Searchbar = ({ handleInput, text, handleKeyDown }) => {
  return (
    <div className="search-bar-wrapper">
      <form
        className="search-container"
        method="get"
        role="search"
        onSubmit={handleKeyDown}
      >
        <input
          type="text"
          className="cityInput"
          name="city"
          placeholder="Search City"
          onChange={(e) => handleInput(e.target.value)}
          value={text}
          required
        />
        <button className="search-icon" type="submit">
          <img src={searchIcon} alt="Search" />
        </button>
      </form>
    </div>
  );
};
