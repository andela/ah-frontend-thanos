import React from 'react';
import { mount } from 'enzyme';
import { CarouselBanner } from '.';
import { sampleListOfArticles } from '../../commons/initialStates';

describe('<CarouselBanner /> container', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<CarouselBanner articles={sampleListOfArticles} />);
  });

  it('should render', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
