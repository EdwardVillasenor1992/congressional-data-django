import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import App from './components/App';
import AvgDonations from './components/AvgDonations';
const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={App} />
      <Route exact path='/' component={App}/>
      <Route exact path='/average' component={AvgDonations} />
    </Switch>
  </main>
)
class NavLink extends Component {
  render() {
      return (
        <li className={"nav-item " + (this.props.isActive ? "active": "")}>
                  <Link
                    className="nav-link"
                    to={this.props.path}
                    onClick={() => this.props.onClick()}
                  >
              {this.props.text}</Link>
        </li>
      );
  }
}
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      links: [
        {path: "/", text: "Main Page", isActive: false},
        {path: "/average", text: "Average Donations", isActive: false},
      ]
    }
  }
  handleClick(i) {
    const links = this.state.links.slice();
    for (const j in links) {
      links[j].isActive = i == j ;
    }
    this.setState({links: links});
  }
  render() {
    return (
      <div>
            <Navbar inverse>
    <Nav>
        {this.state.links.map((link, i) =>
              <NavItem componentClass={Link}
                 href={link.path} to={link.path}
                text={link.text}
                isactive={link.isActive.toString()}
                key={link.path}
                onClick={() => this.handleClick(i)}
              >{link.text}</NavItem>
              )}
    </Nav>
  </Navbar>
</div>
    );
  }
}
const Routing = () => (
  <div>
    <Header />
    <Main />
  </div>
)
export default Routing;
