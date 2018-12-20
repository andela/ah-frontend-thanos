import expect from 'expect';
import commentReducer from './index';
import actionTypes from '../../actions/commentActions/actionTypes';

describe(' Testing Comment reducer', () => {
  const initialState = {
    getCommentData: {
      results: [{
        comment_author: {
          email: 'sulaiman@andela.com',
          id: 7,
          username: 'Sulaiman',
        },
        comment_body: 'This is my new comment',
        created_at: '2018-12-18T09:17:27.663306Z',
        dislikes: 1,
        id: 2,
        likes: 1,
        updated_at: '2018-12-18T09:17:27.663367Z',
      }],
    },
  };
  const FailResults = {
    results: 'Article Not Found',
  };
  const Inputdata = {
    comment_body: 'This is my new comment',
  };

  const actions = (action, data) => ({
    type: action,
    payload: data,
  });

  const testExpectedData = data => ({
    ...initialState,
    commentInput: data,
  });

  test('NEW_COMMENT_DATA action', () => {
    expect(commentReducer(initialState,
      actions(actionTypes.NEW_COMMENT_DATA, Inputdata)))
      .toEqual(testExpectedData(Inputdata));
  });

  test('GET_ALL_COMMENTS_SUCCESSFUL action', () => {
    const Commentsdata = {
      results: ['This is my new comment', 'Second Comment'],
    };
    const action = {
      type: actionTypes.GET_ALL_COMMENTS_SUCCESSFUL,
      payload: Commentsdata,
    };
    const expectedData = {
      ...initialState,
      getCommentData: action.payload,
    };
    expect(commentReducer(initialState, action)).toEqual(expectedData);
  });

  test('GET_ALL_COMMENTS_FAIL action', () => {
    const action = actions(actionTypes.GET_ALL_COMMENTS_FAIL, FailResults);
    const expectedData = {
      ...initialState,
      getCommentError: action.payload,
    };
    expect(commentReducer(initialState, action)).toEqual(expectedData);
  });

  test('POST_COMMENT_SUCCESSFUL action', () => {
    const data = {
      results: 'This is my comment',
    };
    const action = {
      type: actionTypes.POST_COMMENT_SUCCESSFUL,
      payload: data,
    };
    const expectedData = {
      ...initialState,
      commentInput: {},
      getCommentData: {
        ...initialState.getCommentData,
        results: initialState.getCommentData.results.concat(action.payload),
      },
    };
    expect(commentReducer(initialState, action)).toEqual(expectedData);
  });

  test('POST_COMMENT_FAIL action', () => {
    const expectedData = {
      ...initialState,
      postCommentError: FailResults,
    };
    expect(commentReducer(initialState,
      actions(actionTypes.POST_COMMENT_FAIL, FailResults)))
      .toEqual(expectedData);
  });

  test('LIKE_COMMENT_FAIL action', () => {
    const expectedData = {
      ...initialState,
      LikestatusFail: FailResults,
    };
    expect(commentReducer(initialState,
      actions(actionTypes.LIKEDISLIKEFAIL, FailResults)))
      .toEqual(expectedData);
  });

  test('LIKE_COMMENT_SUCCESSFUL action', () => {
    const likedata = (code, status) => ({
      StatusCode: code, like_status: status, commentId: 2,
    });
    const action = data => ({
      type: actionTypes.LIKEDISLIKESUCCESSFUL,
      payload: data,
    });
    const expectedData = (numlikes, numdislikes) => ({
      getCommentData: {
        results: [{
          comment_author: {
            email: 'sulaiman@andela.com',
            id: 7,
            username: 'Sulaiman',
          },
          comment_body: 'This is my new comment',
          created_at: '2018-12-18T09:17:27.663306Z',
          dislikes: numdislikes,
          id: 2,
          likes: numlikes,
          updated_at: '2018-12-18T09:17:27.663367Z',
        }],
      },
    });
    expect(commentReducer(initialState,
      action(likedata(200, 'like')))).toEqual(expectedData(2, 0));
    expect(commentReducer(initialState,
      action(likedata(201, 'like')))).toEqual(expectedData(3, 0));
    expect(commentReducer(initialState,
      action(likedata(202, 'like')))).toEqual(expectedData(2, 0));
    expect(commentReducer(initialState,
      action(likedata(400, 'like')))).toEqual(expectedData(2, 0));
    expect(commentReducer(initialState,
      action(likedata(200, 'dislike')))).toEqual(expectedData(1, 1));
    expect(commentReducer(initialState,
      action(likedata(201, 'dislike')))).toEqual(expectedData(1, 2));
    expect(commentReducer(initialState,
      action(likedata(202, 'dislike')))).toEqual(expectedData(1, 1));
  });
});
