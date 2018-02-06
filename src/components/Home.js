import React from 'react';
import { NavLink } from 'react-router-dom';
import base from '../utils/base';
import firebase from 'firebase';
import tester from '../assets/testvid.png';
// import bg from '../assets/waves.svg';

export default class Home extends React.Component {
  render() {
    const { handleAuthorization } = this.props;

    // const styles = {
    //   backgroundImage: `url(${bg})`
    // };

    return (
      <div className="home">
        <div className="home-header">
          <h1>Cinefile</h1>
        </div>
        <div className="home-hero">
          <div className="home-hero-content">
            <h1 className="title">
              When you see something you want to watch later, put it in
              Cinefile.
            </h1>
            <p>
              Cinefile is a bookmarking and discovery app for movies and tv
              shows
            </p>
          </div>
          <div className="hero-video-container">
            <img className="hero-video-content" src={tester} />
          </div>
        </div>
        <button onClick={() => handleAuthorization()}>
          <h3>Connect with Google</h3>
        </button>
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
