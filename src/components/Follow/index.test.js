import React from 'react';
import { shallow } from 'enzyme';
import Follow from '.';

describe('<Follow /> component', () => {
  it('renders the Follow component', () => {
    const wrapper = shallow(<Follow onClick={jest.fn()} option />);
    expect(wrapper).toMatchSnapshot();
  });
});
