import React from 'react';
import PropTypes from 'prop-types';
import './profile.scss';
import { createFollowDiv } from '../UserProfile';

const ViewProfile = (props) => {
  const {
    username, image, bio, followersList, followeesList,
  } = props;
  return (
    <div className="w-100">
      <div className="container mt-5 mb-5 container">
        <h1 className="viewProfiletitle"> My Profile</h1>
        <div className="profile-box">
          <div className="img-username">
            <img src={image || 'http://www.macmillanenglish.com/img/author-image.png'} className="img-fluid" alt="user profile pic" />
            <div className="username">{username || 'Username'}</div>
          </div>
          <div className="profile-details">
            <div className="bio">{bio || 'This is my biography'}</div>
            <a href="/profiles/edit" className="btn btn-outline-primary button">Edit Profile</a>
          </div>
        </div>
        <div className="follow-box">
          {createFollowDiv('followers-box', 'Followers', followersList)}
          {createFollowDiv('followees-box', 'People you are following', followeesList)}
        </div>
      </div>
    </div>
  );
};

ViewProfile.propTypes = {
  username: PropTypes.string,
  image: PropTypes.string,
  bio: PropTypes.string,
  followersList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  followeesList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

ViewProfile.defaultProps = {
  image: '',
  bio: '',
  username: '',
};
export default ViewProfile;
