import React from 'react';
import { shallow } from 'enzyme';
import NewPassword from './newPassword';
import PasswordReset from './index';

describe('<NewPassword />', () => {
  let newpasswordComponent;

  beforeEach(() => {
    newpasswordComponent = shallow(<NewPassword onChange={jest.fn()} onSubmit={jest.fn()} />);
  });

  it('renders the component', () => {
    expect(newpasswordComponent).toMatchSnapshot();
  });
});

describe('<PasswordReset />', () => {
  let newpasswordComponent;

  beforeEach(() => {
    newpasswordComponent = shallow(<PasswordReset />);
  });

  it('renders the component', () => {
    expect(newpasswordComponent).toMatchSnapshot();
  });
});
