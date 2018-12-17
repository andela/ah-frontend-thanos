import React from 'react';
import { mount } from 'enzyme';
import Search from '.';

describe('<Search /> component', () => {
  it('should render correctly', () => {
    const wrapper = mount(
      <Search onQueryChange={jest.fn()} onFocus={jest.fn()} />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
