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
import searchReducer from './searchReducer';
import editArticleReducer from './editArticleReducer/editArticleReducer';
import deleteArticleReducer from './deleteArticleReducer/deleteArticleReducer';
import reportReducer from './reportReducer/reportReducer';

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
  searchReducer,
  editArticleReducer,
  deleteArticleReducer,
  reportReducer,
});

export default reducer;
