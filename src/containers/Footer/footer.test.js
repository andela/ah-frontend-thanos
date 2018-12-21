import React from 'react';
import { shallow, mount } from 'enzyme';
import { Footer, CreateImage } from '.';
import { sampleListOfArticles } from '../../commons/initialStates';

describe('Footer tests', () => {
  let wrapper;
  let toTop;
  let articles;

  beforeEach(() => {
    toTop = jest.fn();
    articles = { results: sampleListOfArticles };
    wrapper = mount(<Footer articles={articles} toTop={toTop} />);
  });

  test('testing footer', () => {
    const footer = shallow(
      <Footer articles={articles} />,
    );
    expect(footer).toMatchSnapshot();
  });

  test('testing create image', () => {
    const createImageFooter = shallow(
      <CreateImage />,
    );
    expect(createImageFooter).toMatchSnapshot();
  });

  test('testing div', () => {
    expect(wrapper.find('.footer').hasClass('row'));
  });

  test('click go to top button', () => {
    const fakeEvent = jest.fn();
    const spy = jest.spyOn(wrapper.instance(), 'toTop');
    wrapper.instance().toTop(fakeEvent);
    expect(spy).toHaveBeenCalled();
  });
});
