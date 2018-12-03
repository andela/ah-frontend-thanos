import expect from 'expect';
import store from './store';

describe('redux store', () => {
  it('contains the initial state', () => {
    const freshUser = { email: '', password: '', username: '' };
    expect(store.getState()).toEqual({ article: {}, user: { freshUser } });
  });
});
