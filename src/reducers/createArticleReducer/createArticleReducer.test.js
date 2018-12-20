import expect from 'expect';
import createArticleReducer from './createArticleReducer';
import ACTION_TYPE from '../../actions/actionTypes';

describe('Test createArticleReducer Reducer', () => {
  const initalState = {
  };
  const data1 = 'How to work hard';
  const data2 = { error: 'Not found' };
  const data3 = { title: 'How to work hard' };
  const data4 = 'http://image.com';
  const action = (actionType, userData) => ({
    type: actionType,
    payload: userData,
  });
  const expectedData1 = {
    articlePost: data1,
  };
  const expectedData2 = {
    articlePostFail: data2,
  };
  const expectedData3 = {
    articlePostData: data3,
  };
  const expectedData4 = {
    articlePostData: { image_url: data4 },
  };
  test('test create article succesfully', () => {
    expect(createArticleReducer(initalState, action(ACTION_TYPE.CREATE_ARTICLE_SUCCESS,
      data1))).toEqual(expectedData1);
  });

  test('test create article post failed', () => {
    expect(createArticleReducer(initalState, action(ACTION_TYPE.CREATE_ARTICLE_FAILED,
      data2))).toEqual(expectedData2);
  });

  test('test rating post failed', () => {
    expect(createArticleReducer(initalState, action(ACTION_TYPE.POST_ARTICLE_DATA,
      data3))).toEqual(expectedData3);
    expect(createArticleReducer(initalState, action(ACTION_TYPE.UPDATE_IMAGE_URL,
      data4))).toEqual(expectedData4);
  });
});
