import axios from 'axios';
import swal from 'sweetalert2';
import actionTypes from './actionTypes';
import { SocialLogin, LogIn, socialLoginFailure } from './actionCreators';
import APP_URL from '../utils/constants';

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
  return axios
    .post(`${APP_URL}/users`, freshUser)
    .then((response) => {
      dispatch(
        signupSuccessful({
          results: response.data.results,
        }),
      );
    })
    .catch((error) => {
      dispatch(
        signupFail({
          results: error.response.data.results,
        }),
      );
    });
};

export const socialUserLogin = (url, token) => (dispatch) => {
  dispatch(SocialLogin(true));
  return axios
    .post(`${APP_URL}/${url}/${token}`)
    .then((response) => {
      localStorage.setItem('token', response.data.results.token);
      localStorage.setItem('username', response.data.results.username);
      dispatch(LogIn(true));
    })
    .catch(() => {
      dispatch(
        socialLoginFailure('Social Login Failed, Please try again'),
      );
    });
};
export default socialUserLogin;
