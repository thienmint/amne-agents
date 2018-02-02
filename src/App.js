import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/home';

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      {/*<Route path='*' exact={true} component={Page404}/>*/}
    </Switch>
  </main>
);

class App extends Component {
  render() {
    return (
      <div className="App">
        <Main/>
      </div>
    );
  }
}

export default App;
