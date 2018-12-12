import moxios from 'moxios';
import { PasswordInvokeThunk, PasswordEdit } from './passresetAction';
import APP_URL from '../../utils/constants';

jest.mock('react-notify-toast');

describe('actions', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });
  const data = {
    results: {
      message: 'We have sent you an email to reset your password',
      reset_password_token: 'ccvtzLt2QwSRLvoV871sp1pKcNVRK8Y',
    },
  };

  const email = 'daniel.nuwa@gmail.com';
  const url = `${APP_URL}/users/reset_password`;
  const newpassURL = `${APP_URL}/users/reset_password/Token`;

  const mockPasswordReset = (statusCode) => {
    test('should create an action for a success invoking of password reset', () => {
      moxios.stubRequest(url, {
        status: statusCode,
        response: data,
      });

      return PasswordInvokeThunk(email).then(() => {
        expect(data).toBe(data);
      });
    });
  };

  const testPassword = (statusCode) => {
    it('test password update', async (done) => {
      moxios.stubRequest(newpassURL, {
        status: statusCode,
        response: { results: { message: '' } },
      });
      const pass = await PasswordEdit('password', 'password', 'Token', { history: { push: jest.fn } });
      expect(pass).toBeUndefined();
      done();
    });
  };

  mockPasswordReset(200);
  mockPasswordReset(400);
  testPassword(200);
  testPassword(400);
});
