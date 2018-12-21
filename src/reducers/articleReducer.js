import swal from 'sweetalert2';
import ACTION_TYPE from '../actions/actionTypes';
import initialState from '../commons/initialStates';

const initialStateReducer = {
  articles: {},
  errorMessage: '',
  article: initialState.articleReducer.article,
};

const reduce = count => (
  count > 0 ? (count - 1) : count
);

const getLikeCountIfLike = (condition, likes) => (condition ? likes : likes + 1);
const getLikeCountIfDislike = (condition, likes) => (condition ? likes : reduce(likes));
const getDislikeCountIfLike = (condition, dislikes) => (condition ? dislikes : reduce(dislikes));
const getDislikeCountIfDislike = (condition, dislikes) => (condition ? dislikes : dislikes + 1);

const getNewLikeDislikeCounters = (option, likeDislikeStatus, likes, dislikes) => {
  const condition = likeDislikeStatus === option;
  return {
    likes: (option === 'like') ? getLikeCountIfLike(condition, likes) : getLikeCountIfDislike(condition, likes),
    dislikes: (option === 'like') ? getDislikeCountIfLike(condition, dislikes) : getDislikeCountIfDislike(condition, dislikes),
    likeDislikeStatus: option,
  };
};

const articleReducer = (state = initialStateReducer, action) => {
  const { article } = state;
  const { payload } = action;

  switch (action.type) {
    case ACTION_TYPE.FETCH_ARTICLES_SUCCESS:
      return { ...state, articles: action.articles };
    case ACTION_TYPE.FETCH_ARTICLES_FAILURE:
      return { ...state, errorMessage: action.errorMessage };
    case ACTION_TYPE.LIKEDISLIKE_ARTICLE:
      return {
        ...state,
        article: (action.payload.likeStatus === 'like') ? { ...article, ...getNewLikeDislikeCounters('like', article.likeDislikeStatus, article.likes, article.dislikes) } : { ...article, ...getNewLikeDislikeCounters('dislike', article.likeDislikeStatus, article.likes, article.dislikes) },
      };
    case ACTION_TYPE.GET_ARTICLE:
      return { ...state, article: { ...article, ...action.payload } };
    case ACTION_TYPE.GET_LIKE_STATUS:
      return {
        ...state,
        article: { ...article, likeDislikeStatus: (payload[0].like_status) ? payload[0].like_status : '' },
      };
    case ACTION_TYPE.SHOW_ERROR:
      swal(action.payload);
      return state;
    default:
      return state;
  }
};

export default articleReducer;
