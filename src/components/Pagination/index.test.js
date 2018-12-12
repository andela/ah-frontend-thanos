import React from 'react';
import { shallow } from 'enzyme';
import Pagination from '.';


describe('Test  pagination', () => {
  const article = {
    count: 35,
  };
  const pageNumber = '1';
  const Paginationwrapper = shallow(
    <Pagination article={article} pageNumber={pageNumber} />,
  );

  test('Snap shot pagination Component', () => {
    expect(Paginationwrapper).toMatchSnapshot();
  });
  test('Pagination should render correctly', () => {
    expect(Paginationwrapper.find('.active').length).toBe(1);
    expect(Paginationwrapper.find('.disabled').length).toBe(1);
  });
});
