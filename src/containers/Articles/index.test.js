import React from 'react';
import { mount } from 'enzyme';
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

const ruotes = route => (
  <MemoryRouter>
    <Articles
      dispatch={jest.fn}
      match={{ path: route }}
      data={{ articles: [singleArticle] }}
    />
  </MemoryRouter>
);

describe('Rendering all articles', () => {
  it('it should return all articles', () => {
    mount(ruotes(articlesRoute));
  });
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
