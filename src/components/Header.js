import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function Header({ count }) {
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
          {count > 0
            ? <span className="counter">
                {count}
              </span>
            : null}
        </li>
      </ul>
      <Link to="/search">
        <div className="search-icon" />
      </Link>
    </header>
  );
}

Header.propTypes = {
  count: PropTypes.number.isRequired
};
