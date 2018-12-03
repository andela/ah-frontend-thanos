import expect from 'expect';
import userReducer from '../userReducer';
import actionTypes from '../../actions/actionTypes';

describe('Testing User Reducer', () => {
  test('Test Reducer User Input', () => {
    const intialState = {};
    const payload = {
      password: 'password',
      username: 'JohnDoe',
      email: 'johndoe@gmail.com',
    };
    const action = {
      type: actionTypes.GET_USER_INPUT,
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
      type: actionTypes.USER_REGISTER_SUCCESS,
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
      type: actionTypes.USER_REGISTER_FAIL,
      payload,
    };
    const expectedData = {
      ...intialState,
      data: action.payload,
    };
    expect(userReducer(intialState, action)).toEqual(expectedData);
  });
});
