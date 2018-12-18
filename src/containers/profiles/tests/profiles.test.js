import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import EditProfileConnected, { EditProfilePage } from '../editProfile';
import EditProfile from '../../../components/Profile/editProfile';
import ProfileConnected, { Profile } from '../profiles';

Enzyme.configure({ adapter: new Adapter() });
const storeFake = state => ({
  default: jest.fn(),
  subscribe: jest.fn(),
  dispatch: jest.fn(),
  getState: () => state,
});


describe('profile container', () => {
  let wrapper;
  let component;
  let container;

  beforeEach(() => {
    jest.resetAllMocks();
    const store = storeFake({ profile: { username: 'test' } });

    wrapper = mount(
      <Provider store={store}>
        <EditProfilePage />
      </Provider>,
    );

    container = wrapper.find(EditProfilePage);
    component = wrapper.find(EditProfile);
  });

  it('should render both the container and the component ', () => {
    expect(container.length).toBeTruthy();
    expect(component.length).toBeTruthy();
  });
  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe('Test Profile container', () => {
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
    const wrappers = mount(<ProfileConnected store={mockStore(initialState)} match={match} />);
    expect(wrappers).toMatchSnapshot();
  });
  it('renders the container', () => {
    const { match } = props;
    const wrappers = mount(<EditProfileConnected store={mockStore(initialState)} match={match} />);
    expect(wrappers).toMatchSnapshot();
  });
});

describe('Profile component', () => {
  let wrapper;
  const getProfileAction = jest.fn();
  const nextProps = {
    isLoggedIn: true,
    profilePayload: { followers: ['user2'], following: ['user2'] },
  };
  const props = {
    history: { push: jest.fn() },
  };

  beforeEach(() => {
    const dispatch = jest.fn();
    wrapper = shallow(
      <Profile
        getProfileAction={getProfileAction}
        dispatch={dispatch}
        {...props}
      />,
    );
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  // it('should call componentDidMount on rendering', () => {
  //   expect(getProfileAction).toBeCalled();
  // });

  it('should not redirect if isLoggedIn is false', () => {
    wrapper.setProps({ ...nextProps });
    expect(props.history.push).toBeCalledTimes(0);
  });

  it('should redirect to login page if user is not authenticated', () => {
    wrapper.setProps({ isLoggedIn: false });
    expect(props.history.push).toBeCalledWith('/login');
  });
});
