import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './carousel.scss';

const getCssClasses = (firstArticle, article) => {
  const cssClasses = (article.id === firstArticle.id) ? 'active' : '';
  return cssClasses;
};

const renderNextPreviousIcons = (type, name) => (
  <a className={`carousel-control-${type}`} href="#carouselExampleIndicators" role="button" data-slide={type}>
    <span className={`carousel-control-${type}-icon`} aria-hidden="true" />
    <span className="sr-only">{name}</span>
  </a>
);

export const CarouselBanner = ({ articles }) => (
  <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
    <ol className="carousel-indicators">
      <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active" />
      <li data-target="#carouselExampleIndicators" data-slide-to="1" />
      <li data-target="#carouselExampleIndicators" data-slide-to="2" />
    </ol>
    <div className="carousel-inner">
      {articles && articles.length > 2 && articles.slice(0, 3).map(article => (
        <div className={`carousel-item carousel-image-item ${getCssClasses(articles[0], article)}`} key={article.id}>
          <img className="d-block w-100" src={article.image_url} alt="slide" />
          <div className="carousel-caption d-none d-md-block carousel-article-desc">
            <h5><a href={`article/${article.id}`}>{article.title}</a></h5>
            <p>{article.description}</p>
          </div>
        </div>
      ))}
    </div>
    {renderNextPreviousIcons('prev', 'Previous')}
    {renderNextPreviousIcons('next', 'Next')}
  </div>
);

CarouselBanner.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const mapStateToProps = ({ articleReducer }) => ({
  articles: articleReducer.articles,
});

export default connect(mapStateToProps)(CarouselBanner);
