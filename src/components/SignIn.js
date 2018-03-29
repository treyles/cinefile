import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../utils/Icon';
import { auth, googleAuth, facebookAuth } from '../utils/base';

export default class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.scrollStyle = document.body.querySelector('*').style;

    // this.handleClickProvider = this.handleClickProvider.bind(this);
  }

  // componentDidMount() {
  //   // hide parent scrolling for safari ios
  //   this.scrollStyle.overflow = 'hidden';
  //   // this.scrollStyle.position = 'fixed';
  // }

  // componentWillUnmount() {
  //   // restore default
  //   this.scrollStyle.overflow = 'auto';
  //   // this.scrollStyle.position = 'static';
  // }

  // handleClickProvider(e) {
  //   this.props.handleAuthorization(e.target.className);
  // }

  render() {
    const { handleSignInModal } = this.props;

    return (
      <div className="sign-in-modal">
        <div className="sign-in-header">
          Sign In<button
            className="exit"
            onClick={() => handleSignInModal()}
          >
            <Icon icon="exit" width="17" height="17" />
          </button>
        </div>
        <a
          className="facebook-btn"
          onClick={() => auth.signInWithPopup(facebookAuth)}
        >
          <span>
            <Icon icon="facebook" width="18" height="18" />
          </span>Connect with Facebook
        </a>
        <a
          className="google-btn"
          onClick={() => auth.signInWithPopup(googleAuth)}
        >
          <span>
            <Icon icon="google" width="18" height="18" />
          </span>Connect with Google
        </a>
      </div>
    );
  }
}
