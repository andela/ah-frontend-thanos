import axios from 'axios';
import ACTION_TYPE from '../actionTypes';
import APP_URL from '../../utils/constants';

export const deleteArticleSuccess = response => ({
  type: ACTION_TYPE.DELETE_ARTICLE_SUCCESS,
  payload: response,
});

export const deleteArticleFailure = errorMessage => ({
  type: ACTION_TYPE.DELETE_ARTICLE_FAILED,
  payload: errorMessage,
});

const tok = localStorage.getItem('token');
export const deleteArticleThunk = articleId => (dispatch) => {
  const url = `${APP_URL}/articles/${articleId}`;
  const token = `Token ${tok}`;
  const headers = {
    headers: { Authorization: token },
  };
  return axios.delete(url, headers)
    .then((response) => {
      dispatch(deleteArticleSuccess(response.data.results));
    })
    .catch((error) => {
      dispatch(deleteArticleFailure(error.response));
    });
};
