import React from 'react';
import UrlLink from '../link';

const Header = () => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <UrlLink link="" linkName="Home" />
        <UrlLink link="login" linkName="Login" />
        <UrlLink link="signup" linkName="Signup" />
      </ul>
    </div>
  </nav>
);

export default Header;
