import expect from 'expect';
import searchReducer from '../searchReducer';
import ACTION_TYPE from '../../actions/actionTypes';
import initialState, { sampleListOfArticles } from '../../commons/initialStates';

describe('Search Reducer', () => {
  beforeEach(() => {

  });

  it('should return the initial state', () => {
    expect(searchReducer(undefined, {})).toEqual(initialState.searchReducer);
  });

  it('should save search query in state', () => {
    const expectedState = {
      ...initialState.searchReducer,
      searchQuery: 'dragons',
    };
    expect(
      searchReducer(initialState.searchReducer, {
        type: ACTION_TYPE.SAVE_SEARCH_QUERY,
        payload: 'dragons',
      }),
    ).toEqual(expectedState);
  });

  it('should save search results in state', () => {
    const expectedState = {
      ...initialState.searchReducer,
      searchArticles: sampleListOfArticles,
    };
    expect(
      searchReducer(initialState.searchReducer, {
        type: ACTION_TYPE.SAVE_SEARCH_RESULTS,
        payload: sampleListOfArticles,
      }),
    ).toEqual(expectedState);
  });

  it('should save filter field data in state', () => {
    const expectedState = {
      ...initialState.searchReducer,
      tag: 'tagsample',
    };
    expect(
      searchReducer(initialState.searchReducer, {
        type: ACTION_TYPE.UPDATE_FILTER_FIELD,
        payload: { tag: 'tagsample' },
      }),
    ).toEqual(expectedState);
  });
});
