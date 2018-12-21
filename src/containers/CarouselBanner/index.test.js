import React from 'react';
import { shallow } from 'enzyme';
import { CarouselBanner } from '.';
import { sampleListOfArticles } from '../../commons/initialStates';

describe('<CarouselBanner /> container', () => {
  let wrapper;
  let wrapper2;
  let articles;

  beforeEach(() => {
    articles = { results: sampleListOfArticles };
    wrapper = shallow(<CarouselBanner articles={articles} />);
    wrapper2 = shallow(<CarouselBanner articles={{ articles: {} }} />);
  });

  it('should render', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper2).toMatchSnapshot();
  });

  test('Test for a class in a wrapper', () => {
    expect(wrapper.find('.carousel-item')).toHaveLength(3);
  });

  test('Test for a class in a wrapper', () => {
    expect(wrapper.find('.active')).toHaveLength(2);
  });
});
