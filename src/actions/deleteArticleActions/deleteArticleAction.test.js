import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  deleteArticleSuccess, deleteArticleThunk,
} from './deleteArticleAction';
import ACTION_TYPE from '../actionTypes';
import APP_URL from '../../utils/constants';


describe('Create article Actions tests', () => {
  let store;
  let actionTypesData;
  let response;
  beforeEach(() => {
    response = { delete: 'Article deleted successfully' };
    const mockStore = configureMockStore([thunk]);
    store = mockStore({});
    actionTypesData = actionType => ({
      type: actionType,
    });
    // import and pass your custom axios instance to this method
    moxios.install();
  });
  afterEach(() => {
    // import and pass your custom axios instance to this method
    moxios.uninstall();
  });
  test('Successful delete article action', () => {
    expect(deleteArticleSuccess(response)).toEqual(expect.objectContaining(
      actionTypesData(ACTION_TYPE.DELETE_ARTICLE_SUCCESS),
    ));
  });
  test('Delete article successfull', () => {
    moxios.stubRequest(`${APP_URL}/articles/7`, {
      status: 200,
    });
    store.dispatch(deleteArticleThunk(7)).then(() => {
      expect(store.getActions()).toEqual(expect.objectContaining(
        {
          type: ACTION_TYPE.CREATE_ARTICLE_SUCCESS,
        },
      ));
    });
  });
  test('Delete article failed', () => {
    moxios.stubRequest(`${APP_URL}/articles/7`, {
      status: 400,
    });
    store.dispatch(deleteArticleThunk(7)).catch(() => {
      expect(store.getActions()).toEqual(expect.objectContaining(
        [{
          type: ACTION_TYPE.DELETE_ARTICLE_FAILED,
        }],
      ));
    });
  });
});
