import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import firebase from 'firebase';
import Library from './Library';
import Discover from './Discover';
import Home from './Home';
import rebase from '../utils/base';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alert: false,
      library: [],
      isSearchActive: false,
      currentUser: null
    };

    this.timer = null;
    this.refresh = JSON.parse(localStorage.getItem('authenticated'));
    this.addToLibrary = this.addToLibrary.bind(this);
    this.removeFromLibrary = this.removeFromLibrary.bind(this);
    this.toggleSearchButton = this.toggleSearchButton.bind(this);
    this.handleAuthorization = this.handleAuthorization.bind(this);
  }

  // prevent homepage from momentarily appearing on refresh after login
  componentWillMount() {
    if (this.refresh) {
      this.setState({ currentUser: true });
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(currentUser => {
      this.setState({ currentUser });

      // re-sync firebase on refresh
      if (currentUser) {
        this.syncRebase();
        localStorage.setItem('authenticated', true);
      }
    });
  }

  handleAuthorization() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
    // firebase.auth().signInWithRedirect(provider);

    // TODO: should catch errors
    // firebase.auth().signInWithPopup(provider).then(response => {
    //   this.setState({ currentUser: response.user });
    //   this.syncRebase();
    // });
  }

  syncRebase() {
    rebase.syncState(this.state.currentUser.uid, {
      context: this,
      state: 'library',
      asArray: true
    });
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
    const { library, alert, isSearchActive, currentUser } = this.state;

    return (
      <BrowserRouter>
        <div className="app">
          <Switch>
            <Route
              exact
              path="/"
              render={() =>
                !currentUser
                  ? <Home handleAuthorization={this.handleAuthorization} />
                  : <Library
                      library={library}
                      removeFromLibrary={this.removeFromLibrary}
                      addToLibrary={this.addToLibrary}
                      toggleSearchButton={this.toggleSearchButton}
                      isSearchActive={isSearchActive}
                      count={library.length}
                      currentUser={currentUser}
                    />}
            />
            <Route
              path="/discover"
              render={() =>
                !currentUser
                  ? <Home handleAuthorization={this.handleAuthorization} />
                  : <Discover
                      library={library}
                      addToLibrary={this.addToLibrary}
                      count={library.length}
                      toggleSearchButton={this.toggleSearchButton}
                      isSearchActive={isSearchActive}
                      currentUser={currentUser}
                    />}
            />
            <Route
              render={() => <p className="not-found">Not Found!</p>}
            />
          </Switch>
          <div className={`alert ${alert && 'active'}`}>
            <h2>{alert && `${alert} library`}</h2>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}
