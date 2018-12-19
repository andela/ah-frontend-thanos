import React from 'react';
import { shallow } from 'enzyme';
import { CommentForm, CommentsPage } from '.';

describe('<Article />', () => {
  const comments = {
    getCommentData: {
      results: [
        {
          id: 1,
          comment_body: 'This is a comment',
          comment_author:
            { id: 7, username: 'Sulaiman', email: 'sulaiman@andela.com' },
          created_at: '2018-12-10T05:23:51.342553Z',
          updated_at: '2018-12-10T05:23:51.342616Z',
          likes: 3,
          dislikes: 0,
        },
      ],
    },
  };

  test('should render correctly', () => {
    const wrapper = shallow(
      <CommentsPage comments={comments} handleLikeDislike={jest.fn()} />,
    );
    expect(wrapper).toMatchSnapshot();
  });
  test('should render correctly', () => {
    const wrapper = <CommentForm onSubmitHandler={jest.fn()} onChangeHandler={jest.fn()} />;
    const CommentWrapper = shallow(wrapper);
    expect(CommentWrapper.find('.col-sm-8').length).toBe(1);
    expect(CommentWrapper).toMatchSnapshot();
  });
});
