import React from 'react';
import { shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import Home from '../Home';
import App from './index';

it('renders without crashing', () => {
  shallow(<App />);
});

it('should return app component for the root path', () => {
  const wrapper = shallow(
    <MemoryRouter initialEntries={['/']}>
      <Home />
    </MemoryRouter>,
  );
  expect(wrapper.find(Home)).toHaveLength(1);
});
