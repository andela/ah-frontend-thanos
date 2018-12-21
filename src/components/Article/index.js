import React from 'react';
import PropTypes from 'prop-types';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faClock,
  faCalendar,
  faEye,
  faCheck,
  faThumbsUp,
  faThumbsDown,
} from '@fortawesome/free-solid-svg-icons';
import './article.scss';
import LikeDislike from '../LikeDislike';
import RatingPage from '../../containers/RatingPage';
import ShareRow from './shareRow';
import DeleteArticlePage from '../../containers/deleteArticle';

library.add(
  faUser,
  faClock,
  faCalendar,
  faEye,
  faCheck,
  faThumbsUp,
  faThumbsDown,
);

const createIconSection = (icon, cssClass, content) => (
  <span key={cssClass}>
    <FontAwesomeIcon icon={icon} />
    <div className={cssClass}>{content}</div>
  </span>
);

const Article = ({ onLikeDislike, article, onClick }) => {
  const iconSections = [
    {
      icon: 'clock',
      cssClass: 'readtime',
      content: `${article.read_time} min read`,
    },
    {
      icon: 'calendar',
      cssClass: 'created-at',
      content: `Created: ${article.created_at}`,
    },
    {
      icon: 'calendar',
      cssClass: 'updated-at',
      content: `Updated: ${article.updated_at}`,
    },
  ];
  const loggedinUser = localStorage.getItem('username');
  return article.title ? (
    <div className="full-article">
      <div className="article-title">
        <h1>{article.title}</h1>
        <p className="text-white">{article.description}</p>
      </div>
      <div className="container">
        <div className="article-image text-center">
          <img src={article.image_url} alt="poster" />
        </div>
        <div className="article-small-details">
          <span key="author">
            <FontAwesomeIcon icon="user" />
            <div className="author">
              <a href={`profiles/${article.author.username}`}>
                {article.author.username}
              </a>
            </div>
          </span>
          {iconSections.map(el => createIconSection(el.icon, el.cssClass, el.content))}
        </div>
        <div className="article-taglist">
          {article.tag_list.map(tag => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <div className="article-body text-justify">
          <div className="dots text-center large"> ... </div>
          {article.body}
        </div>
        <div className="article-stats">
          <LikeDislike
            onLikeDislike={onLikeDislike}
            likes={article.likes}
            dislikes={article.dislikes}
          />
          <RatingPage articleId={article.id} />
          <div className="article-views">
            <FontAwesomeIcon icon="eye" />
            <span className="pl-2"># Views</span>
          </div>
        </div>
      </div>
      <div className="share container">
        <ShareRow article={article} />
        <div>
          {article.author.username === loggedinUser ? (
            <div id="edit-del-bt">
              <button
                type="button"
                onClick={onClick}
                id="edit-bt"
                className="btn btn-success"
              >
                EDIT ARTICLE
              </button>
              <DeleteArticlePage articleId={article.id} />
            </div>
          ) : (
            <span />
          )}
        </div>
      </div>
    </div>
  ) : null;
};

Article.propTypes = {
  onLikeDislike: PropTypes.func.isRequired,
  article: PropTypes.shape({}).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Article;
