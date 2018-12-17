import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import Login from '../../components/Login';
import { LoginPage, mapDispatchToProps } from './index';

let mockStore = configureMockStore([thunk]);
let store = mockStore({});

describe('<Login />', () => {
  test('renders the component', () => {
    mockStore = configureMockStore([thunk]);
    store = mockStore({});
    const LoginComponent = shallow(
      <Provider store={store}>
        <Login onChange={jest.fn()} onSubmit={jest.fn()} />
      </Provider>,
    );
    expect(LoginComponent).toMatchSnapshot();
  });
});

describe('testing dispatch', () => {
  it('should dispatch a method to get user input', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).loginUser({});
  });
});

describe('tesing login container', () => {
  mockStore = configureMockStore([thunk]);
  store = mockStore({});
  const wrapper = shallow(<Provider store={store}><LoginPage /></Provider>);
  it('should mount view all component', () => {
    expect(wrapper.find(LoginPage)).toHaveLength(1);
  });
});

describe('handle Invoke email for password reset', () => {
  const initialState = {
    socialLoginReducer: { isLoggedIn: false },
    loginReducer: { loginUser: {} },
  };

  mockStore = configureMockStore([thunk]);
  store = mockStore(initialState);
  const wrapper = shallow(<LoginPage />);
  wrapper.setProps({ loginUser: jest.fn() });
  const fakeEventReturn = { target: { id: 1, value: 'some val' } };
  const fakeEvent = { preventDefault: () => fakeEventReturn };
  const spy = jest.spyOn(wrapper.instance(), 'handleSubmit');
  wrapper.instance().handleSubmit(fakeEvent);
  expect(spy).toHaveBeenCalled();

  it('handles change', () => {
    wrapper.instance().handleChange({ target: { id: 'email', value: 'richard@gmail.com' } });
    expect(wrapper.state('email')).toBe('richard@gmail.com');
  });

  it('should check for the presence of dispatch methods', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).loginUser({});
    expect(dispatch.mock.calls[0][0]).toBeDefined();
  });
});
