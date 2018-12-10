/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import './CreateArticle.scss';
import * as PropTypes from 'prop-types';


const formInputs = (inputName, onChange, inputId, minLength, maxLength) => (
  <div className="form-group">
    <textarea className="form-control" minLength={minLength} maxLength={maxLength} name={inputName} onChange={onChange} id={inputId} rows="3" required />
  </div>
);

const Image = onClick => (
  <div className="col-lg-8 mt-2">
    <input type="file" className="image" name="image_url" onClick={onClick} />
  </div>
);

const CreateArticle = ({ onChange, onSubmit, onClick }) => (
  <div>
    <br />
    <h3 className="text-center createArticleTitle">Create Your Article</h3>
    <hr className="col-sm-8 " />
    <br />
    <div className="col-sm-10 offset-2 artcileCreate">
      <form className="create-article-form" onSubmit={onSubmit}>
        <h5>Title: </h5>
        <small>Title must be 130 characters maximum and 5 characters minimum</small>
        {formInputs('title', onChange, 'titleInput', '5', '130')}
        <h5>Description</h5>
        <small>Title must be 150 characters maximum and 100 characters minimum</small>
        {formInputs('description', onChange, 'descriptionInput', '100', '120')}

        <h5>Tag list</h5>
        {formInputs('tag_list', onChange, 'tag_listInput')}
        <br />
        <h5>Upload Image</h5>
        {Image(onClick)}
        <br />
        <h5>Body</h5>
        {formInputs('body', onChange, 'bodyInput')}
        <div className="signin-createArticleBt">
          <button
            type="submit"
            className="btn btn-primary"
            id="createArticleBt"
            name="createArticleBt"
          >
              Publish Article
          </button>
        </div>
      </form>
    </div>
  </div>
);

CreateArticle.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default CreateArticle;
