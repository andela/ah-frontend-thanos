import React from 'react';
import * as PropTypes from 'prop-types';
import './deleteArticle.scss';

const DeleteArticle = ({ onClick }) => (
  <div>
    <button type="submit" onClick={onClick} className="btn btn-danger" id="delete-bt">DELETE ARTICLE</button>
  </div>
);

DeleteArticle.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default DeleteArticle;
