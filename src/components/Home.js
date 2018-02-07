import React from 'react';
import { NavLink } from 'react-router-dom';
import base from '../utils/base';
import firebase from 'firebase';
import tester from '../assets/testvid.png';
import mobile from '../assets/mobile.png';
// import { Link } from 'react-router-dom';

export default class Home extends React.Component {
  render() {
    const { handleAuthorization } = this.props;
    const about = 'https://github.com/treyles/cinefile';

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
              <button className="signin-btn">Sign In</button>
            </li>
          </ul>
        </div>
        <div className="hero">
          <div className="hero-content">
            <h1 className="title">
              When you see something you want to watch later, put it in
              Cinefile.
            </h1>
            <p>
              Keep movies, tv shows, and documentaries from slipping off
              your radar with Cinefile — a minimal bookmarking and
              discovery app
            </p>
            <button className="get-started-btn">
              Get Started, It's Free!
            </button>
          </div>
          <div className="hero-video-container">
            <img className="hero-video-content" src={tester} />
          </div>
        </div>
        <div className="mobile-section">
          <div className="image-block">
            <img className="mobile-image" src={mobile} />
          </div>
          <div className="text-block">
            <h1 className="text-block-header">Mobile Friendly</h1>
            <p className="text-block-one">
              Always ready to save that tv show your friend just told you
              about.
            </p>
            <h1 className="text-block-header">Minimal Design</h1>
            <p>
              When we say minimal, we mean it. Cinefile provides a rating,
              year, short synopsis, director, lead actor, and trailer. It
              also links to it’s corresponding IMDB page if that doesn’t
              satisfy you.
            </p>
          </div>
        </div>
        <div className="footer">
          <button className="footer-btn">Get Started!</button>
          <h2>MADE BY @TREYLES</h2>
        </div>
      </div>
    );
  }
}

/*
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
*/
