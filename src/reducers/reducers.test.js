import expect from 'expect';
import user from './userReducer';
import article from './articleReducer';

describe('reducers', () => {
  it('should return the initial state for user reducer', () => {
    expect(user(undefined, {})).toEqual({
      freshUser: { email: '', password: '', username: '' },
    });
  });

  it('should return the initial state for articles reducer', () => {
    expect(article(undefined, {})).toEqual({});
  });
});
