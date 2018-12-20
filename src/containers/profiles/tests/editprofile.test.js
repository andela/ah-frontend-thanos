import React from 'react';
import { mount, shallow } from 'enzyme';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import EditProfile from '../../../components/Profile/editProfile';
import EditProfileConnected, { EditProfilePage, mapDispatchToProps } from '../editProfile';


describe('Test  Edit Profile container', () => {
  let props;
  let initialState;
  let mockStore;

  beforeEach(() => {
    props = {
      match: { params: { username: 'testUser' } },
      getProfileDispatch: jest.fn(),
    };
    initialState = { profileReducer: { profile: { isLoggedIn: true } } };
    mockStore = configureStore([thunk]);
  });

  it('renders the container', () => {
    const { match } = props;
    const wrappers = mount(<EditProfileConnected
      store={mockStore(initialState)}
      match={match}
      userProfile={{}}
    />);
    expect(wrappers).toMatchSnapshot();
  });
  it('should trigger handle input method', () => {
    const getUserInputs = jest.fn();
    const wrapper = mount(
      <EditProfilePage
        userProfile={{}}
        getUserInputs={getUserInputs}
        store={mockStore(initialState)}
      />,
    );
    wrapper.instance().handleUpdateFields({ target: { last_name: 'username', value: 'rachael' } });
    expect(getUserInputs).toHaveBeenCalled();
  });
  it('should trigger handle submit  method', () => {
    const editProfileDispatch = jest.fn();
    const wrapper = mount(
      <EditProfilePage
        userProfile={{}}
        editProfileDispatch={editProfileDispatch}
        store={mockStore(initialState)}
      />,
    );
    wrapper.find('form').simulate('submit');
    expect(editProfileDispatch).toHaveBeenCalled();
  });

  it('should check for dispatch', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).editProfileDispatch({});
    expect(dispatch.mock.calls[0][0]).toBeDefined();
  });
  it('should check for  input dispatch', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).getUserInputs({});
    expect(dispatch.mock.calls[0][0]).toBeDefined();
  });
  it('renders the container', () => {
    const wrappers = shallow(
      <EditProfile
        onChange={jest.fn()}
        onsubmit={jest.fn()}
        onClick={jest.fn()}
        userProfile={{}}
      />,
    );
    expect(wrappers).toMatchSnapshot();
  });

  test('handleUpload throws an error if close is not defined', () => {
    const wrapper = shallow(
      <EditProfilePage
        editProfileDispatch={jest.fn()}
        getUserInputs={jest.fn()}
        userProfile={{}}
      />,
    );

    global.cloudinary = {
      openUploadWidget(propsObj, callback) {
        // make the callback asynchronous
        setTimeout(callback(null, { event: 'success', info: { secure_url: 'some-url' } }), 0);
        return { close: jest.fn() };
      },
    };

    expect(() => wrapper.instance().handleUpload()).toThrow();
  });
});
