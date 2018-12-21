import React from 'react';
import PropTypes from 'prop-types';

const Follow = ({ onClick, option }) => (
  <button
    type="button"
    id="bt-follow"
    className={option ? 'btn btn-outline-danger btn-sm m-2' : 'btn btn-outline-primary btn-sm m-2'}
    onClick={() => { onClick(option); }}
  >
    {option ? 'Unfollow' : 'Follow'}
  </button>
);

Follow.propTypes = {
  onClick: PropTypes.func.isRequired,
  option: PropTypes.bool.isRequired,
};

export default Follow;
