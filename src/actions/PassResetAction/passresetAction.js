import axios from 'axios';
import { notify } from 'react-notify-toast';
import APP_URL from '../../utils/constants';

const currentWindow = window.location.host;
export const NotificationSuccess = msg => notify.show(msg, 'success', 5000);

export const NotificationError = msg => notify.show(msg, 'error', 5000);

// takes in email from the user
export const PasswordInvokeThunk = (email) => {
  const userData = {
    email,
    callback_url: `https://${currentWindow}/newpassword`,
  };

  return axios.post(`${APP_URL}/users/reset_password`, userData)
    .then((response) => {
      NotificationSuccess(response.data.results.message);
    })
    .catch((error) => {
      NotificationError(error.response.data.results.error);
    });
};

// handles new password entry
export const PasswordEdit = (newpassword, confpassword, Token, obj) => {
  const passwordObj = {
    new_password: newpassword,
    confirm_password: confpassword,
  };

  return axios.put(`${APP_URL}/users/reset_password/${Token}`, passwordObj)
    .then((response) => {
      NotificationSuccess(response.data.results.message);

      obj.history.push('/login');
    }).catch((error) => {
      NotificationError(error.response.data.results.error);
    });
};
