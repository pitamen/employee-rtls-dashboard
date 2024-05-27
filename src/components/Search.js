import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Search = ({ users, handleSuccessfulSearch }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();

    if (!searchQuery.trim()) {
      alert('Please enter a username.');
      return;
    }
    const userToSearch = users.find((user) => user.id === searchQuery);

    if (userToSearch) {
      navigate(`/${userToSearch.id}`);
    } else {
      const userByName = users.find((user) => user.name === searchQuery);

      console.log(userByName);
      if (userByName) {
        handleSuccessfulSearch(userByName);
      } else {
        alert('User not found.');
      }
    }
  };

  return (
    <form className="d-flex p-1" role="search" onSubmit={handleSearch}>
      <input
        className="form-control me-2"
        type="search"
        placeholder="Search by Tech Username"
        aria-label="Search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button className="btn btn-outline-success" type="submit">
        Search
      </button>
    </form>
  );
};

export default Search;
