import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import actionTypes from '../actionTypes';
import { likeDislikeArticleThunk } from '../likedislikeActions';

const mockStore = configureMockStore([thunk]);

describe('Like/Dislike Actions', () => {
  let store;
  let url;
  let sampleId;

  beforeEach(() => {
    moxios.install();
    store = mockStore({});
    sampleId = 1;
    url = `https://ah-backend-thanos-staging.herokuapp.com/api/articles/${sampleId}/like_status`;
  });

  afterEach(() => {
    moxios.uninstall();
  });

  test('like/dislike thunk action', () => {
    moxios.stubRequest(url, {
      status: 200,
      responseText: { like_status: 'like' },
    });
    const expectedActions = [{ type: actionTypes.LIKEDISLIKE_ARTICLE }];
    const likeObj = {
      articleId: sampleId,
      likeDislikeStatus: 'like',
      token: 'abcabc',
    };
    store.dispatch(likeDislikeArticleThunk(likeObj))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      })
      .catch(() => {});
    // if the article hasn't been liked/disliked before (likeDislikeStatus='')
    store.dispatch(likeDislikeArticleThunk({ ...likeObj, likeDislikeStatus: '' }))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      })
      .catch(() => {});
  });
});
