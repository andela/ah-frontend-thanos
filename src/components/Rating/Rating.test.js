import React from 'react';
import { shallow } from 'enzyme';
import { RatingDisplay, Rating } from './index';

describe('<RatingDisplay /> and <Rating />', () => {
  const article = { rating: { rating: 4 } };
  const RatingDisplayComponent = shallow(
    <RatingDisplay
      article={article}
      onChange={jest.fn()}
    />,
  );
  const RatingComponent = shallow(
    <Rating
      onChange={jest.fn()}
      onSubmit={jest.fn()}
    />,
  );
  test('renders the component', () => {
    expect(RatingDisplayComponent).toMatchSnapshot();
    expect(RatingComponent).toMatchSnapshot();
  });
  test('renders the component', () => {
    expect(RatingDisplayComponent.find('.rateDisplayTitle')).toHaveLength(1);
  });
});
