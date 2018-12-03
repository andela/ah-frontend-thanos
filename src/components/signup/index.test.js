import React from 'react';
import { shallow } from 'enzyme';
import SignUp from '.';

describe('<SignUp />', () => {
  let signUpComponent;

  beforeEach(() => {
    signUpComponent = shallow(<SignUp onSubmit={() => true} onChange={() => true} />);
  });

  it('renders the component', () => {
    expect(signUpComponent).toMatchSnapshot();
  });
});
