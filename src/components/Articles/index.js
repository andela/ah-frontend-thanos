import React from 'react';
import PropTypes from 'prop-types';
// import TagList from '../TagList/TagList';

const ArticleDisplay = ({ article }) => (
  <div className="article-card">
    <div className="image-wrapper">
      <img src={article.image_url} alt="poster" />
    </div>
    <div className="text-section">
      <div className="title-section">{article.title}</div>
      <div className="body-section">{article.description}</div>
      {/* <TagList tags={article.tag_list} /> */}
      <div className="read-more">
        <a href={`/article/${article.id}`}>Read More</a>
      </div>
    </div>
  </div>
);

ArticleDisplay.propTypes = {
  article: PropTypes.shape({
    id: PropTypes.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image_url: PropTypes.string.isRequired,
  }).isRequired,
};

export default ArticleDisplay;
