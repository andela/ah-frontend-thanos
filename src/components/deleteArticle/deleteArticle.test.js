import React from 'react';
import { shallow } from 'enzyme';
import DeleteArticle from './index';

describe('<DeleteArticle /> ', () => {
  const DeleteArticleComponent = shallow(
    <DeleteArticle
      onClick={jest.fn()}
    />,
  );
  test('renders the component', () => {
    expect(DeleteArticleComponent).toMatchSnapshot();
  });
});
