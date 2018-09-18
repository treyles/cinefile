import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../utils/Icon';
import { auth, googleAuth, facebookAuth } from '../utils/base';

export default function SignIn({ handleSignInModal }) {
  return (
    <div className="sign-in-modal">
      <div className="sign-in-header">
        Sign In
        <button className="exit" onClick={() => handleSignInModal()}>
          <Icon icon="exit" width="17" height="17" />
        </button>
      </div>
      <button
        className="facebook-btn"
        onClick={() => auth.signInWithPopup(facebookAuth)}
      >
        <span>
          <Icon icon="facebook" width="18" height="18" />
        </span>Connect with Facebook
      </button>
      <button
        className="google-btn"
        onClick={() => auth.signInWithPopup(googleAuth)}
      >
        <span>
          <Icon icon="google" width="18" height="18" />
        </span>Connect with Google
      </button>
    </div>
  );
}

SignIn.propTypes = {
  handleSignInModal: PropTypes.func.isRequired
};
