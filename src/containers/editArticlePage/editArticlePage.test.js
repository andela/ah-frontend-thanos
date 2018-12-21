import React from 'react';
import { mount, shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import EditArticlePage, { mapDispatchToProps } from './index';

describe('<CreateArticlePage />', () => {
  let EditArticlePageComponent;
  let wrapper;
  beforeEach(() => {
    jest.resetModules();
    const middlewares = [thunk];
    const mockStore = configureStore(middlewares);
    const props = { articleId: 1 };
    const initialState = { editArticleReducer: { articleEditData: { tag_list: 'one,two', title: 1 } }, articleReducer: { article: 'good work' } };
    const store = mockStore(initialState);
    const historyMock = { push: jest.fn() };
    EditArticlePageComponent = mount(
      <EditArticlePage
        store={store}
        articleId={props.articleId}
        history={historyMock}
        match={{ params: { id: 1 } }}
      />,
    );
    wrapper = shallow(
      <EditArticlePage store={store} articleId={props.articleId} />,
    );
  });
  test('test cloudinary function ', async () => {
    global.cloudinary = {
      openUploadWidget: (params, cb) => {
        cb(null, {
          event: 'success',
          info: { secure_url: 'http://cloudinary/img/123.png' },
        });
      },
    };
    const widgetFn = wrapper.dive().instance().OnClickHandler();
    expect(widgetFn);
  });

  it('should render the component', () => {
    expect(EditArticlePageComponent).toMatchSnapshot();
  });
  const dispatchTest = dispatch => (
    mapDispatchToProps(dispatch).editArticle({})
    && mapDispatchToProps(dispatch).editData({})
    && mapDispatchToProps(dispatch).updateImage({})
    && mapDispatchToProps(dispatch).loadEditData({})
  );
  it('should dispatch a method to get user input', () => {
    const dispatch = jest.fn();
    dispatchTest(dispatch);
  });

  it('should test user data without fail', () => {
    const targetData = (nameData, valueData) => (
      { target: { name: nameData, value: valueData } }
    );
    EditArticlePageComponent
      .find('textarea#titleInput')
      .simulate('change', targetData('title', 'How ro go to school'));
    EditArticlePageComponent
      .find('form')
      .simulate('submit');
    EditArticlePageComponent
      .find('input.image')
      .simulate('change', targetData('image_url', 'http://image.com'));
  });
});
