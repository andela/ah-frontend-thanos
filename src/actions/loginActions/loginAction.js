import axios from 'axios';
import ACTION_TYPE from '../actionTypes';

export const loginSuccess = response => ({
  type: ACTION_TYPE.USER_LOGIN_SUCCESS,
  payload: {
    response,
  },
});
export const loginFailure = errorMessage => ({
  type: ACTION_TYPE.USER_LOGIN_FAILURE,
  errorMessage,
});
export const loginThunk = data => (dispatch) => {
  const userdata = {
    user: {
      ...data,
    },
  };
  return axios.post('https://ah-backend-thanos-staging.herokuapp.com/api/users/login', userdata)
    .then((res) => {
      dispatch(loginSuccess(res.data.results));
    }).catch((error) => {
      dispatch(loginFailure(error.response.data.results.error[0]));
    });
};
export default loginThunk;
