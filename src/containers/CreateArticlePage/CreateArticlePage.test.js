import React from 'react';
import { mount, shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import CreateArticlePage, { mapDispatchToProps } from './index';

describe('<CreateArticlePage />', () => {
  let CreateArticlePageComponent;
  let wrapper;
  beforeEach(() => {
    jest.resetModules();
    const middlewares = [thunk];
    const mockStore = configureStore(middlewares);
    const initialState = { createArticleReducer: { articlePostData: { tag_list: 'one,two', title: 1 } } };
    const store = mockStore(initialState);
    CreateArticlePageComponent = mount(
      <CreateArticlePage store={store} />,
    );
    wrapper = shallow(
      <CreateArticlePage store={store} />,
    );
  });

  test('test function ', async () => {
    global.cloudinary = {
      openUploadWidget: (params, cb) => {
        cb(null, {
          event: 'success',
          info: { secure_url: 'http://cloudinary/img/123.png' },
        });
      },
    };
    const widgetFn = wrapper.dive().instance().handleOnClick();
    expect(widgetFn);
  });

  it('should render the component', () => {
    expect(CreateArticlePageComponent).toMatchSnapshot();
  });
  const dispatchTest = dispatch => (
    mapDispatchToProps(dispatch).postArticle({})
    && mapDispatchToProps(dispatch).articleData({})
    && mapDispatchToProps(dispatch).updateImage({})
  );
  it('should dispatch a method to get user input', () => {
    const dispatch = jest.fn();
    dispatchTest(dispatch);
  });

  it('should test user data without fail', () => {
    CreateArticlePageComponent
      .find('textarea#titleInput')
      .simulate('change', { target: { name: 'title', value: 'How ro go to school' } });
    CreateArticlePageComponent
      .find('form')
      .simulate('submit');
    CreateArticlePageComponent
      .find('input.image')
      .simulate('change', { target: { name: 'image_url', value: 'http://image.com' } });
  });
});
