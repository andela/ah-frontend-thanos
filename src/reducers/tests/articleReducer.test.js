import expect from 'expect';
import articleReducer from '../articleReducer';
import ACTION_TYPE from '../../actions/actionTypes';
import initialState, { initialStateWithSample, initialStateWithSample2 } from '../../commons/initialStates';

describe('Article Reducer', () => {
  let initialStateWithLike;
  let initialStateWithDislike;
  let mockData;
  let errorMessage;

  beforeEach(() => {
    mockData = {
      results: [
        {
          title: '',
          body: '',
        },
      ],
    };
    errorMessage = 'Check your internet conectivity';

    initialStateWithLike = {
      article: {
        likes: 4,
        dislikes: 4,
        likeDislikeStatus: 'like',
      },
    };

    initialStateWithDislike = {
      article: {
        likes: 4,
        dislikes: 4,
        likeDislikeStatus: 'dislike',
      },
    };
  });

  it('it should return the initial state', () => {
    expect(articleReducer(undefined, {})).toEqual(initialState.articleReducer);
  });

  it('it should handle FETCH_ARTICLES_SUCCESS', () => {
    expect(
      articleReducer(initialState.articleReducer, {
        type: ACTION_TYPE.FETCH_ARTICLES_SUCCESS,
        articles: mockData,
      }),
    ).toEqual({
      article: initialState.articleReducer.article,
      articles: mockData,
      errorMessage: '',
    });
  });

  it('it should handle FETCH_ARTICLES_FAILURE', () => {
    expect(
      articleReducer(initialState.articleReducer, {
        type: ACTION_TYPE.FETCH_ARTICLES_FAILURE,
        errorMessage,
      }),
    ).toEqual({
      article: initialState.articleReducer.article,
      errorMessage,
      articles: {},
    });
  });

  it('should change like count and status after like action', () => {
    const action = {
      type: ACTION_TYPE.LIKEDISLIKE_ARTICLE,
      payload: { likeStatus: 'like' },
    };
    const { article } = initialStateWithSample;
    const expectedStateAfterAction = {
      ...initialStateWithSample,
      article: {
        ...article,
        likes: article.likes + 1,
        dislikes: article.dislikes - 1,
        likeDislikeStatus: 'like',
      },
    };
    expect(articleReducer(initialStateWithSample, action)).toEqual(expectedStateAfterAction);
  });

  it('should not update like count if user selection did not change', () => {
    const action = {
      type: ACTION_TYPE.LIKEDISLIKE_ARTICLE,
      payload: { likeStatus: 'like' },
    };
    const expectedStateAfterAction = {
      article: {
        likes: 4,
        dislikes: 4,
        likeDislikeStatus: 'like',
      },
    };
    expect(articleReducer(initialStateWithLike, action)).toEqual(expectedStateAfterAction);
  });

  it('should change dislike count and status after dislike action', () => {
    const action = {
      type: ACTION_TYPE.LIKEDISLIKE_ARTICLE,
      payload: { likeStatus: 'dislike' },
    };
    const { article } = initialStateWithSample2;
    const expectedStateAfterAction = {
      ...initialStateWithSample2,
      article: {
        ...article,
        likes: article.likes - 1,
        dislikes: article.dislikes + 1,
        likeDislikeStatus: 'dislike',
      },
    };
    expect(articleReducer(initialStateWithSample2, action)).toEqual(expectedStateAfterAction);
  });

  it('should not update dislike count if user selection did not change', () => {
    const action = {
      type: ACTION_TYPE.LIKEDISLIKE_ARTICLE,
      payload: { likeStatus: 'dislike' },
    };
    const expectedStateAfterAction = {
      article: {
        likes: 4,
        dislikes: 4,
        likeDislikeStatus: 'dislike',
      },
    };
    expect(articleReducer(initialStateWithDislike, action)).toEqual(expectedStateAfterAction);
  });

  it('should get article details after get-article action', () => {
    const freshArticle = {
      id: 1,
      tag_list: ['tagtest'],
      slug: 'this-is-it',
      title: 'This is it',
      description: 'short desc',
      body: 'short body',
      created_at: '',
      updated_at: '',
      image_url: 'http://image.png',
      audio_url: '',
      read_time: '',
      likes: 12,
      dislikes: 4,
      likeDislikeStatus: 'like',
      views_count: '',
      rating: 2,
      author: {
        id: 2,
        username: 'janedoe',
        email: 'janedoe@gmail.com',
      },
    };
    const action = {
      type: ACTION_TYPE.GET_ARTICLE,
      payload: freshArticle,
    };
    const { article } = initialState;
    const expectedStateAfterAction = {
      ...initialState,
      article: {
        ...article,
        ...freshArticle,
      },
    };
    expect(articleReducer(initialState, action)).toEqual(expectedStateAfterAction);
  });

  it('should update like status after like-status action', () => {
    const action = {
      type: ACTION_TYPE.GET_LIKE_STATUS,
      payload: [{
        like_status: 'dislike',
        article: 1,
        user: {
          username: localStorage.getItem('username'),
        },
      }],
    };
    const { article } = initialStateWithSample2;
    const expectedStateAfterAction = {
      ...initialStateWithSample2,
      article: {
        ...article,
        likeDislikeStatus: 'dislike',
      },
    };
    expect(articleReducer(initialStateWithSample2, action)).toEqual(expectedStateAfterAction);
  });

  it('should not raise an error', () => {
    const action = {
      type: ACTION_TYPE.SHOW_ERROR,
      payload: 'message',
    };
    const expectedStateAfterAction = {
      ...initialStateWithSample2,
    };
    expect(articleReducer(initialStateWithSample2, action)).toEqual(expectedStateAfterAction);
  });
});
