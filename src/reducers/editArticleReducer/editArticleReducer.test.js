import expect from 'expect';
import editArticleReducer from './editArticleReducer';
import ACTION_TYPE from '../../actions/actionTypes';

describe('Test Rating Reducer', () => {
  const initalState = {
  };
  const data2 = { title: 'How to train a dragon' };
  const data4 = 'http://image.com';
  const action = (actionType, userData) => ({
    type: actionType,
    payload: userData,
  });
  const expectedData1 = {
    articleEdit: data2,
  };
  const expectedData2 = {
    articleEditData: data2,
  };
  const expectedData3 = {
    articleEditFail: data2,
  };
  const expectedData4 = {
    articleEditData: { image_url: data4 },
  };

  test('test rating post succesfully', () => {
    expect(editArticleReducer(initalState, action(ACTION_TYPE.EDIT_ARTICLE_SUCCESS,
      data2))).toEqual(expectedData1);
  });

  test('test rating post failed', () => {
    expect(editArticleReducer(initalState, action(ACTION_TYPE.EDIT_ARTICLE_FAILED,
      data2))).toEqual(expectedData3);
    expect(editArticleReducer(initalState, action(ACTION_TYPE.LOAD_EDIT_DATA,
      data2))).toEqual(expectedData2);
  });

  test('test rating post data succesfully', () => {
    expect(editArticleReducer(initalState, action(ACTION_TYPE.EDIT_ARTICLE_DATA,
      data2))).toEqual(expectedData2);
    expect(editArticleReducer(initalState, action(ACTION_TYPE.UPDATE_IMAGE,
      data4))).toEqual(expectedData4);
  });
});
