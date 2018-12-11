import ACTION_TYPES from '../actions/actionTypes';

const initialState = {
  isLoggedIn: false,
};


const socialLoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.LOGIN:
      return { ...state, isLoggedIn: true };
    default: return state;
  }
};
export default socialLoginReducer;
