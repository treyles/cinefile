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
              <h1>Discover</h1>
            </NavLink>
          </li>
          <li>
            <NavLink exact to="/" activeClassName="active-nav">
              <h1>Library</h1>
            </NavLink>
          </li>
        </ul>
        <Link to="/search">
          <div className="search-icon" />
        </Link>
      </header>
    );
  }
}

export default Header;
