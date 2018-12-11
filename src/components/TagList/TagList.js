import React from 'react';
import PropTypes from 'prop-types';
import './taglist.scss';

const TagList = ({ tags }) => tags.map((tag, id) => (
  <div key={id} className="badge-pill h4 px-3 tag">
    {tag.name}
  </div>
));

TagList.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.object),
};
TagList.defaultProps = {
  tags: [{}],
};

export default TagList;
