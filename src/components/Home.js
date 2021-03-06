import React from 'react';
import ReactModal from 'react-modal';
import heroPreview from '../assets/hero-preview.mp4';
import heroPoster from '../assets/hero-preview-poster.jpg';
import mobilePreview from '../assets/mobile-preview.jpg';
import SignIn from './SignIn';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSignIn: false,
      showVideo: true
    };

    this.handleSignInModal = this.handleSignInModal.bind(this);
  }

  componentWillMount() {
    document.body.style.backgroundColor = '#0883df';
    this.hideMobileVideo();
  }

  componentWillUnmount() {
    document.body.style.backgroundColor = null;
  }

  hideMobileVideo() {
    if (window.innerWidth < 768) {
      this.setState({
        showVideo: false
      });
    }
  }

  handleSignInModal() {
    this.setState({
      showSignIn: !this.state.showSignIn
    });
  }

  render() {
    const { showSignIn, showVideo } = this.state;
    const about = 'https://github.com/treyles/cinefile';
    const videoSource = <source src={heroPreview} type="video/mp4" />;

    return (
      <div className="home">
        <div className="home-header">
          <h1>Cinefile</h1>
          <ul>
            <li>
              <a href={about} target="blank">
                About
              </a>
            </li>
            <li>
              <button
                className="signin-btn"
                onClick={this.handleSignInModal}
              >
                Sign In
              </button>
            </li>
          </ul>
        </div>
        <div className="hero">
          <div className="hero-content">
            <h1 className="title">
              When you see something you want to watch later, put it in
              Cinefile
            </h1>
            <p>
              Keep movies, tv shows, and documentaries from falling off
              your radar with Cinefile — a minimal bookmarking and
              discovery app
            </p>
            <button
              className="get-started-btn"
              onClick={this.handleSignInModal}
            >
              Get Started, Its Free!
            </button>
          </div>
          <div className="hero-video-container">
            <div className="video-window" />
            <div className="video-content-container">
              <video
                className="hero-preview"
                poster={heroPoster}
                autoPlay
                muted
                loop
              >
                {showVideo && videoSource}
              </video>
            </div>
          </div>
        </div>
        <div className="mobile-section">
          <div className="mobile-content-container">
            <img src={mobilePreview} alt="" />
          </div>
          <div className="text-block">
            <h1 className="text-block-header">Mobile Friendly</h1>
            <p className="text-block-one">
              Always ready to save that tv show your friend just told you
              about.
            </p>
            <h1 className="text-block-header">Minimal Design</h1>
            <p>
              When we say minimal, we mean it — Cinefile presents you with
              cards that display only the essential details you need about
              a movie or tv show.
            </p>
          </div>
        </div>
        <div className="footer">
          <button className="footer-btn" onClick={this.handleSignInModal}>
            Get Started!
          </button>
          <h2>MADE BY @TREYLES</h2>
        </div>
        <ReactModal
          isOpen={showSignIn}
          onRequestClose={this.handleSignInModal}
          className="sign-in-modal"
          overlayClassName="sign-in-overlay"
          ariaHideApp={false}
        >
          <SignIn handleSignInModal={this.handleSignInModal} />
        </ReactModal>
      </div>
    );
  }
}
