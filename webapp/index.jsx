import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import App from './components/App';
import AvgDonations from './components/AvgDonations';

const node = document.querySelector('#app');

let routes = (
    <Router>
      <div>
        <Link to="/">Main Page | </Link>
        <Link to="/average">Average Donation Per Win</Link>
        <Route exact path="/" component={App} />
        <Route path="/average" component={AvgDonations} />
      </div>
    </Router>
);
render(routes, node);
