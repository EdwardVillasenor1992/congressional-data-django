import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import App from './components/App';
import AvgDonations from './components/AvgDonations';

const node = document.querySelector('#app');

let routes = (
    <Router>
      <div>
        <ul>
          <li><Link to="/">Main Page</Link></li>
          <li><Link to="/average">Average Donation per Win</Link></li>
        </ul>        
        <hr />
        <Route exact path="/" component={App} />
        <Route path="/average" component={AvgDonations} />
      </div>
    </Router>
);
render(routes, node);
