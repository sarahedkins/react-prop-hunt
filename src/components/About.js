import React from 'react';
import { Link } from 'react-router-dom';
import sarah from './sarah_snow_mountain.jpeg';
import DisplayName from './DisplayName';

const myName = "Sarah";

const About = () => (
  <div className="flex flex-column flex-align-items-center pad-30">
    <h2>About Me</h2>
    <DisplayName nameToDisplay={myName} />

    <img src={sarah} className="App-logo" alt="logo" />

    <h4>Connect with Me:</h4>
    <div>
      <a href="https://github.com/sarahedkins">Github</a>
      <a className="margin-10-l" href="https://www.linkedin.com/in/sarahedkins/">LinkedIn</a>
      <a className="margin-10-l" href="https://medium.com/@edkins.sarah">Medium</a>
    </div>
  </div>
)

export default About;
