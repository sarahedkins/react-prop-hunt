import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router';
import './App.css';
import {  Menu } from  './Menu';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth,
    };
  }

  componentDidMount = () => {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    this.setState({ width: window.innerWidth });
  }

  render() {
    const width = window.innerWidth;

    return (
      <div className="App">
        <header
          className={`App-header flex flex-align-items-center
          flex-justify-content-space-between`}
        >
          <h1 className="App-title">
            {this.state.width > 415 ? 'sarah' :'s.e' }
          </h1>
        </header>
        <Menu />
      </div>
    );
  }
}

export default App;
