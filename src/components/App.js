import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './Header';
import Library from './Library';
import Discover from './Discover';
import Search from './Search';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alert: false,
      library: [],
      isSearchActive: false
    };

    this.timer = null;
    this.addToLibrary = this.addToLibrary.bind(this);
    this.removeFromLibrary = this.removeFromLibrary.bind(this);
    this.toggleSearchButton = this.toggleSearchButton.bind(this);
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
          <Header
            count={library.length}
            toggleSearchButton={this.toggleSearchButton}
            isSearchActive={isSearchActive}
          />
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <Library
                  library={library}
                  removeFromLibrary={this.removeFromLibrary}
                  addToLibrary={this.addToLibrary}
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
