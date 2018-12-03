import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import actionTypes from '../actionTypes';
import {
  signupSuccessful, signupFail, getUserInput, userSignup,
} from '../userActions';

const mockStore = configureMockStore([thunk]);

describe('Test User actions', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  test('signupSuccessful Action', () => {
    const user = {
      email: 'johndoe@example.com',
    };
    expect(signupSuccessful(user)).toEqual(expect.objectContaining({
      type: actionTypes.USER_REGISTER_SUCCESS,
      payload: user,
    }));
  });

  test('signupFail Action', () => {
    const user = {
      email: ['email already exists'],
    };
    expect(signupFail(user)).toEqual(expect.objectContaining({
      type: actionTypes.USER_REGISTER_FAIL,
      payload: user,
    }));
  });

  test('getUserInput Action', () => {
    const data = {
      password: 'password',
      username: 'JohnDoe',
      email: 'johndoe@gmail.com',
    };
    const payload = data;
    expect(getUserInput(data)).toEqual(expect.objectContaining({
      type: actionTypes.GET_USER_INPUT,
      payload,
    }));
  });

  test('UserSignup Action Pass', () => {
    moxios.stubRequest('https://ah-backend-thanos-staging.herokuapp.com/api/users', {
      status: 200,
      responseText: {
        email: 'johndoe@example.com',
      },
    });
    const expectedActions = [{
      payload: { results: undefined },
      type: actionTypes.USER_REGISTER_SUCCESS,
    }];
    const store = mockStore({});

    store.dispatch(userSignup()).then(() => {
      expect(store.getActions()).toEqual(expect.objectContaining(expectedActions));
    });
  });

  test('UserSignup Action Fail', () => {
    moxios.stubRequest('https://ah-backend-thanos-staging.herokuapp.com/api/users', {
      status: 400,
      responseText: {
        email: ['user with this email already exists'],
      },
    });
    const expectedActions = [{
      payload: { results: undefined },
      type: actionTypes.USER_REGISTER_FAIL,
    }];
    const store = mockStore({});

    store.dispatch(userSignup()).catch(() => {
      expect(store.getActions()).toEqual(expect.objectContaining(expectedActions));
    });
  });
});
