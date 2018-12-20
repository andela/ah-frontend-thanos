import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  editArticleData, editArticleThunk, updateImageUrl, loadData,
} from '../../actions/editArticleActions/editArticleActions';
import EditArticle from '../../components/editArticle';

const widgetData = {
  cloud_name: 'author-s-haven',
  upload_preset: 'cwqbp3ae',
  cropping: true,
  folder: 'widgetdocs',
  sources: ['local', 'url', 'camera', 'facebook', 'dropbox', 'search', 'instagram'],
};

class EditArticlePage extends Component {
  componentWillMount() {
    const { loadEditData, article } = this.props;
    loadEditData({
      title: article.title,
      description: article.description,
      tag_list: article.tag_list,
      image_url: article.image_url,
      body: article.body,
    });
  }

  changeHandler = (event) => {
    event.preventDefault();
    const { editData, editArticleReducer } = this.props;
    const targetData = {
      ...editArticleReducer.articleEditData,
      [event.target.name]: event.target.value,
    };
    editData(targetData);
  }

  submitHandler = (event) => {
    event.preventDefault();
    const {
      editArticle,
      editArticleReducer,
      history,
      match,
    } = this.props;
    const { articleId } = match.params;
    editArticle(articleId, { ...editArticleReducer.articleEditData, tag_list: editArticleReducer.articleEditData.tag_list.split(', ') });
    history.push(`/article/${articleId}`);
  }

  OnClickHandler = () => {
    window.cloudinary.openUploadWidget(widgetData, (error, result) => {
      if (result.event === 'success') {
        const { updateImage } = this.props;
        updateImage(result.info.secure_url);
      }
    });
  }

  render() {
    const { article } = this.props;
    const editcomp = (onChange, onSubmit, onClick) => (
      <EditArticle
        onChange={onChange}
        onSubmit={onSubmit}
        onClick={onClick}
        article={article}
      />
    );
    return (
      <div>
        {editcomp(this.changeHandler, this.submitHandler, this.OnClickHandler)}
      </div>
    );
  }
}

EditArticlePage.propTypes = {
  match: PropTypes.shape({}).isRequired,
  editArticle: PropTypes.func.isRequired,
  editData: PropTypes.func.isRequired,
  editArticleReducer: PropTypes.shape({}).isRequired,
  updateImage: PropTypes.func.isRequired,
  article: PropTypes.shape({}).isRequired,
  loadEditData: PropTypes.func.isRequired,
  history: PropTypes.shape({}).isRequired,
};

const mapStateToProps = ({ editArticleReducer, articleReducer }) => ({
  editArticleReducer,
  article: articleReducer.article,
});

export const mapDispatchToProps = dispatch => ({
  editArticle: (articleId, data) => dispatch(editArticleThunk(articleId, data)),
  editData: response => dispatch(editArticleData(response)),
  updateImage: response => dispatch(updateImageUrl(response)),
  loadEditData: response => dispatch(loadData(response)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditArticlePage);
