import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ACTION_TYPE from '../actionTypes';
import APP_URL from '../../utils/constants';
import { getTag } from '../tagsActions';

const mockStore = configureMockStore([thunk]);
let store;
describe('Test User actions', () => {
  beforeEach(() => {
    moxios.install();
    store = mockStore({});
  });
  afterEach(() => {
    moxios.uninstall();
  });
  test('Getting tags successfully', () => {
    moxios.stubRequest(`${APP_URL}/tags`, {
      status: 200,
      responseText: { tags: [] },
    });
    const expectedActions = [{ type: ACTION_TYPE.FETCH_TAG_SUCCESS }];
    const obj = {
      tags: ['boy', 'girl'],
      token: 'abcabc',
    };
    store
      .dispatch(getTag(obj))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      })
      .catch(() => {});
  });
  test('Getting tags failure', () => {
    moxios.stubRequest(`${APP_URL}/tags`, {
      status: 400,
    });
    const expectedActions = [{ type: ACTION_TYPE.FETCH_TAGS_FAILURE }];
    store.dispatch(getTag()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
