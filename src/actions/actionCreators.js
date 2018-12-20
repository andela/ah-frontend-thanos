import ACTION_TYPES from './actionTypes';

export const SocialLogin = () => ({
  type: ACTION_TYPES.SOCIAL_LOGIN,
});
export const LogIn = () => ({
  type: ACTION_TYPES.LOGIN,
});

export const socialLoginFailure = response => ({
  type: ACTION_TYPES.SOCIAL_LOGIN_FAILURE,
  payload: response,
});
export const getProfile = profile => (
  {
    type: ACTION_TYPES.GET_PROFILE_SUCCESS,
    payload: profile,
  }
);

export const getProfileError = response => ({
  type: ACTION_TYPES.GET_PROFILE_ERROR,
  payload: response,
});

export const editProfile = profile => ({
  type: ACTION_TYPES.EDIT_PROFILE,
  payload: profile,
});
