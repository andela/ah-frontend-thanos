import React from 'react';
import { shallow } from 'enzyme';
import ArticleDisplay from '.';


describe('Test  pagination', () => {
  const article = {
    count: 44,
    title: 'hello',
    description: 'World',
    image_url: 'https://helloworld.png',
  };

  const ArticleDisplaywrapper = shallow(
    <ArticleDisplay article={article} />,
  );

  test('ArticleDisplay shpuld render corretly', () => {
    expect(ArticleDisplaywrapper.find('.article-card').length).toBe(1);
  });
});
