import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Button, Input, Form, FormGroup , Label} from 'reactstrap';

import { requestAuth } from '../redux/actions';


class SignInForm extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', redirect: false };
  }

  setEmail = (event) => {
    this.setState({email: event.target.value});
  }

  setPassword = (event) => {
    this.setState({password: event.target.value});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.requestAuth(this.state.email, this.state.password)
      .then(() => {
        this.setState({ email: '', password: '', redirect: true });
      });
  }

  render() {
    const { redirect } = this.state;

    // TODO: Compare with withRouter approach
    if (redirect) {
      return this.props.user.isAdmin
        ? <Redirect to="/calendar" />
        : <Redirect to="/" />;
    }

    return(
      <div className="container">
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input type="email"
                   className="form-control"
                   id="email1"
                   placeholder="Enter email"
                   autoComplete="username"
                   value={this.state.email}
                   onChange={this.setEmail}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <Input type="password"
                   className="form-control"
                   id="password"
                   placeholder="Enter password"
                   autoComplete="current-password"
                   value={this.state.password}
                   onChange={this.setPassword}
            />
          </FormGroup>
          <Button color="primary">Sign In</Button>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.authenticate.user
  };
};

export default connect(
  mapStateToProps,
  { requestAuth }
)(SignInForm);
