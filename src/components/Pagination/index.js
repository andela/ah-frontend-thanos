import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

const Pagination = ({ article, pageNumber }) => {
  const activePage = number => (number === Number(pageNumber) ? 'active' : null);
  const disablePrevious = (num1, num2) => (num1 === num2 ? 'disabled' : null);

  const numberOfpages = Math.ceil(article.count / 12);
  const ArraynumberOfpages = _.range(1, numberOfpages + 1);
  const pages = ArraynumberOfpages.map(number => (
    <li key={number} className={`page-item ${activePage(number)}`}>
      {' '}
      <a className="page-link" href={`articles/page/${number}`}>{number}</a>
    </li>
  ));

  return (
    <div>
      <br />
      <ul className="pagination justify-content-center">
        <li className={`page-item ${disablePrevious(pageNumber, '1')}`}>
          <a className="page-link" href={`articles/page/${Number(pageNumber) - 1}`} tabIndex="-1">Previous</a>
        </li>
        {pages}
        <li className={`page-item ${disablePrevious(Number(pageNumber), numberOfpages)}`}>
          <a className="page-link" href={`articles/page/${Number(pageNumber) + 1}`}>Next</a>
        </li>
      </ul>
    </div>
  );
};

Pagination.propTypes = {
  article: PropTypes.shape({}).isRequired,
  pageNumber: PropTypes.string.isRequired,
};

export default Pagination;
