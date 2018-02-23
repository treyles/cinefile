import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../utils/Icon';

export default class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.scrollStyle = document.body.querySelector('*').style;
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

  render() {
    const { handleAuthorization, handleSignInModal } = this.props;

    return (
      <div className="sign-in-modal">
        <div className="sign-in-header">
          Sign In<button
            className="exit"
            onClick={() => handleSignInModal()}
          >
            <Icon icon="exit" width="16" height="16" />
          </button>
        </div>
        <a className="facebook-btn" onClick={() => handleAuthorization()}>
          <span>
            <Icon icon="facebook" width="18" height="18" />
          </span>Connect with Facebook
        </a>
        <a className="google-btn" onClick={() => handleAuthorization()}>
          <span>
            <Icon icon="google" width="18" height="18" />
          </span>Connect with Google
        </a>
      </div>
    );
  }
}
