import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import App from './components/App';
import AvgDonations from './components/AvgDonations';
import {Navbar, Nav, NavItem} from 'react-bootstrap';

const node = document.querySelector('#app');

const routes = (
<Router>
  <Navbar>
    <Nav>
        <NavItem eventKey={1} componentClass={Link} href="/" to="/"> Main Page </NavItem>
        <NavItem eventKey={2} componentClass={Link} href="/average" to="/average">Average Donation Per Win</NavItem>
<br />
        <Route exact path="/" component={App} />
        <Route path="/average" component={AvgDonations} />
    </Nav>
  </Navbar>
</Router>

);
render(routes, node);
