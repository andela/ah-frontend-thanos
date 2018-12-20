import swal from 'sweetalert2';
import swalMessages from '../actions/swalAlerts';
import actionTypes from '../actions/actionTypes';


const initialState = {
  profile: {
    first_name: '',
    last_name: '',
    bio: '',
    image: '',
    isLoggedIn: false,
  },
};
const profileReducer = (state = initialState, action) => {
  const { profile } = state;
  switch (action.type) {
    case actionTypes.GET_PROFILE_SUCCESS:
      return {
        ...state,
        profile: {
          ...profile,
          ...action.payload,
          isLoggedIn: true,
        },
      };
    case actionTypes.EDIT_PROFILE:
      return {
        ...state,
        profile: { ...profile, ...action.payload },
      };
    case actionTypes.GET_PROFILE_ERROR:
      swal({ ...swalMessages.PROFILE_ERROR });
      window.location.replace('/');
      return { ...state, profile: action.profile };
    default:
      return state;
  }
};
export default profileReducer;
