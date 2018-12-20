import React from 'react';
import { NavLink } from 'react-router-dom';
import UrlLink from '../../components/link';

const navbarIcon = (
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
);

export const navDropDown = (link, displayName) => (
  <div>
    <div className="dropdown-divider" />
    <NavLink className="dropdown-item dropdown-single" to={link}>{displayName}</NavLink>
  </div>

);

export const navbarLinks = (
  <ul className="navbar-nav mr-auto mt-1 mt-lg-0 nav-1">
    <li className="nav-item dropdown">
      <NavLink
        className="nav-link dropdown-toggle"
        to="/articles"
        id="navbarDropdown"
        role="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        ARTICLES
      </NavLink>
      <div className="dropdown-menu" aria-labelledby="navbarDropdown">
        {navDropDown('/articles', 'All articles')}
        {navDropDown('/createarticle', 'Create Article')}
      </div>
    </li>
    <UrlLink link="/about" linkName="ABOUT" />
    <UrlLink link="/contact" linkName="CONTACT" />
  </ul>
);

export const signupLoginLinks = (
  <ul className="navbar-nav mr-auto mt-2 mt-lg-0 nav-2">
    <UrlLink link="/login" linkName="LOGIN" />
    <UrlLink link="/signup" linkName="SIGN UP" />
  </ul>
);

export default navbarIcon;
