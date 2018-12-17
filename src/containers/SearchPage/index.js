import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ArticleDisplay from '../../components/Articles';
import Filter from '../../components/Filter';
import { updateFilterFieldAction, fetchSearchArticlesThunk } from '../../actions/searchActions';
import APP_URL from '../../utils/constants';

export class SearchPage extends Component {
  handleOnFilterFieldChange = (event) => {
    const { name, value } = event.target;
    const { updateFilterFieldDispatch } = this.props;
    updateFilterFieldDispatch({ [name]: value });
  }

  handleApplyFilters = () => {
    const {
      title, tag, author, fetchSearchArticlesDispatch,
    } = this.props;
    const url = `${APP_URL}/articles?title=${title}&tag=${tag}&author=${author}`;
    fetchSearchArticlesDispatch(url);
  }

  render() {
    const { searchArticles, searchQuery } = this.props;
    const renderFilter = () => (
      <Filter
        searchQuery={searchQuery}
        onChange={this.handleOnFilterFieldChange}
        onClick={this.handleApplyFilters}
      />
    );
    return (
      searchArticles.length > 0
        ? (
          <div className="articles-body">
            {renderFilter()}
            {searchArticles.map(article => (
              <ArticleDisplay article={article} key={article.id} />
            ))}
          </div>
        )
        : (
          <div className="container large-bottom mt-4 text-center">
            {renderFilter()}
            <h4 className="mt-5">No results found</h4>
          </div>
        )
    );
  }
}

SearchPage.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  searchArticles: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  updateFilterFieldDispatch: PropTypes.func.isRequired,
  fetchSearchArticlesDispatch: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
};

const mapStateToProps = ({ searchReducer }) => ({
  searchArticles: searchReducer.searchArticles,
  searchQuery: searchReducer.searchQuery,
  title: searchReducer.title,
  tag: searchReducer.tag,
  author: searchReducer.author,
});

export const mapDispatchToProps = dispatch => ({
  updateFilterFieldDispatch: res => dispatch(updateFilterFieldAction(res)),
  fetchSearchArticlesDispatch: res => dispatch(fetchSearchArticlesThunk(res)),
});
export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
