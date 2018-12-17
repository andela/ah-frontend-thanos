import axios from 'axios';
import ACTION_TYPE from './actionTypes';

export const fetchArticlesSuccess = articles => ({
  type: ACTION_TYPE.FETCH_ARTICLES_SUCCESS,
  articles,
});

export const fetchArticlesFailure = errorMessage => ({
  type: ACTION_TYPE.FETCH_ARTICLES_FAILURE,
  errorMessage,
});

export const showErrorAction = payload => ({
  type: ACTION_TYPE.SHOW_ERROR,
  payload, // error message
});

export const fetchArticlesThunk = () => dispatch => axios.get('https://ah-backend-thanos-staging.herokuapp.com/api/articles')
  .then((response) => {
    dispatch(fetchArticlesSuccess(response.data.results));
  })
  .catch(() => {
    dispatch(fetchArticlesFailure('Check your internet conectivity'));
  });


export const getArticleAction = payload => ({
  type: ACTION_TYPE.GET_ARTICLE,
  payload, // entire article
});

export const getLikeStatusAction = payload => ({
  type: ACTION_TYPE.GET_LIKE_STATUS,
  payload,
});

export const getArticleThunk = articleId => (dispatch) => {
  const url = `https://ah-backend-thanos-staging.herokuapp.com/api/articles/${articleId}`;
  return axios.get(url)
    .then((response) => {
      dispatch(getArticleAction(response.data.results));
      return response;
    })
    .catch((error) => {
      dispatch(showErrorAction({
        ...alert,
        text: error.response ? error.response.data.results.error : 'Article not found',
      }));
    });
};

export const getLikeStatusThunk = ({ articleId, token }) => (dispatch, getState) => {
  const url = `https://ah-backend-thanos-staging.herokuapp.com/api/articles/${articleId}/like_status`;
  return axios.get(url, { headers: { Authorization: `Token ${token}` } })
    .then((response) => {
      const obj = response.data.results.filter(
        res => res.user.username === localStorage.getItem('username')
          && res.article === getState().articleReducer.article.id,
      );
      dispatch(getLikeStatusAction(obj));
    })
    .catch(() => { }); // has no like-status
};

export default fetchArticlesThunk;
