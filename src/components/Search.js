import React, { useState } from "react";
import { useGlobalContext } from "../context";

const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const { setSearchTerm, fetchRandomMeal } = useGlobalContext();

  const handleSearchValue = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchValue) {
      setSearchTerm(searchValue);
    }
  };

  const handleRandomSearch = () => {
    setSearchTerm("");
    setSearchValue("");
    fetchRandomMeal();
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSearch}>
        <input
          className="form-container__input"
          placeholder="search meals"
          type="search"
          onChange={handleSearchValue}
        ></input>
        <button className="form-container__searchBtn" type="submit">
          Search
        </button>
        <button
          onClick={handleRandomSearch}
          className="form-container__randomBtn"
          type="submit"
        >
          Suprise Me
        </button>
      </form>
    </div>
  );
};

export default Search;
