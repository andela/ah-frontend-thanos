import React from 'react';
import { shallow } from 'enzyme';
import CreateArticle from './index';

describe('<CreateArticle /> ', () => {
  const CreateArticleComponent = shallow(
    <CreateArticle
      onChange={jest.fn()}
      onSubmit={jest.fn()}
      onClick={jest.fn()}
    />,
  );
  test('renders the component', () => {
    expect(CreateArticleComponent).toMatchSnapshot();
  });
});
