import React, { Component } from 'react';
import logo from './logo.svg';
import Test1 from './components/test1/test1'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Test1></Test1>
        </header>
      </div>
    );
  } 
}

export default App;
