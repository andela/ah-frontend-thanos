import React from 'react';
import PropTypes from 'prop-types';
import {
  FacebookShareButton,
  GooglePlusShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  GooglePlusIcon,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
} from 'react-share';

const socialComponent = (Component, Icon, url, quote) => (
  <div className="Demo__some-network">
    <Component url={url} quote={quote}>
      <Icon size={32} round />
    </Component>
  </div>
);

const ShareRow = ({ article }) => {
  const shareUrl = `https://ah-frontend-thanos-develop.herokuapp.com/article/${article.id}`;
  return (
    <div className="sideBar col-md-2 col-xs-12">
      <div className="share">
        {socialComponent(FacebookShareButton, FacebookIcon, shareUrl, article.title)}
        {socialComponent(GooglePlusShareButton, GooglePlusIcon, shareUrl, article.title)}
        {socialComponent(TwitterShareButton, TwitterIcon, shareUrl, article.title)}
        {socialComponent(LinkedinShareButton, LinkedinIcon, shareUrl, article.title)}
      </div>
    </div>
  );
};
ShareRow.propTypes = {
  article: PropTypes.shape({}).isRequired,
};

export default ShareRow;
