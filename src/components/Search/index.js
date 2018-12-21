import React from 'react';
import PropTypes from 'prop-types';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

library.add(faSearch);

const Search = ({ onQueryChange, onFocus }) => (
  <div className="form-inline my-2 my-lg-0 search-form">
    <input
      className="form-control search-box"
      type="search"
      placeholder="Search"
      name="search"
      id="search"
      onChange={onQueryChange}
      onFocus={onFocus}
    />
    <div className="input-group-btn">
      <button
        type="button"
        className="btn btn-default search-bt"
        id="btSearch"
      >
        <FontAwesomeIcon icon="search" />
      </button>
    </div>
  </div>
);

Search.propTypes = {
  onQueryChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
};

export default Search;
