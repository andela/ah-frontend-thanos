import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Comments from './index';

describe('<SignUpPage />', () => {
  const props = {
    match: { params: { articleId: 1 } },
  };
  const middlewares = [thunk];
  const mockStore = configureStore(middlewares);
  const initialState = { comments: {} };
  const store = mockStore(initialState);
  const CommentWrapper = shallow(<Comments store={store} match={props.match} />);

  const wrapper = CommentWrapper.dive().instance();
  const event = {
    preventDefault: () => { },
    target: () => { },
  };

  it('should render the component', () => {
    expect(CommentWrapper).toMatchSnapshot();
  });

  test('Test if the component has a handleComments function', () => {
    wrapper.handleComment(event);
  });

  test('Test if the component has a handleOnChange function', () => {
    wrapper.handleOnChange(event);
  });

  test('Test if the component has a handleOnChange function', () => {
    wrapper.handleLike({ like_status: 'like' }, 12);
  });
});
