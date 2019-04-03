import React from 'react';
import { Redirect, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import SignInForm from './SignInForm';
import NavBar from './NavBar';
import Appointments from './Appointments';
import Admin from './admin/Admin';
import Calendar from './admin/Calendar';


const AdminRoute = ({ component: Component, user, ...rest }) => (
  <Route {...rest} render={(props) => (
    user.isAdmin === true
      ? <Component {...props} />
      : <Redirect to='/' />
  )} />
);

const Routes = withRouter((props) => {
  // TODO: Think about diffrent approaches
  if (!props.isAuthenticated &&
      (props.location.pathname !== '/sign_in')) {
    return <Redirect to="/sign_in" />
  }

  return (
    <div>
      <NavBar />
      <Route exact path="/" component={Appointments} />
      <Route path="/sign_in" component={SignInForm} />
      <AdminRoute path="/admin" component={Admin} user={props.user} />
      <AdminRoute path="/calendar" component={Calendar} user={props.user} />
    </div>
  )
});

const mapStateToProps = state => {
  return {
    isAuthenticated: state.authenticate.isAuthenticated,
    user: state.authenticate.user
  };
};

export default connect(mapStateToProps)(Routes);

