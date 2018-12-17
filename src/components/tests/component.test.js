import { shallow } from 'enzyme';
import React from 'react';
import Home from '../Home';
import { Header } from '../../containers/Header';
import UrlLink from '../link';
import ViewProfile from '../Profile/viewProfile';
import EditProfile from '../Profile/editProfile';

describe('>>> Shallow Render REACT COMPONENTS', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Home />);
    wrapper = shallow(<ViewProfile followersList={[]} followeesList={[]} />);
    wrapper = shallow(<EditProfile />);
    wrapper = shallow(
      <Header
        dispatch={jest.fn()}
        history={{}}
        saveSearchQueryDispatch={jest.fn()}
        fetchSearchArticlesDispatch={jest.fn()}
      />,
    );
    wrapper = shallow(<UrlLink />);
  });

  it('+++ render the DUMB component', () => {
    expect(wrapper.length).toEqual(1);
  });
});
