import axios from 'axios';
import { notify } from 'react-notify-toast';
import APP_URL from '../../utils/constants';
import ACTION_TYPES from '../actionTypes';

export const NotificationSucces = message => notify.show(message, 'success', 5000);
export const NotificationError = message => notify.show(message, 'error', 5000);

const Header = {
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Token ${localStorage.getItem('token')}`,
  },
};

export const saveReportData = reason => ({
  type: ACTION_TYPES.SAVE_REPORT_DATA,
  reason,
});

export const reportingThunk = (reason, articleId) => {
  const userdata = {
    reason,
  };
  return axios.post(`${APP_URL}/articles/${articleId}/report`, userdata, Header)
    .then(() => {
      NotificationSucces('Article successfully reported');
      localStorage.setItem('reason', reason);
    })
    .catch(() => {
      NotificationError('Please login to report this article');
    });
};
export default reportingThunk;
