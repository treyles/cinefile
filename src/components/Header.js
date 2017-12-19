import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function Header(
  { count, toggleSearchButton, isSearchActive }
) {
  return (
    <header className="header">
      <div className="profile-img" />
      <ul>
        <li>
          <NavLink
            to="/discover"
            activeClassName="active-nav"
            onClick={() => toggleSearchButton(true)}
          >
            <h1>Discover</h1>
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/" activeClassName="active-nav">
            <h1>Library</h1>
          </NavLink>
          {count > 0 && <span className="counter">{count}</span>}
        </li>
      </ul>
      <Link to="/" onClick={() => toggleSearchButton()}>
        <div className={`search-icon ${isSearchActive ? 'active' : ''}`} />
      </Link>
    </header>
  );
}

Header.propTypes = {
  count: PropTypes.number.isRequired,
  toggleSearchButton: PropTypes.func.isRequired,
  isSearchActive: PropTypes.bool.isRequired
};
