import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Library from './Library';
import Discover from './Discover';
import Header from './Header';

const App = () => (
  <BrowserRouter>
    <div className="app">
      <Header />
      <Switch>
        <Route exact path="/" component={Library} />
        <Route path="/discover" component={Discover} />
        <Route render={() => <p className="not-found">Not Found!</p>} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default App;
