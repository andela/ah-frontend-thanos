import React from 'react';
import { shallow, mount } from 'enzyme';
import { Footer, CreateImage } from '.';
import { sampleListOfArticles } from '../../commons/initialStates';

describe('Footer tests', () => {
  let wrapper;
  let toTop;

  beforeEach(() => {
    toTop = jest.fn();
    wrapper = mount(<Footer articles={sampleListOfArticles} toTop={toTop} />);
  });

  test('testing footer', () => {
    const footer = shallow(
      <Footer articles={sampleListOfArticles} />,
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
