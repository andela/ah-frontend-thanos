import React from 'react';
import PropTypes from 'prop-types';

const Filter = ({ searchQuery, onChange, onClick }) => {
  const renderInputElement = (id, placeholder) => (
    <input
      type="text"
      name={id}
      id={id}
      placeholder={placeholder}
      className="p-1 m-1"
      onChange={onChange}
    />
  );

  return (
    <div className="container filter-box pt-3 text-center">
      <h6>Search or Filter by:</h6>
      {renderInputElement('title', 'Title', searchQuery)}
      {renderInputElement('tag', 'Tag')}
      {renderInputElement('author', 'Author')}
      <button
        type="button"
        id="btFilter"
        onClick={onClick}
        className="btn btn-primary btn-sm"
      >
        Filter
      </button>
    </div>
  );
};

Filter.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Filter;
