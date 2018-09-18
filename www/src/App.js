import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Search from './pages/Search';
import User from './pages/User';
import Repo from './pages/Repo';

class App extends Component {
  render() {
    const App = () => (
      <div>
        <Switch>
          <Route exact path='/' component={Search}/>
          <Route exact path='/:user' component={User}/>
          <Route exact path='/:user/:repo' component={Repo}/>
        </Switch>
      </div>
    )
    return (
      <Switch>
        <App/>
      </Switch>
    );
  }
}

export default App;
