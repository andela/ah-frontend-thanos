import React from 'react';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { SearchPage, mapDispatchToProps } from '.';
import initialState, { sampleListOfArticles } from '../../commons/initialStates';

describe('<SearchPage /> component', () => {
  let store;
  let wrapper;
  let updateFilterFieldDispatch;
  let fetchSearchArticlesDispatch;
  let mocker;

  beforeEach(() => {
    const mockStore = configureMockStore([thunk]);
    store = mockStore(initialState);
    updateFilterFieldDispatch = jest.fn();
    fetchSearchArticlesDispatch = jest.fn();
    mocker = jest.fn();

    wrapper = mount(
      <SearchPage
        store={store}
        updateFilterFieldDispatch={updateFilterFieldDispatch}
        fetchSearchArticlesDispatch={fetchSearchArticlesDispatch}
        searchQuery="test"
        searchArticles={sampleListOfArticles}
        title="title"
        tag="tag"
        author="jack"
      />,
    );
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render empty page with no search results', () => {
    wrapper.setProps({ searchArticles: [] });
    expect(wrapper).toMatchSnapshot();
  });

  it('should save input values', () => {
    wrapper.find('input#title').simulate('change');
    expect(updateFilterFieldDispatch).toHaveBeenCalled();
  });

  it('should apply filters', () => {
    wrapper.find('button#btFilter').simulate('click');
    expect(fetchSearchArticlesDispatch).toHaveBeenCalled();
  });

  test('mapDispatchToProps definitions', () => {
    mapDispatchToProps(mocker).updateFilterFieldDispatch({});
    mapDispatchToProps(mocker).fetchSearchArticlesDispatch({});
    expect(mocker.mock.calls[0][0]).toBeDefined();
    expect(mocker.mock.calls[1][0]).toBeDefined();
  });
});
