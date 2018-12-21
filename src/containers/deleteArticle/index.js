import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteArticleThunk } from '../../actions/deleteArticleActions/deleteArticleAction';
import DeleteArticle from '../../components/deleteArticle';

class DeleteArticlePage extends Component {
    handleSubmit = (event) => {
      event.preventDefault();
      const { articleDelete, articleId } = this.props;
      articleDelete(articleId);
    }

    render() {
      return (
        <div>
          <DeleteArticle onClick={e => (this.handleSubmit(e))} />
        </div>
      );
    }
}

DeleteArticlePage.propTypes = {
  articleDelete: PropTypes.func.isRequired,
  articleId: PropTypes.number.isRequired,
};

const mapStateToProps = ({ deleteArticleReducer }) => ({ deleteArticleReducer });

export const mapDispatchToProps = dispatch => ({
  articleDelete: articleId => dispatch(deleteArticleThunk(articleId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DeleteArticlePage);
