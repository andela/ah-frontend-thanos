import React from 'react';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { FollowUnfollow, mapDispatchToProps } from '.';
import initialState from '../../commons/initialStates';

const testDispatchMethod = (dispatch) => {
  expect(dispatch.mock.calls[0][0]).toBeDefined();
};

describe('<FollowUnfollow /> container', () => {
  let wrapper;
  let store;
  let followDispatch;
  let unfollowDispatch;
  let dispatch;

  beforeEach(() => {
    const mockStore = configureMockStore([thunk]);
    store = mockStore(initialState);
    const { currentProfile } = initialState.followUnfollowReducer;
    followDispatch = jest.fn();
    unfollowDispatch = jest.fn();
    dispatch = jest.fn();

    wrapper = mount(
      <FollowUnfollow
        store={store}
        currentProfile={currentProfile}
        match={{ params: { urlObject: { username: 'janedoe' } } }}
        getProfileDispatch={jest.fn()}
        getFollowProfilesDispatch={jest.fn()}
        followDispatch={followDispatch}
        unfollowDispatch={unfollowDispatch}
        followersList={[currentProfile]}
        followeesList={[{
          ...currentProfile, image: 'https://picsum.photos/600',
        }]}
      />,
    );
  });

  it('should render <FollowUnfollow /> container', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('triggers handleFollowUnfollow method', () => {
    wrapper.find('button#bt-follow').simulate('click');
    expect(followDispatch).toHaveBeenCalled();

    const fakeEvent = { unfollowDispatch: () => null };
    const spy = jest.spyOn(wrapper.instance(), 'handleFollowUnfollow');
    wrapper.instance().handleFollowUnfollow(fakeEvent);
    expect(spy).toHaveBeenCalled();
  });

  it('should trigger follow dispatch method', () => {
    mapDispatchToProps(dispatch).followDispatch({});
    testDispatchMethod(dispatch);
  });

  it('should trigger unfollow dispatch method', () => {
    mapDispatchToProps(dispatch).unfollowDispatch({});
    testDispatchMethod(dispatch);
  });

  it('should trigger get profile dispatch method', () => {
    mapDispatchToProps(dispatch).getProfileDispatch({});
    testDispatchMethod(dispatch);
  });

  it('should trigger get followers dispatch method', () => {
    mapDispatchToProps(dispatch).getFollowProfilesDispatch({});
    testDispatchMethod(dispatch);
  });
});
