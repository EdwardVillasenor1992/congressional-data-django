import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router} from 'react-router-dom';
import Routing from './Routing';
const node = document.querySelector('#app');
const routes = (
    <Router>
         <Routing />
    </Router>
);
render(routes, node);
