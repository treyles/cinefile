import React from 'react';
import PropTypes from 'prop-types';

export default class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.scrollStyle = document.body.querySelector('*').style;
  }

  componentDidMount() {
    // hide parent scrolling for safari ios
    this.scrollStyle.overflow = 'hidden';
    // this.scrollStyle.position = 'fixed';
  }

  componentWillUnmount() {
    // restore default
    this.scrollStyle.overflow = 'auto';
    // this.scrollStyle.position = 'static';
  }

  render() {
    const { handleAuthorization } = this.props;

    return (
      <div className="sign-in-modal">
        <div className="sign-in-header">Sign in to Cinefile</div>
        <button
          className="facebook-btn"
          onClick={() => handleAuthorization()}
        >
          Connect with Facebook
        </button>
        <button
          className="google-btn"
          onClick={() => handleAuthorization()}
        >
          Connect with Google
        </button>
      </div>
    );
  }
}
