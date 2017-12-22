import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import firebase from 'firebase';

// TODO: clean up onClick
export default function Header(
  { count, toggleSearchButton, isSearchActive }
) {
  return (
    <header className="header">
      <div
        className="profile-img"
        onClick={() =>
          firebase.auth().signOut().then(() => console.log('signedout!!'))}
      />
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
          {/* need exact? */}
          <NavLink exact to="/library" activeClassName="active-nav">
            <h1>Library</h1>
          </NavLink>
          {count > 0 && <span className="counter">{count}</span>}
        </li>
      </ul>
      <Link to="/library" onClick={() => toggleSearchButton()}>
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
