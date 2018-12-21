import axios from 'axios';
import actionTypes from './actionTypes';
import APP_URL from '../utils/constants';

const showProfileAction = payload => ({
  type: actionTypes.SHOW_USER_PROFILE,
  payload,
});

const followAction = payload => ({
  type: actionTypes.FOLLOW_USER,
  payload,
});

const unfollowAction = payload => ({
  type: actionTypes.UNFOLLOW_USER,
  payload,
});

const getFollowersAction = payload => ({
  type: actionTypes.GET_FOLLOWERS,
  payload,
});

const getFolloweesAction = payload => ({ // followees = users you follow
  type: actionTypes.GET_FOLLOWEES,
  payload,
});

const showErrorAction = payload => ({
  type: actionTypes.SHOW_ERROR,
  payload,
});

export const getProfileThunk = ({ username, token }) => (dispatch) => {
  const url = `${APP_URL}/profiles/${username}`;
  return axios.get(url, { headers: { Authorization: `Token ${token}` } })
    .then((response) => {
      dispatch(showProfileAction(response.data.results));
    })
    .catch(() => {
      dispatch(showErrorAction('Could not find profile'));
    });
};

export const followThunk = ({ user, token }) => (dispatch) => {
  const url = `${APP_URL}/users/${user}/follow`;
  return axios.post(url, user, { headers: { Authorization: `Token ${token}` } })
    .then((response) => {
      dispatch(followAction(response.data.results));
    })
    .catch((error) => {
      dispatch(showErrorAction(error.response.data.results.error));
    });
};

export const unfollowThunk = ({ user, token }) => (dispatch) => {
  const url = `${APP_URL}/users/${user}/follow`;
  return axios.delete(url, { headers: { Authorization: `Token ${token}` } })
    .then((response) => {
      dispatch(unfollowAction(response.data.results));
    })
    .catch((error) => {
      dispatch(showErrorAction(error.response.data.results.error));
    });
};

const headers = { headers: { Authorization: `Token ${localStorage.getItem('token')}` } };
export const getFollowProfilesThunk = (url, getFollowers) => (dispatch) => {
  if (getFollowers) {
    return axios.get(url, headers).then((response) => {
      dispatch(getFollowersAction(response.data.results));
    }).catch(() => {});
  }
  return axios.get(url, headers).then((response) => {
    dispatch(getFolloweesAction(response.data.results));
  }).catch(() => {});
};
