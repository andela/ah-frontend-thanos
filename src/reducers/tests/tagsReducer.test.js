import expect from 'expect';
import ACTION_TYPE from '../../actions/actionTypes';
import tagsReducer from '../tagsReducer';

test('Test Reducer Tags', () => {
  const intialState = { tags: [] };
  const tags = {};
  const action = {
    type: ACTION_TYPE.FETCH_TAG_SUCCESS,
    tags,
  };
  const expectedData = {
    ...intialState,
    tags: action.tags,
  };
  expect(tagsReducer(intialState, action)).toEqual(expectedData);
});
