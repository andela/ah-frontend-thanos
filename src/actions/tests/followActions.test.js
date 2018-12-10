import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import actionTypes from '../actionTypes';
import {
  getProfileThunk,
  followThunk, unfollowThunk,
  getFollowProfilesThunk,
} from '../followActions';
import APP_URL from '../../utils/constants';

const mockStore = configureMockStore([thunk]);

describe('Folow, Unfollow Actions', () => {
  let store;
  let profileUrl;
  let usersUrl;
  let janedoe;
  let profilesList;
  let error;

  beforeEach(() => {
    moxios.install();
    store = mockStore({});
    profileUrl = `${APP_URL}/profiles/janedoe`;
    usersUrl = `${APP_URL}/users/`;
    janedoe = {
      username: 'janedoe',
      bio: 'This is who I am',
      first_name: 'Jane',
      last_name: 'Doe',
      image: 'https://picsum.photos/600',
      created_at: '10-11-2011',
      updated_at: '11-11-2018',
      isFollowee: false,
    };
    profilesList = [
      {
        username: 'jack',
        bio: '',
        image: '',
        first_name: 'Jack',
        last_name: 'Katto',
        created_at: '10-11-2018',
        updated_at: '12-11-2018',
      },
      {
        username: 'ivy',
        bio: '',
        image: '',
        first_name: 'Ivy',
        last_name: 'Jones',
        created_at: '10-11-2018',
        updated_at: '15-11-2018',
      },
    ];
    error = {
      response: { data: { results: { error: 'Error message' } } },
    };
  });

  afterEach(() => {
    moxios.uninstall();
  });

  test('Get profile of user to follow or unfollow', () => {
    moxios.stubRequest(profileUrl, {
      status: 200,
      responseText: janedoe,
    });
    const expectedActions = [{ type: actionTypes.SHOW_USER_PROFILE }];
    store.dispatch(getProfileThunk({ username: 'janedoe', token: 'abcabc' }))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      })
      .catch(() => {});
  });

  test('Profile of user one is trying to follow is not found', () => {
    moxios.stubRequest(profileUrl, {
      status: 404,
      responseText: 'Could not find profile',
    });
    const expectedActions = [{ type: actionTypes.SHOW_ERROR }];
    store.dispatch(getProfileThunk({ username: 'janedoe', token: 'abcabc' }))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      })
      .catch(() => {});
  });

  test('Follow a user', () => {
    moxios.stubRequest(`${usersUrl}janedoe/follow`, {
      status: 200,
      responseText: janedoe,
    });
    const expectedActions = [{ type: actionTypes.FOLLOW_USER }];
    store.dispatch(followThunk({ user: 'janedoe', token: 'abcabc' }))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      })
      .catch(() => {});
  });

  test('Tying to Follow a user that does not exist', () => {
    moxios.stubRequest(`${usersUrl}janedoe/follow`, {
      status: 404,
      responseText: error,
    });
    const expectedActions = [{ type: actionTypes.SHOW_ERROR }];
    store.dispatch(followThunk({ user: 'janedoe', token: 'abcabc' }))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      })
      .catch(() => {});
  });

  test('Unfollow a user', () => {
    moxios.stubRequest(`${usersUrl}janedoe/follow`, {
      status: 200,
      responseText: { message: 'You have Unfollowed the User' },
    });
    const expectedActions = [{ type: actionTypes.UNFOLLOW_USER }];
    store.dispatch(unfollowThunk({ user: 'janedoe', token: 'abcabc' }))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      })
      .catch(() => {});
  });

  test('Tyring to Unfollow a user that does not exist', () => {
    moxios.stubRequest(`${usersUrl}janedoe/follow`, {
      status: 404,
      responseText: error,
    });
    const expectedActions = [{ type: actionTypes.SHOW_ERROR }];
    store.dispatch(unfollowThunk({ user: 'janedoe', token: 'abcabc' }))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      })
      .catch(() => {});
  });

  test('View followers of a specific user', () => {
    const url = `${usersUrl}janedoe/followers`;
    moxios.stubRequest(url, {
      status: 200,
      responseText: profilesList,
    });
    const expectedActions = [{ type: actionTypes.GET_FOLLOWERS }];
    store.dispatch(getFollowProfilesThunk(url, true))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      })
      .catch(() => {});
  });

  test('View users that a specific user follows ("followees")', () => {
    const url = `${usersUrl}janedoe/following`;
    moxios.stubRequest(url, {
      status: 200,
      responseText: profilesList,
    });
    const expectedActions = [{ type: actionTypes.GET_FOLLOWEES }];
    store.dispatch(getFollowProfilesThunk(url, false))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      })
      .catch(() => {});
  });
});
