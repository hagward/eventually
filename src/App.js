import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Create from './Create';
import View from './View';

export default class App extends React.PureComponent {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Create} />
          <Route path="/:id" component={View} />
        </div>
      </Router>
    );
  }
}
