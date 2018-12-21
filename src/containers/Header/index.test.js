import React from 'react';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Router, MemoryRouter } from 'react-router-dom';
import { Header, mapDispatchToProps } from '.';
import initialState from '../../commons/initialStates';
import history from '../../commons/history';

describe('<Header /> component', () => {
  let store;
  let wrapper;
  let saveSearchQueryDispatch;
  let fetchSearchArticlesDispatch;
  let redirectTosearch;

  beforeEach(() => {
    const mockStore = configureMockStore([thunk]);
    store = mockStore(initialState);
    saveSearchQueryDispatch = jest.fn();
    fetchSearchArticlesDispatch = jest.fn();
    redirectTosearch = jest.fn();

    wrapper = mount(
      <Router history={history}>
        <Header
          store={store}
          history={history}
          saveSearchQueryDispatch={saveSearchQueryDispatch}
          fetchSearchArticlesDispatch={fetchSearchArticlesDispatch}
          redirectTosearch={redirectTosearch}
        />
      </Router>,
    );
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should save input values', () => {
    wrapper.find('input#search').simulate('change');
    expect(saveSearchQueryDispatch).toHaveBeenCalled();
  });

  it('should have a redirect to search-page method', () => {
    wrapper.find('input#search').simulate('focus');
    expect(redirectTosearch).toBeDefined();
  });

  it('should check for the presence of dispatch methods', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).saveSearchQueryDispatch({});
    mapDispatchToProps(dispatch).fetchSearchArticlesDispatch({});
    expect(dispatch.mock.calls[0][0]).toBeDefined();
    expect(dispatch.mock.calls[1][0]).toBeDefined();
  });

  it('should logout and clear localStorage', () => {
    localStorage.setItem('token', 'abc123abc');
    const wrapper2 = mount(
      <MemoryRouter>
        <Header
          history={history}
          saveSearchQueryDispatch={saveSearchQueryDispatch}
          fetchSearchArticlesDispatch={fetchSearchArticlesDispatch}
        />
      </MemoryRouter>,
    );
    wrapper2.find('button#btLogout').simulate('click');
    expect(localStorage.getItem('token')).toBeNull();
  });
});
