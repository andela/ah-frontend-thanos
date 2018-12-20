import axios from 'axios';
import ACTION_TYPE from './actionTypes';
import APP_URL from '../utils/constants';


export const fetchTagSuccess = tags => ({
  type: ACTION_TYPE.FETCH_TAG_SUCCESS,
  tags,
});

export const fetchTagFailure = tags => ({
  type: ACTION_TYPE.FETCH_TAGS_FAILURE,
  tags,
});

export const getTag = () => (dispatch) => {
  const token = localStorage.getItem('token');
  const headers = { headers: { Authorization: `Token ${token}` } };
  return axios.get(`${APP_URL}/tags`, headers)
    .then((response) => {
      dispatch(fetchTagSuccess(response.data.results));
    })
    .catch(() => {
      dispatch(fetchTagFailure('Check your internet conectivity'));
    });
};
