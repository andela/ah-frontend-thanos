import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { postArticleData, createArticleThunk, updateImageUrl } from '../../actions/createArticleActions';
import CreateArticle from '../../components/CreateArticle';


class CreateArticlePage extends Component {
  handleChange = (event) => {
    event.preventDefault();
    const { articleData, createArticleReducer } = this.props;
    articleData({
      ...createArticleReducer.articlePostData,
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { postArticle, createArticleReducer } = this.props;
    postArticle({
      ...createArticleReducer.articlePostData,
      tag_list: createArticleReducer.articlePostData.tag_list.split(', '),
    });
  }

  handleOnClick = () => {
    window.cloudinary.openUploadWidget({
      cloud_name: 'author-s-haven',
      upload_preset: 'cwqbp3ae',
      cropping: true,
      folder: 'widgetdocs',
      sources: ['local', 'url', 'camera', 'facebook', 'dropbox', 'search', 'instagram'],
    }, (error, result) => {
      if (result.event === 'success') {
        const { updateImage } = this.props;
        updateImage(result.info.secure_url);
      }
    });
  }

  render() {
    return (
      <div>
        <CreateArticle
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
          onClick={this.handleOnClick}
        />
      </div>
    );
  }
}

CreateArticlePage.propTypes = {
  postArticle: PropTypes.func.isRequired,
  articleData: PropTypes.func.isRequired,
  createArticleReducer: PropTypes.shape({}).isRequired,
  updateImage: PropTypes.func.isRequired,
};


const mapStateToProps = ({ createArticleReducer }) => ({ createArticleReducer });

export const mapDispatchToProps = dispatch => ({
  postArticle: response => dispatch(createArticleThunk(response)),
  articleData: response => dispatch(postArticleData(response)),
  updateImage: response => dispatch(updateImageUrl(response)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateArticlePage);
