import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './Header';
import Library from './Library';
import Discover from './Discover';
import Search from './Search';

const App = () => (
  <BrowserRouter>
    <div className="app">
      <Header />
      <Switch>
        <Route exact path="/" component={Library} />
        <Route path="/discover" component={Discover} />
        <Route path="/search" component={Search} />
        <Route render={() => <p className="not-found">Not Found!</p>} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default App;
