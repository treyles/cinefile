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
    firebase.auth().signOut().then(() => {
      console.log('signed out');
      localStorage.setItem('authenticated', false);
    });
  }

  render() {
    const {
      count,
      toggleSearchButton,
      isSearchActive,
      currentUser
    } = this.props;

    return (
      <header className="header">
        <div className="logo">Cinefile</div>
        <Link to="/" onClick={this.handleClick}>
          {currentUser &&
            <img
              alt="logout"
              src={currentUser.photoURL}
              className="profile-img"
            />}
        </Link>
        {currentUser &&
          <div className="welcome">
            {`Hi, ${currentUser.displayName.split(' ')[0]}`}
          </div>}
        <ul>
          <li>
            <NavLink
              to="/discover"
              activeClassName="active-nav"
              onClick={() => toggleSearchButton(true)}
            >
              Discover
            </NavLink>
          </li>
          <li>
            {/* need exact? */}
            <NavLink exact to="/" activeClassName="active-nav">
              Library
            </NavLink>
            {count > 0 && <span className="counter">{count}</span>}
          </li>
        </ul>
        <Link to="/" onClick={() => toggleSearchButton()}>
          <div className={`search-icon ${isSearchActive ? 'active' : ''}`}>
            <MediaQuery minWidth={768}>
              <Icon icon="plus" width="18" height="18" />
            </MediaQuery>
            <MediaQuery maxWidth={768}>
              <Icon icon="search" width="22" height="22" />
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
