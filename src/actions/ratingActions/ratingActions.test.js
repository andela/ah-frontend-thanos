import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  ratingSuccess, fetchRatingThunk, postRatingSuccess, postRating, postRatingFailed,
} from './index';
import ACTION_TYPE from '../actionTypes';
import APP_URL from '../../utils/constants';

describe('Login Actions tests', () => {
  let store;
  let actionTypesData;
  let rate;
  beforeEach(() => {
    rate = { rate: 1 };
    const mockStore = configureMockStore([thunk]);
    store = mockStore({});
    actionTypesData = (actionType, data) => ({
      type: actionType,
      payload: data,
    });
    // import and pass your custom axios instance to this method
    moxios.install();
  });
  afterEach(() => {
    // import and pass your custom axios instance to this method
    moxios.uninstall();
  });
  it('should return an error on unsuccessful rating of an article', () => {
    const errorMessage = { error: 'Some error' };
    const expectedAction = {
      type: ACTION_TYPE.POST_RATING_FAILED,
      payload: errorMessage,
    };
    expect(postRatingFailed(errorMessage)).toEqual(expectedAction);
  });

  test('Successful get and post rating action', () => {
    expect(ratingSuccess(rate)).toEqual(expect.objectContaining(
      actionTypesData(ACTION_TYPE.GET_RATING_SUCCESS, rate),
    ));
    expect(postRatingSuccess(rate)).toEqual(expect.objectContaining(
      actionTypesData(ACTION_TYPE.POST_RATING_SUCCESS, rate),
    ));
  });
  const statusData = (statusCode, response) => ({
    status: statusCode,
    responseText: response,
  });
  test('get rate successfull', () => {
    moxios.stubRequest(`${APP_URL}/articles/7`, statusData(200, { message: 'ok' }));
    store.dispatch(fetchRatingThunk(7)).then(() => {
      expect(store.getActions()).toEqual(expect.objectContaining(
        [{
          type: ACTION_TYPE.GET_RATING_SUCCESS,
        }],
      ));
    });
  });
  test('get rate successfull', () => {
    moxios.stubRequest(`${APP_URL}/articles/7/rating`, statusData(200, { message: 'ok' }));
    store.dispatch(postRating(7)).then(() => {
      expect(store.getActions()).toEqual(expect.objectContaining(
        actionTypesData(ACTION_TYPE.POST_RATING_SUCCESS, { message: 'ok' }),
      ));
    });
  });
  test('get rate Failed', () => {
    moxios.stubRequest(`${APP_URL}/articles/7/rating`, {
      status: 400,
      error: { error: 'Rating failed' },
    });
    store.dispatch(postRating(7)).then(() => {
      expect(store.getActions()).toEqual(expect.objectContaining(
        actionTypesData(ACTION_TYPE.POST_RATING_FAILED, { error: 'Rating failed' }),
      ));
    });
  });
});
