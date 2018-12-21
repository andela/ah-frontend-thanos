import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchArticlesThunk from '../../actions/articleActions';
import ArticleDisplay from '../../components/Articles';
import Pagination from '../../components/Pagination';
import '../../components/Articles/Articles.scss';
import './Articles.scss';

export class Articles extends Component {
  componentDidMount() {
    const { dispatch, match } = this.props;
    const { pageNumber } = match.params;
    if (pageNumber) {
      dispatch(fetchArticlesThunk(pageNumber));
    } else {
      dispatch(fetchArticlesThunk(1));
    }
  }

  renderPage = (data, match, pageNumber) => (
    <div>
      {match.path !== '/' ? (
        <div>
          <div className="row">
            {data.articles.results.map(article => (
              <ArticleDisplay article={article} key={article.id} />
            ))}
          </div>
          {data.articles.count > 12
            ? <Pagination article={data.articles} pageNumber={pageNumber} /> : <div />}
        </div>)
        : (
          <div className="row">
            {data.articles.results
              .slice(0, 4).map(article => (
                <ArticleDisplay article={article} key={article.id} />))}
          </div>)}
    </div>
  )

  render() {
    const { data } = this.props;
    const { match } = this.props;
    const { pageNumber } = match.params;
    return (
      <div>
        {data.articles.results ? (
          <div className="articles-body">
            {this.renderPage(data, match, pageNumber)}
          </div>)
          : (
            <div className="row">
              {data.errorMessage ? (
                <div className="NotFound text-center  col-sm-12">
                  <h1>Invalid Page</h1>
                  <small>Error This page was not found</small>
                </div>)
                : (
                  <div id="preloader">
                    <div id="loader" />
                  </div>)}
            </div>)}
      </div>);
  }
}

Articles.propTypes = {
  data: PropTypes.shape({}).isRequired,
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }).isRequired,
};
export const mapStateToProps = state => ({ data: state.articleReducer });
export default connect(mapStateToProps)(Articles);
