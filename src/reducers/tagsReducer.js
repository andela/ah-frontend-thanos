import ACTION_TYPE from '../actions/actionTypes';

const initialState = { tags: [] };
const tagsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPE.FETCH_TAG_SUCCESS: {
      return {
        ...state,
        tags: action.tags,
      };
    }
    default:
      return state;
  }
};

export default tagsReducer;
