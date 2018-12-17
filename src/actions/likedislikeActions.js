import axios from 'axios';
import actionTypes from './actionTypes';

export const likeDislikeArticleAction = payload => ({
  type: actionTypes.LIKEDISLIKE_ARTICLE,
  payload,
});

export const likeDislikeArticleThunk = likeObj => (dispatch) => {
  const { articleId, likeDislikeStatus, token } = likeObj;
  const url = `https://ah-backend-thanos-staging.herokuapp.com/api/articles/${articleId}/like_status`;
  const headerValue = { headers: { Authorization: `Token ${token}` } };
  const payload = res => ({
    results: res.data.results,
    likeStatus: likeObj.like_status,
  });
  if (likeDislikeStatus) { // if a user has liked/disliked this article before
    return axios.put(url, likeObj, headerValue)
      .then((response) => {
        dispatch(likeDislikeArticleAction(payload(response)));
      })
      .catch(() => {});
  }
  return axios.post(url, likeObj, headerValue)
    .then((response) => {
      dispatch(likeDislikeArticleAction(payload(response)));
    });
};
