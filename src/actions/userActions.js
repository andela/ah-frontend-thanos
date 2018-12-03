import axios from 'axios';
import swal from 'sweetalert2';
import actionTypes from './actionTypes';
import swalMessages from './swalAlerts';

export const signupSuccessful = response => ({
  type: actionTypes.USER_REGISTER_SUCCESS,
  payload: response,
});

export const signupFail = response => ({
  type: actionTypes.USER_REGISTER_FAIL,
  payload: response,
});

export const getUserInput = payload => ({
  type: actionTypes.GET_USER_INPUT,
  payload,
});

export const userSignup = freshUser => (dispatch) => {
  swal.showLoading();
  return axios.post('https://ah-backend-thanos-staging.herokuapp.com/api/users', freshUser)
    .then((response) => {
      dispatch(signupSuccessful({
        results: response.data.results,
      }));
      swal(swalMessages.REGISTRATION_SUCCESSFUL);
      setTimeout(() => window.location.replace('/login'), 3000);
    })
    .catch((error) => {
      dispatch(signupFail({
        results: error.response.data.results,
      }));
      const errors = error.response.data.results;
      const message = (errors.username ? errors.username[0] : errors.email[0]);
      /* istanbul ignore next */
      swal({ ...swalMessages.REGISTRATION_ERROR, text: message });
    });
};
