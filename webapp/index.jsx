import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Switch } from 'react-router';

import App from './components/App';
import AvgDonations from './components/AvgDonations';

import createBrowserHistory from 'history/createBrowserHistory'
const newHistory = createBrowserHistory();

const node = document.querySelector('#app');

let routes = (
    <Router history={newHistory}>
        <Switch>
           <Route exact path="/" component={App} />
           <Route path="/avg-donations" component={AvgDonations} />
        </Switch>
     </Router>
);
render(routes, node);
