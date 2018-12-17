import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import reduxThunk from 'redux-thunk';
import { fetchSearchArticlesThunk } from '../searchActions';
import APP_URL from '../../utils/constants';
import ACTION_TYPE from '../actionTypes';
import { sampleListOfArticles } from '../../commons/initialStates';

describe('Search Actions', () => {
  let store;
  let url;

  beforeEach(() => {
    moxios.install();
    const mockStore = configureMockStore([reduxThunk]);
    store = mockStore({});
    url = `${APP_URL}/articles?title=dragon`;
  });

  afterEach(() => {
    moxios.uninstall();
  });

  test('search articles thunk', () => {
    moxios.stubRequest(url, {
      status: 200,
      responseText: sampleListOfArticles,
    });
    const expectedActions = [{
      type: ACTION_TYPE.SAVE_SEARCH_RESULTS,
      payload: sampleListOfArticles,
    }];
    store.dispatch((fetchSearchArticlesThunk(url)))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      })
      .catch(() => {});
  });
});
