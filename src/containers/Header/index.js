import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import saveSearchQueryAction,
{ fetchSearchArticlesThunk } from '../../actions/searchActions';
import './Header.scss';
import Search from '../../components/Search';
import APP_URL from '../../utils/constants';
import navbarIcon, { navbarLinks, signupLoginLinks } from './navbarElements';
import UrlLink from '../../components/link';

export class Header extends Component {
  handleOnQueryChange = (event) => {
    const { saveSearchQueryDispatch, fetchSearchArticlesDispatch } = this.props;
    const { value } = event.target;
    const url = `${APP_URL}/articles`;
    saveSearchQueryDispatch(value);
    fetchSearchArticlesDispatch(`${url}?title=${value}`);
  }

  redirectTosearch = () => {
    const { history } = this.props;
    history.replace('/search');
  }

  logout = () => {
    localStorage.clear();
    window.location.replace('/login');
  }

  render() {
    const isLoggedIn = () => (localStorage.getItem('token'));
    return (
      <div className="header">
        <nav className="navbar nav navbar-expand-lg navbar-light">
          <a className="navbar-brand logo" href="/">Author`s Haven</a>
          {navbarIcon}
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            {navbarLinks}
            <div>
              {isLoggedIn() ? (
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0 nav-2">
                  <UrlLink link="/profile" linkName="PROFILE" />
                  <button type="button" id="btLogout" onClick={this.logout}>LOGOUT</button>
                </ul>
              ) : signupLoginLinks}
              <Search onQueryChange={this.handleOnQueryChange} onFocus={this.redirectTosearch} />
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

Header.propTypes = {
  saveSearchQueryDispatch: PropTypes.func.isRequired,
  fetchSearchArticlesDispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({}).isRequired,
};

const mapStateToProps = ({ searchReducer }) => ({
  searchArticles: searchReducer.searchArticles,
  searchQuery: searchReducer.searchQuery,
});
export const mapDispatchToProps = dispatch => ({
  saveSearchQueryDispatch: res => dispatch(saveSearchQueryAction(res)),
  fetchSearchArticlesDispatch: res => dispatch(fetchSearchArticlesThunk(res)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Header);
