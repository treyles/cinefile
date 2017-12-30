import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import firebase from 'firebase';

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
        <NavLink exact to="/" onClick={this.handleClick}>
          <img
            src={currentUser && currentUser.photoURL}
            className="profile-img"
          />
        </NavLink>
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
          <div
            className={`search-icon ${isSearchActive ? 'active' : ''}`}
          />
        </Link>
      </header>
    );
  }
}

// TODO: clean up onClick
// export default function Header(
//   { count, toggleSearchButton, isSearchActive }
// ) {
//   return (
//     <header className="header">
//       <div
//         className="profile-img"
//         onClick={() =>
//           firebase.auth().signOut().then(() => console.log('signedout!!'))}
//       />
//       <ul>
//         <li>
//           <NavLink
//             to="/discover"
//             activeClassName="active-nav"
//             onClick={() => toggleSearchButton(true)}
//           >
//             Discover
//           </NavLink>
//         </li>
//         <li>
//           {/* need exact? */}
//           <NavLink exact to="/" activeClassName="active-nav">
//             Library
//           </NavLink>
//           {count > 0 && <span className="counter">{count}</span>}
//         </li>
//       </ul>
//       <Link to="/" onClick={() => toggleSearchButton()}>
//         <div className={`search-icon ${isSearchActive ? 'active' : ''}`} />
//       </Link>
//     </header>
//   );
// }

Header.propTypes = {
  count: PropTypes.number.isRequired,
  toggleSearchButton: PropTypes.func.isRequired,
  isSearchActive: PropTypes.bool.isRequired
};
