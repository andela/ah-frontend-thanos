import expect from 'expect';
import userReducer from '../userReducer';
import socialLoginReducer from '../socialLoginReducer';
import { LogIn } from '../../actions/actionCreators';
import ACTION_TYPES from '../../actions/actionTypes';

describe('Testing User Reducer', () => {
  test('Test Reducer User Input', () => {
    const intialState = {};
    const payload = {
      password: 'password',
      username: 'JohnDoe',
      email: 'johndoe@gmail.com',
    };
    const action = {
      type: ACTION_TYPES.GET_USER_INPUT,
      payload,
    };
    const expectedData = {
      ...intialState,
      freshUser: action.payload,
    };
    expect(userReducer(intialState, action)).toEqual(expectedData);
  });

  test('Test Reducer User Register Sucessful', () => {
    const intialState = {};
    const payload = {
      token: 'CAGHBZYJBUgvyxsgtygk.bytwes.twTYUgjhxyfgxu',
      username: 'JohnDoe',
      email: 'johndoe@gmail.com',
    };
    const action = {
      type: ACTION_TYPES.USER_REGISTER_SUCCESS,
      payload,
    };
    const expectedData = {
      ...intialState,
      data: action.payload,
    };
    expect(userReducer(intialState, action)).toEqual(expectedData);
  });

  test('Test Reducer User Register Fail', () => {
    const intialState = {};
    const payload = {
      username: ['user username already exists'],
      email: ['user email already exists'],
    };
    const action = {
      type: ACTION_TYPES.USER_REGISTER_FAIL,
      payload,
    };
    const expectedData = {
      ...intialState,
      data: action.payload,
    };
    expect(userReducer(intialState, action)).toEqual(expectedData);
  });

  test('social media', () => {
    const initiaState = { isLoggedIn: false };
    const newState = socialLoginReducer(initiaState, LogIn());
    expect(newState).toEqual({ isLoggedIn: true });
  });

  test('Test Reducer User Register Fail with no username', () => {
    const intialState = {};
    const payload = {
      email: ['user email already exists'],
    };
    const action = {
      type: ACTION_TYPES.USER_REGISTER_FAIL,
      payload,
    };
    const expectedData = {
      ...intialState,
      data: action.payload,
    };
    expect(userReducer(intialState, action)).toEqual(expectedData);
  });
});
