import React from 'react';
import About from './About';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

export const Menu = () => (
  <Router>
    <div>
      <div className="flex pad-30">
        <Link className="margin-10-l" to="/">Home</Link>
        <Link className="margin-10-l" to="/about">About</Link>
      </div>
      <Route path="/" />
      <Route path="/about" component={About}/>
    </div>
  </Router>
)
export default Menu;
