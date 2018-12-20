import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import actionTypes from './actionTypes';
import {
  AllComments, CommentInput, PostComment, allCommentsFail,
  allCommentsSuccessful, postCommentFail, postCommentSuccessful,
  LikeDislikeComment,
} from './index';
import APP_URL from '../../utils/constants';

const mockStore = configureMockStore([thunk]);

describe('Test Comment actions', () => {
  const failData = {
    error: 'Article Not Found',
  };
  const Notfound = () => (
    {
      status: 400,
      responseText: {
        error: 'Article Not Found',
      },
    }
  );
  const passData = {
    comment: 'This is my new comment',
  };
  const testExpectedData = (testfun, data, action) => expect(testfun(data))
    .toEqual(expect.objectContaining({
      type: action,
      payload: data,
    }));
  const articleId = 1;
  const commentId = 4;
  const url = `${APP_URL}/articles/${articleId}/comments`;
  const url2 = `${APP_URL}/articles/${articleId}/comments/${commentId}/like_status`;

  const request = () => (
    moxios.stubRequest(url, Notfound())
  );
  const expectedActionsFail = action => [{
    payload: { results: { error: 'Article Not Found' } },
    type: action,
  }];
  const store = mockStore({});

  const testCatch = (func, action) => (
    store.dispatch(func(articleId)).catch(() => {
      expect(store.getActions())
        .toEqual(expect.objectContaining(expectedActionsFail(action)));
    })
  );
  const expectedobject = action => expect.objectContaining(action);

  const testthen = (func, action) => (
    store.dispatch(func(articleId)).then(() => {
      expect(store.getActions())
        .toEqual(expectedobject(action));
    }).catch(() => {
    }));

  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  test('Get All Comments Fail Action', () => {
    testExpectedData(allCommentsFail, failData, actionTypes.GET_ALL_COMMENTS_FAIL);
  });

  test('Get All Comments Successful Action', () => {
    const data = {
      results: ['First Article', 'Second Article'],
    };
    expect(allCommentsSuccessful(data)).toEqual(expect.objectContaining({
      type: actionTypes.GET_ALL_COMMENTS_SUCCESSFUL,
      payload: data,
    }));
  });

  test('Post Comment Fail Action', () => {
    testExpectedData(postCommentFail, failData, actionTypes.POST_COMMENT_FAIL);
  });

  test('Post Comment Successful Action', () => {
    testExpectedData(postCommentSuccessful, passData, actionTypes.POST_COMMENT_SUCCESSFUL);
  });

  test('Comment Input Action', () => {
    testExpectedData(CommentInput, passData, actionTypes.NEW_COMMENT_DATA);
  });

  test('Get All Comments Pass', () => {
    moxios.stubRequest(url, {
      status: 200,
      responseText: {
        results: ['My Fisrt comment', 'My second Comment'],
      },
    });
    const expectedActions = [{
      payload: { results: ['My Fisrt comment', 'My second Comment'] },
      type: actionTypes.GET_ALL_COMMENTS_SUCCESSFUL,
    }];

    testthen(AllComments, expectedActions);
  });

  test('Get All Comments Fail', () => {
    request();
    testCatch(AllComments, actionTypes.GET_ALL_COMMENTS_FAIL);
  });

  test('Post Comment Pass', () => {
    moxios.stubRequest(url, {
      status: 200,
      responseText: {
        results: { comment: 'My Fisrt comment' },
      },
    });
    const expectedActions = [{
      payload: { results: { comment: 'My Fisrt comment' } },
      type: actionTypes.POST_COMMENT_SUCCESSFUL,
    }];
    testthen(PostComment, expectedActions);
  });

  test('Post Comment Fail', () => {
    request();
    testCatch(PostComment, actionTypes.POST_COMMENT_FAIL);
  });

  test('Like Comment Pass', () => {
    moxios.stubRequest(url2, {
      status: 200,
      responseText: {
        results: { comment: 'My Fisrt comment' },
      },
    });
    store.dispatch(LikeDislikeComment(articleId, commentId, passData)).then(() => {
      expect(store.getActions())
        .toEqual(expectedobject(actionTypes.LIKEDISLIKESUCCESSFUL));
    }).catch(() => {
    });
  });

  test('Like Comment Fail', () => {
    moxios.stubRequest(url2, Notfound());
    store.dispatch(LikeDislikeComment(articleId, commentId, passData)).catch(() => {
      expect(store.getActions())
        .toEqual(expect.objectContaining(expectedActionsFail(actionTypes.LIKEDISLIKEFAIL)));
    });
  });
});
