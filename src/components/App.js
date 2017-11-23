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
      library: []
    };

    this.updateLibrary = this.updateLibrary.bind(this);
  }

  updateLibrary(media, remove) {
    const newState = this.state.library;

    if (remove) {
      if (newState.indexOf(media) > -1) {
        newState.splice(newState.indexOf(media), 1);
        this.setState({ library: newState });
      }
    } else {
      this.setState({ library: newState.concat(media) });
    }
  }

  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <Header />
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <Library
                  library={this.state.library}
                  updateLibrary={this.updateLibrary}
                />
              )}
            />
            <Route path="/discover" component={Discover} />
            <Route
              path="/search"
              render={() => <Search updateLibrary={this.updateLibrary} />}
            />
            <Route
              render={() => <p className="not-found">Not Found!</p>}
            />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
