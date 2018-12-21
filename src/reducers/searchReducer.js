import ACTION_TYPE from '../actions/actionTypes';

const initialState = {
  searchArticles: [],
  searchQuery: '',
  title: '',
  tag: '',
  author: '',
};

const searchReducer = (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
    case ACTION_TYPE.SAVE_SEARCH_QUERY:
      return { ...state, searchQuery: payload };
    case ACTION_TYPE.SAVE_SEARCH_RESULTS:
      return { ...state, searchArticles: payload };
    case ACTION_TYPE.UPDATE_FILTER_FIELD:
      return { ...state, ...payload };
    default:
      return state;
  }
};

export default searchReducer;
