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
    case actionTypes.USER_REGISTER_FAIL:
      swal({
        ...swalMessages.REGISTRATION_ERROR,
        text: (
          action.payload.results.username
            ? action.payload.results.username[0] : action.payload.results.email[0]
        ),
      });
      return regData;
    default: return state;
  }
};
export default userReducer;
