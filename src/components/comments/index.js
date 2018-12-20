import React from 'react';
import propTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser, faCalendar,
} from '@fortawesome/free-solid-svg-icons';
import LikeDislike from '../LikeDislike';


export const CommentsPage = ({ comments, handleLikeDislike }) => {
  const getCommentItems = comments.getCommentData.results.map(comment => (
    <div key={comment.id}>
      <div className="card bg-light text-dark">
        <div className="card-body">
          <div className="card-title">
            <h6>
              <FontAwesomeIcon icon={faUser} />
              &ensp;
              {comment.comment_author.username}
              <small>
                &ensp; &ensp; &ensp;
                <FontAwesomeIcon icon={faCalendar} />
                &ensp;
                Created
                &ensp;
                {comment.created_at}
              </small>
            </h6>
          </div>
          <p className="card-text">{comment.comment_body}</p>
          <LikeDislike
            onLikeDislike={handleLikeDislike}
            likes={comment.likes}
            dislikes={comment.dislikes}
            commentId={comment.id}
          />
        </div>
      </div>
      <br />
    </div>
  ));
  return (
    <div className="col-sm-8 offset-2">
      <br />
      <div>{getCommentItems}</div>
    </div>
  );
};

CommentsPage.propTypes = {
  comments: propTypes.shape({}).isRequired,
  handleLikeDislike: propTypes.func.isRequired,
};

export const CommentForm = ({ onSubmitHandler, onChangeHandler }) => (
  <div className="col-sm-8 offset-2">
    <h3> Comments </h3>
    <br />
    <form onSubmit={onSubmitHandler}>
      <div className="form-group">
        <p>Write your comment :</p>
        <textarea
          className="form-control"
          rows="5"
          id="comment"
          name="comment_body"
          onChange={onChangeHandler}
          required
        />
      </div>
      <button type="submit" className="btn btn-dark offset-10">Submit</button>
    </form>
    <br />
    <br />
  </div>


);

CommentForm.propTypes = {
  onChangeHandler: propTypes.func.isRequired,
  onSubmitHandler: propTypes.func.isRequired,
};
