import React from 'react';
import ConfigureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { mount } from 'enzyme';
import { Tags } from '../viewTags';

const initialState = { tagsReducer: { tags: [] } };
const mockStore = ConfigureMockStore([thunk]);


it('should render correctly', () => {
  const wrapper = mount(<Tags
    dispatch={jest.fn}
    getTag={jest.fn}
    store={mockStore(initialState)}
  />);
  expect(wrapper).toMatchSnapshot();
});
