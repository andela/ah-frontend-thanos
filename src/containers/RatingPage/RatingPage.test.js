import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import RatingPage, { mapDispatchToProps } from './index';


describe('<RatingPage />', () => {
  let RatingPageComponent;
  beforeEach(() => {
    const middlewares = [thunk];
    const mockStore = configureStore(middlewares);
    const props = { articleId: 1 };
    const initialState = {
      ratingReducer: { rating: 1 },
    };
    const store = mockStore(initialState);
    RatingPageComponent = mount(
      <RatingPage
        article={jest.fn()}
        store={store}
        articleId={props.articleId}
        ratingReducer={initialState.ratingReducer}
      />,
    );
  });

  it('should render the component', () => {
    expect(RatingPageComponent).toMatchSnapshot();
  });

  it('should dispatch a method to rating input', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).ratingData({});
    mapDispatchToProps(dispatch).ratingArticle({});
    mapDispatchToProps(dispatch).getRatingArticle({});
  });

  it('should submit user email and password without fail', () => {
    RatingPageComponent
      .find('input#rating1')
      .simulate('change', { target: { name: 'rating', value: 1 } });
    RatingPageComponent
      .find('form')
      .simulate('submit');
  });
});
