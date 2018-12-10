import swal from 'sweetalert2';
import actionTypes from '../actions/actionTypes';
import swalMessages from '../actions/swalAlerts';


const initialState = {
  freshUser: {
    password: '',
    email: '',
    username: '',
  },
};

const userReducer = (state = initialState, action) => {
  const getInputData = {
    ...state,
    freshUser: action.payload,
  };
  const regData = { ...state, data: action.payload };
  switch (action.type) {
    case actionTypes.GET_USER_INPUT:
      return getInputData;
    case actionTypes.USER_REGISTER_SUCCESS:
      swal(swalMessages.REGISTRATION_SUCCESSFUL);
      return regData;
    case actionTypes.USER_REGISTER_FAIL: {
      const errors = action.payload;
      swal({
        ...swalMessages.REGISTRATION_ERROR,
        text: (errors.username ? errors.username[0] : errors.email[0]),
      });
      return {
        ...state,
        data: action.payload,
      };
    }
    default: return state;
  }
};
export default userReducer;
