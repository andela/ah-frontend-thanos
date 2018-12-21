import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import APP_URL from '../../utils/constants';

import {
  getProfileThunk,
  followThunk,
  unfollowThunk,
  getFollowProfilesThunk,
} from '../../actions/followActions';
import UserProfile from '../../components/UserProfile';

export class FollowUnfollow extends Component {
  componentDidMount() {
    const {
      match, getProfileDispatch, getFollowProfilesDispatch,
    } = this.props;
    const urlObject = match.params;
    const token = localStorage.getItem('token');
    getProfileDispatch({ username: urlObject.username, token });
    const url = `${APP_URL}/users/${urlObject.username}`;
    getFollowProfilesDispatch(`${url}/followers`, true);
    getFollowProfilesDispatch(`${url}/following`, false);
  }

  handleFollowUnfollow = (option) => {
    const { followDispatch, unfollowDispatch, match } = this.props;
    const urlObject = match.params;
    const token = localStorage.getItem('token');
    const followObj = { user: urlObject.username, token };
    if (option) {
      unfollowDispatch(followObj);
    } else {
      followDispatch(followObj);
    }
  }

  render() {
    const { currentProfile, followersList, followeesList } = this.props;
    return (
      <div>
        <UserProfile
          onClick={this.handleFollowUnfollow}
          currentProfile={currentProfile}
          followersList={followersList}
          followeesList={followeesList}
        />
      </div>
    );
  }
}

FollowUnfollow.propTypes = {
  currentProfile: PropTypes.shape({}).isRequired,
  match: PropTypes.shape({}).isRequired,
  getProfileDispatch: PropTypes.func.isRequired,
  getFollowProfilesDispatch: PropTypes.func.isRequired,
  followDispatch: PropTypes.func.isRequired,
  unfollowDispatch: PropTypes.func.isRequired,
  followersList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  followeesList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const mapStateToProps = ({ followUnfollowReducer }) => ({
  currentProfile: followUnfollowReducer.currentProfile,
  followersList: followUnfollowReducer.followersList,
  followeesList: followUnfollowReducer.followeesList,
});
export const mapDispatchToProps = dispatch => ({
  getProfileDispatch: res => dispatch(getProfileThunk(res)),
  getFollowProfilesDispatch: (url, option) => dispatch(getFollowProfilesThunk(url, option)),
  followDispatch: res => dispatch(followThunk(res)),
  unfollowDispatch: res => dispatch(unfollowThunk(res)),
});
export default connect(mapStateToProps, mapDispatchToProps)(FollowUnfollow);
