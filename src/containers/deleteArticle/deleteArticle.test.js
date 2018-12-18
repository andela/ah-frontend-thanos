import React from 'react';
import { mount, shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import DeleteArticlePage, { mapDispatchToProps } from './index';

describe('<CreateArticlePage />', () => {
  let DeleteArticlePageComponent;
  let wrapper;
  beforeEach(() => {
    jest.resetModules();
    const middlewares = [thunk];
    const mockStore = configureStore(middlewares);
    const initialState = { deleteArticleReducer: { articleDelete: { message: 'Article deleted succesfully' } } };
    const store = mockStore(initialState);
    const props = { articleId: 1 };
    DeleteArticlePageComponent = mount(
      <DeleteArticlePage article={jest.fn()} store={store} articleId={props.articleId} />,
    );
    wrapper = shallow(
      <DeleteArticlePage store={store} articleId={props.articleId} />,
    );
  });

  it('should render the component', () => {
    expect(DeleteArticlePageComponent).toMatchSnapshot();
  });

  it('should dispatch a method to get user input', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).articleDelete({});
  });

  test('Test function', () => {
    const event = { preventDefault: jest.fn() };
    expect(wrapper.dive().instance().handleSubmit(event));
  });

  it('should test user data without fail', () => {
    DeleteArticlePageComponent
      .find('button')
      .simulate('submit');
    DeleteArticlePageComponent
      .find('#delete-bt')
      .simulate('click');
  });
});
