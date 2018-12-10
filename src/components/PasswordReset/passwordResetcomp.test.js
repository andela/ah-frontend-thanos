import React from 'react';
import { shallow } from 'enzyme';
import NewPassword from './newPassword';
import PasswordReset from './index';

describe('<NewPassword /> and <PasswordReset />', () => {
  let wrapper;
  let newpasswordComponent;

  beforeEach(() => {
    wrapper = shallow(<NewPassword onChange={jest.fn()} onSubmit={jest.fn()} />);
    newpasswordComponent = shallow(
      <PasswordReset handleChange={jest.fn()} handleSubmit={jest.fn()} />,
    );
  });
  it('should not fail while rendering', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('should render correctly', () => {
    expect(newpasswordComponent).toMatchSnapshot();
  });
});
