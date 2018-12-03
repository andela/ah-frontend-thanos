// handle all actions pertaining to the user (login, registration, ...)
import actionTypes from '../actions/actionTypes';

const initialState = {
  freshUser: {
    password: '',
    email: '',
    username: '',
  },
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_USER_INPUT:
      return {
        ...state,
        freshUser: action.payload,
      };
    case actionTypes.USER_REGISTER_SUCCESS:
      return {
        ...state,
        data: action.payload,
      };
    case actionTypes.USER_REGISTER_FAIL:
      return {
        ...state,
        data: action.payload,
      };
    default: return state;
  }
};

export default user;
