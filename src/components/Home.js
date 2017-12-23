import React from 'react';
import { NavLink } from 'react-router-dom';
import base from '../utils/base';
import firebase from 'firebase';

export default class Home extends React.Component {
  render() {
    const { handleAuthorization } = this.props;
    return (
      <div className="home">
        <button onClick={() => handleAuthorization()}>
          <h3>Connect with Google</h3>
        </button>
      </div>
    );
  }
}
