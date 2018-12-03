import React from 'react';
import { shallow, mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import SignUpPageConnected, { mapDispatchToProps, SignUpPage } from './index';
import actionTypes from '../../actions/actionTypes';

describe('<SignUpPage />', () => {
  let signUpPageComponent;

  beforeEach(() => {
    const middlewares = [thunk];
    const mockStore = configureStore(middlewares);
    const initialState = { article: {}, user: { freshUser: { email: '', password: '', username: '' } } };
    const store = mockStore(initialState);
    signUpPageComponent = shallow(<SignUpPageConnected store={store} />);
  });

  it('should render the component', () => {
    expect(signUpPageComponent).toMatchSnapshot();
  });

  it('should dispatch a method to get user input', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).getUserInputs({});
    expect(dispatch.mock.calls[0][0]).toEqual({ payload: {}, type: actionTypes.GET_USER_INPUT });
    mapDispatchToProps(dispatch).signUpuser({});
  });

  it('should call signup user method', () => {
    const signUpuser = jest.fn();
    const wrapper = mount(
      <SignUpPage signUpuser={signUpuser} freshUser={{}} getUserInputs={jest.fn()} />,
    );
    wrapper.find('form').simulate('submit');
    expect(signUpuser).toHaveBeenCalled();
  });

  it('should call handle input user method', () => {
    const getUserInputs = jest.fn();
    const wrapper = mount(
      <SignUpPage signUpuser={jest.fn()} freshUser={{}} getUserInputs={getUserInputs} />,
    );
    wrapper.find('input#username').simulate('change');
    expect(getUserInputs).toHaveBeenCalled();
  });
});
