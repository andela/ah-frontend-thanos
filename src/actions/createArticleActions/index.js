import axios from 'axios';
import ACTION_TYPE from '../actionTypes';
import APP_URL from '../../utils/constants';

export const postArticleData = response => ({
  type: ACTION_TYPE.POST_ARTICLE_DATA,
  payload: response,
});

export const createArticleSuccess = response => ({
  type: ACTION_TYPE.CREATE_ARTICLE_SUCCESS,
  payload: response,
});

export const createArticleFailure = errorMessage => ({
  type: ACTION_TYPE.CREATE_ARTICLE_FAILED,
  errorMessage,
});

export const updateImageUrl = imageUrl => ({
  type: ACTION_TYPE.UPDATE_IMAGE_URL,
  payload: imageUrl,
});

const userToken = localStorage.getItem('token');
export const createArticleThunk = data => (dispatch) => {
  const userdata = {
    ...data,
  };
  const url = `${APP_URL}/articles`;
  const token = `Token ${userToken}`;
  const headers = {
    headers: { Authorization: token },
  };
  return axios.post(url, userdata, headers)
    .then((res) => {
      const resData = res.data.results;
      dispatch(createArticleSuccess(resData));
    }).catch((error) => {
      const errorData = error.response.data;
      dispatch(createArticleFailure(errorData));
    });
};
export default createArticleThunk;
