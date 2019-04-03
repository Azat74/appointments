import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link, Redirect } from "react-router-dom";
import { Nav, Navbar, NavItem, NavLink } from 'reactstrap';

import { signOut } from '../redux/actions';


class NavBar extends Component {
  handleLogOut = () => {
    fetch(
      `http://${this.props.apiUrl}/auth/sign_out`,
      { 
        headers: {
          uid: this.props.headers.uid,
          client: this.props.headers.client,
          'access-token': this.props.headers['access-token']
        },
        method: 'DELETE'
      }
    ).then(() => {
      this.props.signOut();
      return <Redirect to="/sign_in" /> 
    });
  };

  render() {
    const calendarLink = this.props.user.isAdmin
      ? <NavItem>
          <Link to="/calendar" className="nav-link">Calendar</Link>
        </NavItem>
      : null;

    return (
      <div>
        <Navbar color="light" light expand="md">
          <Nav className="ml-auto" navbar>
            {calendarLink}
            <NavItem>
              {
                this.props.user.isAdmin ? (
                  <Link to="/admin" className="nav-link">Create</Link>
                ) : (
                  <Link to="/" className="nav-link">Home</Link>
                )
              }
            </NavItem>
            { this.props.isAuthenticated ? (
                <NavItem>
                  <NavLink href="#"
                           onClick={this.handleLogOut}
                  >
                    Log Out
                  </NavLink>
                </NavItem>
              ) : (
                <NavItem>
                  <Link to="/sign_in" className="nav-link">Sign In</Link>
                </NavItem>
              )
            }
          </Nav>
        </Navbar>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.authenticate.isAuthenticated,
    user: state.authenticate.user,
    apiUrl: state.api.url,
    headers: state.authenticate.headers
  };
};

export default connect(
  mapStateToProps,
  { signOut }
)(NavBar);

