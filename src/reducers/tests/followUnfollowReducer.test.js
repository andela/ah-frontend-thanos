import followUnfollowReducer from '../followUnfollowReducer';
import ACTION_TYPE from '../../actions/actionTypes';
import initialState, { tempProfile } from '../../commons/initialStates';

describe('Follow-Unfollow Reducer', () => {
  let userProfile;

  beforeEach(() => {
    userProfile = {
      username: 'janedoe',
      bio: 'Sample',
      first_name: 'Jane',
      last_name: 'Doe',
      image: 'https://picsum.photos/600',
      created_at: '10-12-2018',
      updated_at: '11-12-2018',
      isFollowee: false,
    };
  });

  it('should return the initial state', () => {
    expect(followUnfollowReducer(undefined, {})).toEqual(initialState.followUnfollowReducer);
  });

  it('should change state after showing a user profile', () => {
    const expectedState = {
      currentProfile: { ...userProfile },
      followersList: [],
      followeesList: [],
    };
    expect(
      followUnfollowReducer(initialState.followUnfollowReducer, {
        type: ACTION_TYPE.SHOW_USER_PROFILE,
        payload: userProfile,
      }),
    ).toEqual(expectedState);
  });

  it('should change state after following a user', () => {
    const expectedState = {
      currentProfile: { ...userProfile, isFollowee: true },
      followersList: [tempProfile],
      followeesList: [],
    };
    expect(
      followUnfollowReducer(initialState.followUnfollowReducer, {
        type: ACTION_TYPE.FOLLOW_USER,
        payload: userProfile,
      }),
    ).toEqual(expectedState);
  });

  it('should change state after Unfollowing a user', () => {
    const expectedState = {
      currentProfile: { ...userProfile, isFollowee: false },
      followersList: [],
      followeesList: [],
    };
    expect(
      followUnfollowReducer(initialState.followUnfollowReducer, {
        type: ACTION_TYPE.UNFOLLOW_USER,
        payload: userProfile,
      }),
    ).toEqual(expectedState);
  });

  it('should remove current user from state after Unfollowing a user', () => {
    const loggedInProfile = {
      username: localStorage.getItem('username'),
      bio: 'Sample bio',
      first_name: 'Jack',
      last_name: 'Katto',
      image: '',
      created_at: '10-11-2018',
      updated_at: '09-12-2018',
      isFollowee: false,
    };
    const initialStateWithFollower = {
      currentProfile: initialState.followUnfollowReducer.currentProfile,
      followersList: [loggedInProfile],
      followeesList: [],
    };
    const expectedState = {
      currentProfile: { ...userProfile, isFollowee: false },
      followersList: [],
      followeesList: [],
    };
    expect(
      followUnfollowReducer(initialStateWithFollower, {
        type: ACTION_TYPE.UNFOLLOW_USER,
        payload: userProfile,
      }),
    ).toEqual(expectedState);
  });

  it('should change state after viewing followers', () => {
    const expectedState = {
      currentProfile: { ...initialState.followUnfollowReducer.currentProfile },
      followersList: [userProfile],
      followeesList: [],
    };
    expect(
      followUnfollowReducer(initialState.followUnfollowReducer, {
        type: ACTION_TYPE.GET_FOLLOWERS,
        payload: [userProfile],
      }),
    ).toEqual(expectedState);
  });

  it('should change state after viewing followees', () => {
    const expectedState = {
      currentProfile: { ...initialState.followUnfollowReducer.currentProfile },
      followersList: [],
      followeesList: [userProfile],
    };
    expect(
      followUnfollowReducer(initialState.followUnfollowReducer, {
        type: ACTION_TYPE.GET_FOLLOWEES,
        payload: [userProfile],
      }),
    ).toEqual(expectedState);
  });

  it('should change state after viewing followees', () => {
    const expectedState = {
      currentProfile: { ...initialState.followUnfollowReducer.currentProfile },
      followersList: [],
      followeesList: [userProfile],
    };
    expect(
      followUnfollowReducer(initialState.followUnfollowReducer, {
        type: ACTION_TYPE.GET_FOLLOWEES,
        payload: [userProfile],
      }),
    ).toEqual(expectedState);
  });

  it('should not change state when errors are triggered', () => {
    const expectedState = initialState.followUnfollowReducer;
    expect(
      followUnfollowReducer(initialState.followUnfollowReducer, {
        type: ACTION_TYPE.SHOW_ERROR,
        payload: 'Error message',
      }),
    ).toEqual(expectedState);
  });
});
