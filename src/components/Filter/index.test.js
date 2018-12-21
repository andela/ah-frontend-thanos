import React from 'react';
import { mount } from 'enzyme';
import Filter from '.';

describe('<Filter /> component', () => {
  it('should render correctly', () => {
    const wrapper = mount(
      <Filter searchQuery="test" onChange={jest.fn()} onClick={jest.fn()} />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
