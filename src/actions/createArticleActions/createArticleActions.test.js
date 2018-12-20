import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  createArticleSuccess, createArticleThunk,
} from './index';
import ACTION_TYPE from '../actionTypes';
import APP_URL from '../../utils/constants';


describe('Create article Actions tests', () => {
  let store;
  let actionTypesData;
  let response;
  beforeEach(() => {
    response = { title: 'going to school' };
    const mockStore = configureMockStore([thunk]);
    store = mockStore({});
    actionTypesData = actionType => ({
      type: actionType,
      payload: response,
    });
    // import and pass your custom axios instance to this method
    moxios.install();
  });
  afterEach(() => {
    // import and pass your custom axios instance to this method
    moxios.uninstall();
  });
  test('Successful get and post rating action', () => {
    expect(createArticleSuccess(response)).toEqual(expect.objectContaining(
      actionTypesData(ACTION_TYPE.CREATE_ARTICLE_SUCCESS),
    ));
  });
  test('Post article successfull', () => {
    moxios.stubRequest(`${APP_URL}/articles`, {
      status: 200,
      response: { message: 'ok' },
    });
    store.dispatch(createArticleThunk()).then(() => {
      expect(store.getActions()).toEqual(expect.objectContaining(
        {
          type: ACTION_TYPE.CREATE_ARTICLE_SUCCESS,
          payload: { message: 'ok' },
        },
      ));
    });
  });
  test('Post article successfull', () => {
    moxios.stubRequest(`${APP_URL}/articles`, {
      status: 400,
      responseText: { error: 'ok' },
    });
    store.dispatch(createArticleThunk()).then(() => {
      expect(store.getActions()).toEqual(expect.objectContaining(
        [{
          type: ACTION_TYPE.CREATE_ARTICLE_FAILED,
        }],
      ));
    });
  });
});
