// show profile of any registered user (given the username in the URL)
import React from 'react';
import PropTypes from 'prop-types';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Follow from '../Follow';
import './userprofile.scss';

library.add(faUser);

const showFollowerFolloweeProfiles = (image, username, firstName, lastName) => (
  <div key={username}>
    <div className="follower-image">
      <a href={`/profiles/${username}`}>
        {image
          ? <img src={image} title={`${firstName} ${lastName} (${username})`} alt="dp" />
          : <img src="https://iviidev.info/downloads/images/anon.png" alt="dp" />}
      </a>
    </div>
  </div>
);

export const createFollowDiv = (cssClass, title, list) => (
  <div className={cssClass}>
    <h6>{title}</h6>
    {list.map(
      user => showFollowerFolloweeProfiles(
        user.image, user.username, user.first_name, user.last_name,
      ),
    )}
  </div>
);

const UserProfile = ({
  currentProfile, onClick, followersList, followeesList,
}) => (
  <div className="container">
    <div className="profile-box">
      <div className="lefter">
        <div className="profile-image">
          <img src={currentProfile.image} alt="profile dp" />
        </div>
        <div className="profile-username">
          <FontAwesomeIcon className="icon" icon="user" />
          <span className="ml-2">{currentProfile.username}</span>
        </div>
        <Follow onClick={onClick} option={currentProfile.isFollowee} />
      </div>
      <div className="righter">
        <div className="profile-first-name">
          <div className="small grey">First Name:</div>
          <span>{currentProfile.first_name}</span>
        </div>
        <div className="profile-last-name">
          <div className="small grey">Last Name:</div>
          <span>{currentProfile.last_name}</span>
        </div>
        <div className="profile-bio">
          <div className="small grey">Bio:</div>
          <span>{currentProfile.bio}</span>
        </div>
        <div className="profile-created-at">
          <div className="small grey">Proud user since:</div>
          <span>{currentProfile.created_at}</span>
        </div>
      </div>
    </div>
    <div className="follow-box">
      {createFollowDiv('followers-box', `People following ${currentProfile.username}`, followersList)}
      {createFollowDiv('followees-box', `People ${currentProfile.username} follows`, followeesList)}
    </div>
  </div>
);

UserProfile.propTypes = {
  currentProfile: PropTypes.shape({}).isRequired,
  onClick: PropTypes.func.isRequired,
  followersList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  followeesList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default UserProfile;
