import expect from 'expect';
import deleteArticleReducer from './deleteArticleReducer';
import ACTION_TYPE from '../../actions/actionTypes';

describe('Test createArticleReducer Reducer', () => {
  const initalState = {
  };
  const data1 = 'Deleted successfully';
  const data2 = { data: { results: { error: 'Not found' } } };
  const action = (actionType, userData) => ({
    type: actionType,
    payload: userData,
  });
  const expectedData1 = {
    articleDelete: data1,
  };
  const expectedData2 = {
    articleDeleteFail: data2,
  };
  test('test create article succesfully', () => {
    expect(deleteArticleReducer(initalState, action(ACTION_TYPE.DELETE_ARTICLE_SUCCESS,
      data1))).toEqual(expectedData1);
  });

  test('test create article post failed', () => {
    expect(deleteArticleReducer(initalState, action(ACTION_TYPE.DELETE_ARTICLE_FAILED,
      data2))).toEqual(expectedData2);
  });
});
