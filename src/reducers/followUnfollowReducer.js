import swal from 'sweetalert2';
import actionTypes from '../actions/actionTypes';
import { tempProfile } from '../commons/initialStates';

const initialState = {
  currentProfile: {
    username: '',
    bio: '',
    first_name: '',
    last_name: '',
    image: '',
    created_at: '',
    updated_at: '',
    isFollowee: false,
  },
  followersList: [],
  followeesList: [],
};

const toggleSwal = (state, action) => {
  swal(action.payload);
  return state;
};

const changeStateAfterFollow = (state, currentProfile, followersList, action, isFollowee) => ({
  ...state,
  currentProfile: { ...currentProfile, ...action.payload, isFollowee },
  followersList: isFollowee
    ? [...followersList, tempProfile]
    : followersList.filter(user => user.username !== localStorage.getItem('username')),
});

const changeStateAfterGettingFollowers = (state, action, currentProfile, follower, me) => ({
  ...state,
  currentProfile: {
    ...currentProfile,
    isFollowee: (follower.length > 0 && (follower[0].username === me)),
  },
  followersList: action.payload,
});

const followUnfollowReducer = (state = initialState, action) => {
  const { currentProfile, followersList } = state;
  const me = localStorage.getItem('username');
  switch (action.type) {
    case actionTypes.SHOW_USER_PROFILE:
      return { ...state, currentProfile: { ...currentProfile, ...action.payload } };
    case actionTypes.FOLLOW_USER:
      return changeStateAfterFollow(state, currentProfile, followersList, action, true);
    case actionTypes.UNFOLLOW_USER:
      return changeStateAfterFollow(state, currentProfile, followersList, action, false);
    case actionTypes.GET_FOLLOWERS: {
      const follower = action.payload.filter(user => user.username === me);
      return changeStateAfterGettingFollowers(state, action, currentProfile, follower, me);
    }
    case actionTypes.GET_FOLLOWEES:
      return { ...state, currentProfile: { ...currentProfile }, followeesList: action.payload };
    case actionTypes.SHOW_ERROR:
      return toggleSwal(state, action);
    default:
      return state;
  }
};

export default followUnfollowReducer;
