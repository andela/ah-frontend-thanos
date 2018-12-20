import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ACTION_TYPE from '../actionTypes';
import { getProfile, getProfileError, editProfile } from '../actionCreators';
import { getProfileAction, editProfileAction } from '../profileActions';
import APP_URL from '../../utils/constants';

const mockStore = configureMockStore([thunk]);

describe('Test Profile actions', () => {
  let store;
  let url;
  let testUser;
  beforeEach(() => {
    moxios.install();
    store = mockStore({});
    testUser = 'johnDoe';
    url = `${APP_URL}/profiles/${testUser}`;
  });
  afterEach(() => {
    moxios.uninstall();
  });
  test('get/view Profile Action', () => {
    const profile = {
      username: 'rachaelminani',
    };
    expect(getProfile(profile)).toEqual(expect.objectContaining({
      type: ACTION_TYPE.GET_PROFILE_SUCCESS,
      payload: profile,
    }));
  });
  test(' Get profile action', () => {
    moxios.stubRequest(url, {
      status: 200,
      profile: { },
    });
    const expectedActions = [{ type: ACTION_TYPE.GET_PROFILE_SUCCESS }];
    const profile = {
      username: testUser,
      token: 'abcabc',
    };
    store.dispatch(getProfileAction(profile))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      })
      .catch(() => {});
  });
  test(' Edit profile action passes', () => {
    moxios.stubRequest(url, {
      status: 200,
      response: {
        data: {
          results: {},
        },
      },
    });
    const expectedActions = [{ type: ACTION_TYPE.EDIT_PROFILE }];
    const profiles = {
      username: testUser,
      first_name: 'abcabc',
    };
    store.dispatch(editProfileAction('token', testUser, profiles))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  test(' Edit profile action fails', () => {
    moxios.stubRequest(url, {
      status: 400,
    });
    const expectedActions = [{ payload: { results: undefined, status_code: 400 }, type: 'GET_PROFILE_ERROR' }];
    const profiles = {
      username: testUser,
      token: 'abcabc',
    };
    store.dispatch(editProfileAction('some-token', testUser, profiles))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
  it('LOGIN Action', () => {
    const profiles = {};
    expect(getProfileError(profiles)).toEqual(expect.objectContaining({
      type: ACTION_TYPE.GET_PROFILE_ERROR,
    }));
  });
  it('LOGIN Action', () => {
    const profiles = {};
    const freshProfile = editProfileAction(profiles, editProfile());
    expect(freshProfile).toMatchSnapshot();
  });
});
