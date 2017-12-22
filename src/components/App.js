import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './Header';
import Library from './Library';
import Discover from './Discover';
import Home from './Home';
import rebase from '../utils/base';
import firebase from 'firebase';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alert: false,
      library: [],
      isSearchActive: false,
      // delete?
      header: true,
      currentUser: null
    };

    this.timer = null;
    this.addToLibrary = this.addToLibrary.bind(this);
    this.removeFromLibrary = this.removeFromLibrary.bind(this);
    this.toggleSearchButton = this.toggleSearchButton.bind(this);
    this.handleAuthorization = this.handleAuthorization.bind(this);
  }

  // componentDidMount() {
  //   // firebase
  //   rebase.syncState(this.state.currentUser.user.uid, {
  //     context: this,
  //     state: 'library',
  //     asArray: true
  //   });
  // }

  handleAuthorization() {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider).then(response => {
      this.setState({ currentUser: response });

      rebase.syncState(this.state.currentUser.user.uid, {
        context: this,
        state: 'library',
        asArray: true
      });
    });

    // response.user.email
  }

  // TODO: rename 'handle'
  addToLibrary(media) {
    this.setState({
      library: [media].concat(this.state.library),
      alert: 'Added to'
    });

    this.startAlertTimer();
  }

  removeFromLibrary(media) {
    const { library } = this.state;
    const mediaIndex = library.indexOf(media);

    if (mediaIndex > -1) {
      this.setState({
        library: library
          .slice(0, mediaIndex)
          .concat(library.slice(mediaIndex + 1)),
        alert: 'Removed from'
      });
    }

    this.startAlertTimer();
  }

  toggleSearchButton(reset) {
    const isSearchActive = reset ? false : !this.state.isSearchActive;
    this.setState({ isSearchActive });
  }

  startAlertTimer() {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.setState({ alert: false }), 4000);
  }

  render() {
    const { library, alert, isSearchActive } = this.state;

    return (
      <BrowserRouter>
        <div className="app">
          {this.state.header &&
            <Header
              count={library.length}
              toggleSearchButton={this.toggleSearchButton}
              isSearchActive={isSearchActive}
            />}
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <Home handleAuthorization={this.handleAuthorization} />
              )}
            />
            <Route
              path="/library"
              render={() => (
                <Library
                  library={library}
                  removeFromLibrary={this.removeFromLibrary}
                  addToLibrary={this.addToLibrary}
                  toggleSearchButton={this.toggleSearchButton}
                  isSearchActive={isSearchActive}
                />
              )}
            />
            <Route
              path="/discover"
              render={() => (
                <Discover
                  library={library}
                  addToLibrary={this.addToLibrary}
                />
              )}
            />
            <Route
              render={() => <p className="not-found">Not Found!</p>}
            />
          </Switch>
          <div className={`alert ${alert && 'active'}`}>
            {alert && `${alert} library`}
          </div>
        </div>
      </BrowserRouter>
    );
  }
}
