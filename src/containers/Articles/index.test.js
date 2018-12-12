import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mount, shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { Articles, mapStateToProps } from './index';

const homeRoute = '/';
const articlesRoute = '';
const singleArticle = {
  id: 1,
  title: 'something',
  description: 'train a dragon',
  image_url: 'http://www.artilce',
  tag_list: ['dog', 'cat'],
};
// const data = {
//   data: {
//     articles: { results: [singleArticle] },
//   },
// };

const matchTrue = { path: '/articles/page/1', params: { pageNumber: 1 } };
const matchFalse = { path: '/', params: { pageNumber: 0 } };

const ruotes = () => (
  <MemoryRouter>
    <Articles
      dispatch={jest.fn}
      match={matchTrue}
      data={{ articles: {}, count: 13 }}
    />
  </MemoryRouter>
);

describe('Rendering all articles', () => {
  it('it should return all articles', () => {
    mount(ruotes(articlesRoute));
  });
});

test('Test if the component has a handleComments function', () => {
  const middlewares = [thunk];
  const mockStore = configureStore(middlewares);
  const pageNumber = '1';
  const initialState = {};
  const store = mockStore(initialState);
  const data = { articles: { results: [singleArticle], count: 14 } };
  const data1 = { articles: { count: 0 }, errorMessage: 'NotFound' };
  const ArticleWrapper = shallow(<Articles
    dispatch={jest.fn}
    match={matchFalse}
    store={store}
    data={data}
  />);
  const Wrapper = shallow(<Articles
    dispatch={jest.fn}
    match={matchFalse}
    store={store}
    data={data1}
  />);
  const wrapper = ArticleWrapper.instance();
  wrapper.renderPage(data, matchFalse, pageNumber);
  wrapper.renderPage(data, matchTrue, pageNumber);
  Wrapper.instance().renderPage(data, matchTrue, pageNumber);
});

describe('Articles rendering on home', () => {
  it('it should render four articles', () => {
    mount(ruotes(homeRoute));
  });
});

describe('Article detail component', () => {
  it('should map state to props corrcetly', () => {
    const state = {
      articleReducer: {
        results: {
          title: 'training',
          body: 'training a dragon',
        },
      },
    };

    const expectedResult = {
      data: {
        results: { body: 'training a dragon', title: 'training' },
      },
    };
    const componetState = mapStateToProps(state);
    expect(componetState).toEqual(expectedResult);
  });
});
