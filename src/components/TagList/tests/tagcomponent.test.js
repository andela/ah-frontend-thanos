import React from 'react';
import { shallow } from 'enzyme';
import TagList from '../TagList';

it('should render correctly', () => {
  const wrapper = shallow(
    <TagList />,
  );
  expect(wrapper).toMatchSnapshot();
});
