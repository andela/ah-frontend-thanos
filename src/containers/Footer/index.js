import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './index.scss';

export const CreateImage = article => (
  <div className="image-card" key={article.id}>
    <a href={`/article/${article.id}`} title={article.title}>
      <img src={article.image_url} alt="article image1" />
    </a>
  </div>
);

const renderFooterNavBar = onClick => (
  <div className="footer-bottom">
    <div className="copyright"><span>&copy; 2018 Authors Haven</span></div>
    <div className="go-to-top">
      <span><button type="button" className="btTop" id="btTop" onClick={onClick}>Top</button></span>
    </div>
    <div className="nav-bottom">
      <ul>
        <li><a href="/">HOME</a></li>
        <li><a href="/articles">ARTICLE</a></li>
        <li><a href="/contact">CONTACT</a></li>
      </ul>
    </div>
  </div>
);

export class Footer extends Component {
  toTop = () => {
    window.scrollTo(0, 0);
  };

  render() {
    const { articles } = this.props;
    return (
      <div className="footer">
        {articles && articles.length > 7 && (
          <div className="carousel">
            <div id="carouselExampleIndicatorsFooter" className="carousel slide" data-ride="carousel">
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <div className="row">{articles.slice(0, 8).map(article => CreateImage(article))}</div>
                </div>
              </div>
            </div>
          </div>
        )}
        {renderFooterNavBar(this.toTop)}
      </div>
    );
  }
}

Footer.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const mapStateToProps = ({ articleReducer }) => ({
  articles: articleReducer.articles,
});

export default connect(mapStateToProps)(Footer);
