import { combineReducers } from 'redux';
import userReducer from './userReducer';
import loginReducer from './loginReducer/loginReducer';
import articleReducer from './articleReducer';
import socialLoginReducer from './socialLoginReducer';
import profileReducer from './profileReducer';
import comments from './commentReducers';
import ratingReducer from './ratingReducer/ratingReducer';
import createArticleReducer from './createArticleReducer/createArticleReducer';
import tagsReducer from './tagsReducer';
import followUnfollowReducer from './followUnfollowReducer';

const reducer = combineReducers({
  loginReducer,
  userReducer,
  articleReducer,
  socialLoginReducer,
  profileReducer,
  comments,
  ratingReducer,
  createArticleReducer,
  tagsReducer,
  followUnfollowReducer,
});

export default reducer;
