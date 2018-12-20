import axios from 'axios';
import ACTION_TYPE from '../actionTypes';
import APP_URL from '../../utils/constants';

export const editArticleSuccess = response => ({
  type: ACTION_TYPE.EDIT_ARTICLE_SUCCESS,
  payload: response,
});

export const editArticleData = response => ({
  type: ACTION_TYPE.EDIT_ARTICLE_DATA,
  payload: response,
});

export const editArticleFailure = errorMessage => ({
  type: ACTION_TYPE.EDIT_ARTICLE_FAILED,
  errorMessage,
});

export const updateImageUrl = imageUrl => ({
  type: ACTION_TYPE.UPDATE_IMAGE,
  payload: imageUrl,
});

export const loadData = response => ({
  type: ACTION_TYPE.LOAD_EDIT_DATA,
  payload: response,
});

const tok = localStorage.getItem('token');
export const editArticleThunk = (articleId, data) => (dispatch) => {
  const userdata = {
    ...data,
  };
  const token = `Token ${tok}`;
  return axios.put(
    `${APP_URL}/articles/${articleId}`,
    userdata,
    {
      headers: { Authorization: token },
    },
  )
    .then((res) => {
      const resData = res.data.results;
      dispatch(editArticleSuccess(resData));
    }).catch((error) => {
      const errorData = error.response.data;
      dispatch(editArticleFailure(errorData));
    });
};
export default editArticleThunk;
