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
      alert: null,
      library: []
    };

    this.timer = null;
    this.addToLibrary = this.addToLibrary.bind(this);
    this.removeFromLibrary = this.removeFromLibrary.bind(this);
  }

  // TODO: rename 'handle'
  addToLibrary(media) {
    this.setState({
      library: [media].concat(this.state.library),
      alert: 'Added to'
    });

    this.alertsOff();
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

    this.alertsOff();
  }

  alertsOff() {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.setState({ alert: false }), 4000);
  }

  render() {
    const { library, alert } = this.state;

    return (
      <BrowserRouter>
        <div className="app">
          <Header count={library.length} />
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <Library
                  library={library}
                  removeFromLibrary={this.removeFromLibrary}
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
              path="/search"
              render={() => <Search addToLibrary={this.addToLibrary} />}
            />
            <Route
              render={() => <p className="not-found">Not Found!</p>}
            />
          </Switch>
          <div className={`alert${alert ? ' active' : ''}`}>
            {alert && `${alert} library`}
          </div>
        </div>
      </BrowserRouter>
    );
  }
}
