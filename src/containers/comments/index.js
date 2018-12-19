import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { CommentsPage, CommentForm } from '../../components/comments';
import {
  AllComments, CommentInput, PostComment, LikeDislikeComment,
} from '../../actions/commentActions';
import '../../components/comments/comments.scss';

class Comments extends Component {
  componentDidMount() {
    const { getArticlecomments, match } = this.props;
    const { articleId } = match.params;
    getArticlecomments(articleId);
  }

  handleOnChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    const { commentInputFun, comments } = this.props;
    commentInputFun({ ...comments.commentInput, [name]: value });
  }

  handleComment = (event) => {
    event.preventDefault();
    const { comments: allComments, postComment, match } = this.props;
    const { articleId } = match.params;
    const data = {
      comments: { ...allComments.commentInput },
    };
    postComment(articleId, data);
  };

  handleLike = (data, commentId) => {
    const { match, likeDislikeComment } = this.props;
    const { articleId } = match.params;
    likeDislikeComment(articleId, commentId, { like_status: data });
  };

  render() {
    const { comments } = this.props;
    const token = localStorage.getItem('token');
    return (
      <div className="comment">
        {token ? (
          <CommentForm
            onChangeHandler={this.handleOnChange}
            onSubmitHandler={this.handleComment}
          />)
          : <span />
        }
        <div>
          {
            comments.getCommentData
              ? (
                <CommentsPage
                  comments={comments}
                  handleLikeDislike={this.handleLike}
                />
              )
              : <span />
          }
        </div>
      </div>
    );
  }
}
Comments.propTypes = {
  getArticlecomments: propTypes.func.isRequired,
  comments: propTypes.shape({}).isRequired,
  commentInputFun: propTypes.func.isRequired,
  postComment: propTypes.func.isRequired,
  match: propTypes.shape({}).isRequired,
  likeDislikeComment: propTypes.func.isRequired,
};

const mapStateToProps = ({ comments }) => (
  { comments }
);

const mapDispatchToProps = dispatch => (
  {
    getArticlecomments: articleId => dispatch(AllComments(articleId)),
    commentInputFun: data => dispatch(CommentInput(data)),
    postComment: (articleId, data) => dispatch(PostComment(articleId, data)),
    likeDislikeComment: (articleId, commentId, data) => dispatch(LikeDislikeComment(
      articleId, commentId, data,
    )),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
