import React from 'react';
import { shallow } from 'enzyme';
import UserProfile from '.';
import initialStates from '../../commons/initialStates';

describe('<UserProfile /> component', () => {
  let wrapper;

  beforeEach((() => {
    const { currentProfile } = initialStates.followUnfollowReducer;
    wrapper = shallow(
      <UserProfile
        currentProfile={currentProfile}
        onClick={jest.fn()}
        followersList={[currentProfile]}
        followeesList={[
          { ...currentProfile, image: 'https://picsum.photos/600' },
        ]}
      />,
    );
  }));

  it('renders UserProfile', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
