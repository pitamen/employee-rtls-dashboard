import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { URL_ENDPOINTS } from '../utils/apiEndPoints';
import { BASE_URL_V2 } from '../utils/constants';

const Search = ({ users, handleSuccessfulSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchingUser, setIsSearchingUser] = useState(false);
  console.log(users)

  const searchUser = async (searchString = '') => {
    setIsSearchingUser(true)
    try {
      const response = await fetch(BASE_URL_V2 + URL_ENDPOINTS.SEARCH_USER + searchString, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`
        }
      });
      let searchResponse = await response.json();
      handleSuccessfulSearch(searchResponse.data)
      setIsSearchingUser(false)
    } catch (error) {
      setIsSearchingUser(false)
      console.error('Error fetching data:', error);
    }
  }

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!searchQuery.trim()) {
      alert('Please enter a username.');
      return;
    }
    searchUser(searchQuery)
  };

  return (
    <form className="d-flex" role="search" onSubmit={handleSearch}>
      <input
        className="form-control me-2"
        type="search"
        placeholder="Search by Username"
        aria-label="Search"
        value={searchQuery}
        onChange={(e) => {
          handleSuccessfulSearch([]);
          setSearchQuery(e.target.value);
        }}
      />
      <button className="btn btn-danger" type="submit">
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>
    </form>
  );
};

export default Search;
