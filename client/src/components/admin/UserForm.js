import React, { Component } from "react";
import { Button, Input, Form, FormGroup , Label} from 'reactstrap';


class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      phone: ''
    };
  }

  setFirstName = (event) => {
    this.setState({ firstName: event.target.value });
  }

  setLastName = (event) => {
    this.setState({ lastName: event.target.value });
  }

  setEmail = (event) => {
    this.setState({ email: event.target.value });
  }

  setPhone = (event) => {
    this.setState({ phone: event.target.value });
  }

  handleForm = (event) => {
    event.preventDefault();
    // TODO: Handle user form
  }

  render() {
    return (
      <div>
        <h2>Create User</h2>
        <Form onSubmit={this.handleForm}>
          <FormGroup>
            <Label for="firstName">First Name</Label>
            <Input
              type="text"
              name="firstName"
              id="firstName"
              value={this.state.firstName}
              onChange={this.setFirstName}
            />
          </FormGroup>
          <FormGroup>
            <Label for="lastName">Last Name</Label>
            <Input
              type="text"
              name="lastName"
              id="lastName"
              value={this.state.lastName}
              onChange={this.setLastName}
            />
          </FormGroup>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              type="email"
              name="email"
              id="email"
              value={this.state.email}
              onChange={this.setEmail}
            />
          </FormGroup>
          <FormGroup>
            <Label for="phone">Phone</Label>
            <Input
              type="number"
              name="phone"
              id="phone"
              value={this.state.phone}
              onChange={this.setPhone}
            />
          </FormGroup>
          <Button color="primary">Create User</Button>
        </Form>
      </div>
    );
  }
}

export default UserForm;
