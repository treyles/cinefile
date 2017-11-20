import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './Header';
import Library from './Library';
import Discover from './Discover';
import Search from './Search';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      library: []
    };

    this.updateLibrary = this.updateLibrary.bind(this);
  }

  updateLibrary(media) {
    this.setState({
      library: this.state.library.concat(media)
    });
  }

  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <Header />
          <Switch>
            <Route exact path="/" component={Library} />
            <Route path="/discover" component={Discover} />
            <Route
              path="/search"
              render={() => <Search updateLibrary={this.updateLibrary} />}
            />
            <Route render={() => <p className="not-found">Not Found!</p>} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
