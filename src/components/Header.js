import React from 'react';
import { NavLink } from 'react-router-dom';

class Header extends React.Component {
  render() {
    return (
      <header className="header">
        <div className="profile-img" />
        <ul>
          <li>
            <NavLink to="/discover" activeClassName="active">
              Discover
            </NavLink>
          </li>
          <li>
            <NavLink exact to="/" activeClassName="active">
              Library
            </NavLink>
          </li>
        </ul>
        <div className="search-icon" />
      </header>
    );
  }
}

export default Header;
