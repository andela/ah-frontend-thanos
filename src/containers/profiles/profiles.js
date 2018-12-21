import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfileAction } from '../../actions/profileActions';
import ViewProfile from '../../components/Profile/viewProfile';
import APP_URL from '../../utils/constants';
import { getFollowProfilesThunk } from '../../actions/followActions';

export class Profile extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    dispatch(getProfileAction({ username, token }));
    const url = `${APP_URL}/users/${username}`;
    dispatch(getFollowProfilesThunk(`${url}/followers`, true));
    dispatch(getFollowProfilesThunk(`${url}/following`, false));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isLoggedIn === false) {
      const { history } = this.props;
      history.push('/login');
    }
  }

  render() {
    const {
      profile: {
        username, image, bio, firstname, lastname, isLoggedIn,
      },
      followersList, followeesList,
    } = this.props;
    return (
      isLoggedIn && (
      <ViewProfile
        username={username}
        image={image}
        bio={bio}
        first_name={firstname}
        lastname={lastname}
        followersList={followersList}
        followeesList={followeesList}
      />)
    );
  }
}

Profile.propTypes = {
  isLoggedIn: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
  profile: PropTypes.shape({}),
  history: PropTypes.shape({}),
  followersList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  followeesList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

Profile.defaultProps = {
  profile: {},
  isLoggedIn: true,
  history: {},
};
const mapStateToProps = ({ profileReducer, followUnfollowReducer }) => ({
  profile: profileReducer.profile,
  followersList: followUnfollowReducer.followersList,
  followeesList: followUnfollowReducer.followeesList,
});
export default connect(mapStateToProps)(Profile);
