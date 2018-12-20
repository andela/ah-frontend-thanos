import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  editArticleSuccess, editArticleThunk, editArticleFailure,
} from './editArticleActions';
import ACTION_TYPE from '../actionTypes';
import APP_URL from '../../utils/constants';


describe('Login Actions tests', () => {
  let store;
  let actionTypesData;
  let inputData;
  beforeEach(() => {
    inputData = { inputData: 'How to train a dragon' };
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
  it('should return an error on unsuccessful edit of an article', () => {
    const errorMessage = { error: 'Some error' };
    const expectedAction = {
      type: ACTION_TYPE.EDIT_ARTICLE_FAILED,
      errorMessage,
    };
    expect(editArticleFailure(errorMessage)).toEqual(expectedAction);
  });
  test('Successful edit action', () => {
    expect(editArticleSuccess(inputData)).toEqual(expect.objectContaining(
      actionTypesData(ACTION_TYPE.EDIT_ARTICLE_SUCCESS, inputData),
    ));
  });
  const statusInput = (statusCode, response) => ({
    status: statusCode,
    responseText: response,
  });
  const url = `${APP_URL}/articles/7`;
  test('Edit article successfull', () => {
    moxios.stubRequest(
      url,
      statusInput(200, { message: 'ok' }),
    );
    store.dispatch(editArticleThunk(7)).then(() => {
      expect(store.getActions()).toEqual(expect.objectContaining(
        actionTypesData(ACTION_TYPE.EDIT_ARTICLE_SUCCESS, { message: 'ok' }),
      ));
    });
  });
  test('edit Failed', () => {
    moxios.stubRequest(`${APP_URL}/articles/7`, statusInput(400, { error: { error: 'Edit failed' } }));
    store.dispatch(editArticleThunk(7)).then(() => {
      expect(store.getActions()).toEqual(expect.objectContaining(
        actionTypesData(ACTION_TYPE.EDIT_ARTICLE_FAILED, { error: 'Rating failed' }),
      ));
    });
  });
});
