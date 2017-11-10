import React from 'react';
import { NavLink, Link } from 'react-router-dom';

class Header extends React.Component {
  render() {
    return (
      <header className="header">
        <div className="profile-img" />
        <ul>
          <li>
            <NavLink to="/discover" activeClassName="active-nav">
              Discover
            </NavLink>
          </li>
          <li>
            <NavLink exact to="/" activeClassName="active-nav">
              Library
            </NavLink>
          </li>
        </ul>
        <NavLink to="/search" activeClassName="active-search">
          <div className="search-icon" />
        </NavLink>
      </header>
    );
  }
}

export default Header;
