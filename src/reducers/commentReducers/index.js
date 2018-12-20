import swal from 'sweetalert2';
import actionTypes from '../../actions/commentActions/actionTypes';

const initialState = {
  getCommentData: { results: [] },
};

const Updated200 = (res, Likes) => {
  let updated = {
    ...Likes,
    likes: Likes.likes - 1,
    dislikes: Likes.dislikes + 1,
  };
  if (res.like_status === 'like') {
    updated = {
      ...Likes,
      likes: Likes.likes + 1,
      dislikes: Likes.dislikes - 1,
    };
  }
  return updated;
};

const Updated201 = (res, comment) => {
  let updated = {
    ...comment,
    dislikes: comment.dislikes + 1,
  };
  if (res.like_status === 'like') {
    updated = {
      ...comment,
      likes: comment.likes + 1,
    };
  }
  return updated;
};
const likeState = data => ({
  ...data,
  dislikes: data.dislikes - 1,
});
const Updated202 = (res, Likes) => {
  let newState = likeState(Likes);
  if (res.like_status === 'like') {
    newState = {
      ...Likes,
      likes: Likes.likes - 1,
    };
  }
  return newState;
};

const ReduceState = state => ({
  ...state,
  getCommentData: {
    ...state.getCommentData,
    results: [...state.getCommentData.results],
  },
});

const PostcommentState = (state, action) => ({
  ...state,
  getCommentData: {
    ...state.getCommentData,
    results: state.getCommentData.results.concat(action.payload),
  },
  commentInput: {},
});

const updateState = (res, state) => {
  const initialstate = state;
  const articleIndex = state.getCommentData.results.findIndex(
    comment => comment.id === res.commentId,
  );
  const Likes = state.getCommentData.results[articleIndex];
  switch (res.StatusCode) {
    case 200:
      initialstate.getCommentData.results[articleIndex] = Updated200(res, Likes);
      return ReduceState(state);
    case 201:
      initialstate.getCommentData.results[articleIndex] = Updated201(res, Likes);
      return ReduceState(state);
    case 202:
      initialstate.getCommentData.results[articleIndex] = Updated202(res, Likes);
      return ReduceState(state);
    default: return { ...state };
  }
};

const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.NEW_COMMENT_DATA:
      return { ...state, commentInput: action.payload };
    case actionTypes.GET_ALL_COMMENTS_SUCCESSFUL:
      return { ...state, getCommentData: action.payload };
    case actionTypes.GET_ALL_COMMENTS_FAIL:
      return { ...state, getCommentError: action.payload };
    case actionTypes.POST_COMMENT_SUCCESSFUL:
      swal({ type: 'success', text: 'You have add a new comment' });
      return PostcommentState(state, action);
    case actionTypes.POST_COMMENT_FAIL:
      swal({ title: 'Oops...', text: action.payload.results.error });
      return { ...state, postCommentError: action.payload };
    case actionTypes.LIKEDISLIKEFAIL:
      return { ...state, LikestatusFail: action.payload };
    case actionTypes.LIKEDISLIKESUCCESSFUL:
      return updateState(action.payload, state);
    default: return { ...state };
  }
};

export default commentReducer;
