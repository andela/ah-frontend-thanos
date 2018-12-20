import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UrlLink from '../link';
import './Header.scss';

library.add(faSearch);
export const navDropDown = (link, displayName) => (
  <div>
    <div className="dropdown-divider" />
    <NavLink className="dropdown-item dropdown-single" to={link}>{displayName}</NavLink>
  </div>

);


const isLoggedIn = () => (localStorage.getItem('token'));

const Header = ({ history }) => (
  <div className="header">
    <nav className="navbar nav navbar-expand-lg navbar-light">
      <a className="navbar-brand logo" href="/">
        Author`s Haven
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarTogglerDemo02"
        aria-controls="navbarTogglerDemo02"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>

      <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
        <ul className="navbar-nav mr-auto mt-1 mt-lg-0 nav-1">
          <li className="nav-item dropdown">
            <NavLink className="nav-link dropdown-toggle" to="/ARTICLES" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              ARTICLES
            </NavLink>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              {navDropDown('/ARTICLES', 'All articles')}
              {navDropDown('/createArticle', 'Create Article')}
            </div>
          </li>
          <UrlLink link="/about" linkName="ABOUT" />
          <UrlLink link="/contact" linkName="CONTACT" />
        </ul>
        <div>
          {
            isLoggedIn()
              ? (
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0 nav-2">
                  <UrlLink link="/profile" linkName="PROFILE" />
                  <UrlLink
                    link="/logout"
                    linkName="LOGOUT"
                    id="logout"
                    onClick={() => {
                      localStorage.clear();
                      history.replace('/');
                    }}
                  />
                </ul>

              )
              : (
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0 nav-2">
                  <UrlLink link="/login" linkName="LOGIN" />
                  <UrlLink link="/signup" linkName="SIGN UP" />
                </ul>
              )
            }
          {/* <ul className="navbar-nav mr-auto mt-2 mt-lg-0 nav-2">
            <UrlLink link="/login" linkName="LOGIN" />
            <UrlLink link="/signup" linkName="SIGN UP" />
          </ul> */}

          <form className="form-inline my-2 my-lg-0 search-form">
            <input
              className="form-control search-box"
              type="search"
              placeholder="Search"
            />
            <div className="input-group-btn">
              <button className="btn btn-default search-bt" type="submit">
                <FontAwesomeIcon icon="search" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </nav>
  </div>
);
Header.propTypes = {
  history: PropTypes.shape({ replace: PropTypes.func }).isRequired,
};

export { Header };

export default withRouter(Header);
