import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import MediaQuery from 'react-responsive';
import firebase from 'firebase';
import Icon from '../utils/Icon';

// TODO: clean up onClick
export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log('signed out');
        localStorage.setItem('authenticated', false);
      });
  }

  render() {
    const {
      count,
      toggleSearchButton,
      isSearchActive,
      isLibraryMounted,
      currentUser
    } = this.props;

    return (
      <header className="header">
        <div className="logo">Cinefile</div>
        <Link to="/" onClick={this.handleClick}>
          {currentUser.photoURL ? (
            <img
              alt="logout"
              src={currentUser.photoURL}
              className="profile-img"
            />
          ) : (
            <div className="profile-img placeholder" />
          )}
        </Link>
        {currentUser.displayName && (
          <Link className="welcome" to="/" onClick={this.handleClick}>
            {`Hi, ${currentUser.displayName.split(' ')[0]}`}
          </Link>
        )}
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
            <NavLink exact to="/" activeClassName="active-nav">
              <h1>Library</h1>
            </NavLink>
            {count > 0 && (
              <span
                className={`counter ${!isLibraryMounted
                  ? 'inactive'
                  : ''}`}
              >
                {count}
              </span>
            )}
          </li>
        </ul>
        <Link to="/" onClick={() => toggleSearchButton()}>
          <div className={`search-icon ${isSearchActive ? 'active' : ''}`}>
            <MediaQuery minWidth={768}>
              <Icon icon="plus" width="18" height="18" />
            </MediaQuery>
            <MediaQuery maxWidth={768}>
              <Icon icon="search" width="24" height="24" />
            </MediaQuery>
          </div>
        </Link>
      </header>
    );
  }
}

Header.propTypes = {
  count: PropTypes.number.isRequired,
  toggleSearchButton: PropTypes.func.isRequired,
  isSearchActive: PropTypes.bool.isRequired
};
