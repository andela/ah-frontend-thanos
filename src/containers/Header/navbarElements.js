import React from 'react';
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

export const navbarLinks = (
  <ul className="navbar-nav mr-auto mt-1 mt-lg-0 nav-1">
    <UrlLink link="/articles" linkName="ARTICLES" />
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
