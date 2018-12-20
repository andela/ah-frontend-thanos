import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Article from '../../components/Article';
import { likeDislikeArticleThunk } from '../../actions/likedislikeActions';
import { getArticleThunk, getLikeStatusThunk } from '../../actions/articleActions';
import Comments from '../comments';

export class ArticlePage extends Component {
  componentDidMount() {
    const token = localStorage.getItem('token');

    // get the id from the URl and pass it to a thunk action
    const { getArticleDispatch, getLikeDislikeStatusDispatch, match } = this.props;
    const { articleId } = match.params;
    getLikeDislikeStatusDispatch({ articleId, token });
    getArticleDispatch(articleId);
  }

  handleOnClick = () => {
    const { history, match } = this.props;
    const { articleId } = match.params;
    history.push(`/editarticle/${articleId}`);
  }

  handleLikeDislike = (option) => {
    const { likeDislikeArticleDispatch, article, match } = this.props;
    const { likeDislikeStatus } = article;

    likeDislikeArticleDispatch({
      like_status: option,
      articleId: match.params.articleId,
      token: localStorage.getItem('token'),
      likeDislikeStatus,
    });
  }

  render() {
    const { article, match } = this.props;
    return (
      <div>
        <Article
          onLikeDislike={this.handleLikeDislike}
          article={article}
          onClick={this.handleOnClick}
        />
        <hr />
        <br />
        {article.id
          ? <Comments match={match} />
          : <div />
        }
      </div>
    );
  }
}

ArticlePage.propTypes = {
  match: PropTypes.shape({}).isRequired,
  likeDislikeArticleDispatch: PropTypes.func.isRequired,
  getArticleDispatch: PropTypes.func.isRequired,
  getLikeDislikeStatusDispatch: PropTypes.func.isRequired,
  article: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({}).isRequired,
};

const mapStateToProps = ({ articleReducer }) => ({
  article: articleReducer.article,
});
export const mapDispatchToProps = dispatch => ({
  getArticleDispatch: articleId => dispatch(getArticleThunk(articleId)),
  getLikeDislikeStatusDispatch: likeObj => dispatch(getLikeStatusThunk(likeObj)),
  likeDislikeArticleDispatch: likeObj => dispatch(likeDislikeArticleThunk(likeObj)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ArticlePage);
