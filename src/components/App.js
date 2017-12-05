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

    this.addToLibrary = this.addToLibrary.bind(this);
    this.removeFromLibrary = this.removeFromLibrary.bind(this);
  }

  // TODO: rename 'handle'
  addToLibrary(media) {
    this.setState({
      library: [media].concat(this.state.library)
    });
  }

  removeFromLibrary(media) {
    const { library } = this.state;
    const mediaIndex = library.indexOf(media);

    if (mediaIndex > -1) {
      this.setState({
        library: library
          .slice(0, mediaIndex)
          .concat(library.slice(mediaIndex + 1))
      });
    }
  }

  render() {
    const { library } = this.state;

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
              render={() => <Discover library={library} />}
            />
            <Route
              path="/search"
              render={() => <Search addToLibrary={this.addToLibrary} />}
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
