import expect from 'expect';
import combinedReducers from '..';
import userReducer from '../userReducer';
import articleReducer from '../articleReducer';
import tagsReducer from '../tagsReducer';
import socialLoginReducer from '../socialLoginReducer';
import initialState from '../../commons/initialStates';
import ACTION_TYPE from '../../actions/actionTypes';


const TagsinitialState = { tags: [] };
describe('post reducer', () => {
  it('should return the initial state', () => {
    expect(combinedReducers(undefined, {})).toEqual(initialState);
  });

  it('should return the initial state', () => {
    expect(combinedReducers(undefined, {})).toEqual(initialState);
  });

  it('should return the initial state for user reducer', () => {
    expect(userReducer(undefined, {})).toEqual(initialState.userReducer);
  });

  it('should return the initial state for articles reducer', () => {
    expect(articleReducer(undefined, {})).toEqual(initialState.articleReducer);
  });
});

describe('post reducer', () => {
  it('should handle EDIT_PROFILE', () => {
    const startAction = {
      type: ACTION_TYPE.EDIT_PROFILE,
    };
    expect(combinedReducers(undefined, startAction)).toEqual(initialState);
  });

  it('should return the initial state for tags reducer', () => {
    expect(tagsReducer(undefined, {})).toEqual(TagsinitialState);
  });
  it('should return the initial state for social login reducer', () => {
    expect(socialLoginReducer(undefined, {})).toEqual(initialState.socialLoginReducer);
  });
});
