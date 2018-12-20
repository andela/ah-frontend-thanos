import axios from 'axios';
import { getProfile, getProfileError, editProfile } from './actionCreators';
import APP_URL from '../utils/constants';

export const getProfileAction = ({ username, token }) => (dispatch) => {
  axios.defaults.headers.common.Authorization = `Token ${token}`;
  return axios.get(`${APP_URL}/profiles/${username}`, token)
    .then(response => dispatch(getProfile(response.data.results)))
    .catch(error => (
      dispatch(getProfileError({
        results: error.response.data.results,
        status_code: error.response.status,
      }))));
};

export const editProfileAction = (token, username, userProfile) => (dispatch) => {
  const profile = { profiles: userProfile };
  axios.defaults.headers.common.Authorization = `Token ${token}`;
  return axios.put(`${APP_URL}/profiles/${username}`, profile)
    .then(response => dispatch(editProfile(response.data.results)))
    .catch((error) => {
      dispatch(getProfileError({
        results: error.response.data,
        status_code: error.response.status,
      }));
    });
};
