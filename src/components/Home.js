import React from 'react';
import { NavLink } from 'react-router-dom';
import base from '../utils/base';
import firebase from 'firebase';

export default class Home extends React.Component {
  render() {
    const { handleAuthorization } = this.props;
    return (
      <div className="home">
        <NavLink exact to="/library" activeClassName="active-nav">
          <h1>Library</h1>
        </NavLink>
        <button onClick={() => handleAuthorization()}>
          Connect with Google
        </button>
      </div>
    );
  }
}
