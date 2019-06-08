import React, { Component } from "react";
import { Button, Input, Form, FormGroup, Label, FormFeedback } from 'reactstrap';
import PhoneInput from './PhoneInput';

class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      phone: ''
    };
    this.ref = React.createRef();
  }
  showErrorState = (node, cn = 'is-invalid', argError) => {
    let error = '';
    if (!!node.getAttribute('error')) {
      error = node.getAttribute('error');
    };
    if (!!argError && typeof argError === 'string') {
      error = argError;
    };
    const errorNode = node.parentNode.querySelector('.invalid-feedback');
    if (!!errorNode) {
      errorNode.innerText = `${error}`;
    }
    node.classList.add(cn);
    setTimeout(() => {
      node.classList.remove(cn);
    }, 2000);
  }

  handleInputText = (event) => {
    const node = event.target;
    if (node.value.length < node.getAttribute('minLength') && node.value.length > 0) {
      this.showErrorState(node, undefined, `you must enter at least ${node.getAttribute('minLength')} characters`);
    }
  }

  handleInputEmail = (event, submit = 'false') => {
    let node = event.target;
    if (node instanceof Node === false) {
      node = event;
    }
    if (
      (!node.value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) && node.value.length > 0) ||
      (submit === true && node.value.length < 1)) {
      this.showErrorState(node, undefined, 'you must enter correct email address');
      return false;
    }
    return true;
  }

  handleInputTel = (event, submit = 'false') => {
    let node = event.target;
    if (node instanceof Node === false) {
      node = event;
    }
    const formattedTel = this.formatPhone(this.state.phone);
    const isValidPhone = this.checkValidateForm(formattedTel);
    if (
      (!isValidPhone && node.value.length > 0) ||
      (submit === true && !isValidPhone)
    ) {
      this.showErrorState(node, undefined, 'you must enter correct telephone number');
      return false;
    }
    return true
  }

  formatPhone = (tel) => {
    let formattedTel = tel;
    return `${formattedTel.replace(/\s+/g, '').replace(/-/g, '').replace(/[()]/g, '')}`;
  }

  checkValidateForm = tel => tel.length === 12 ? true : false;

  setFirstName = (event) => {
    const value = event.target.value;
    const newValue = value.replace(/[^A-Za-z]/ig, '');
    if (this.state.firstName === newValue && newValue.length === 0) {
      this.showErrorState(event.target);
    }
    this.setState({ firstName: newValue });
  }

  setLastName = (event) => {
    const value = event.target.value
    const newValue = value.replace(/[^A-Za-z]/ig, '')
    if (this.state.lastName === newValue && newValue.length === 0) {
      this.showErrorState(event.target);
    }
    this.setState({ lastName: newValue });
  }

  setEmail = (event) => {
    this.setState({ email: event.target.value });
  }

  setPhone = (event) => {
    this.setState({ phone: event.target.value });
  }

  handleForm = (event) => {
    event.preventDefault();
    // nodes
    const firstNameNode = this.ref.current.querySelector('#firstName');
    const lastNameNode = this.ref.current.querySelector('#lastName');
    const emailNode = this.ref.current.querySelector('#email');
    const phoneNode = this.ref.current.querySelector('#phone');
    if (firstNameNode.value.length < firstNameNode.getAttribute('minLength')) {
      this.showErrorState(firstNameNode, undefined, `you must enter at least ${firstNameNode.getAttribute('minLength')} characters`);
      firstNameNode.focus();
    } else if (lastNameNode.value.length < lastNameNode.getAttribute('minLength')) {
      this.showErrorState(lastNameNode, undefined, `you must enter at least ${lastNameNode.getAttribute('minLength')} characters`);
      lastNameNode.focus();
    } else if (this.handleInputEmail(emailNode, true) === false || emailNode.value.length < 1) {
      emailNode.focus();
    } else if (this.handleInputTel(phoneNode, true) === false || phoneNode.value.length < 1) {
      phoneNode.focus();
    } else {
      alert('submit');
    }
    // TODO: Handle user form
  }

  render() {
    return (
      <div className='user-form' ref={this.ref}>
        <h2>Create User</h2>
        <Form onSubmit={this.handleForm} noValidate>
          <FormGroup>
            <Label for="firstName">First Name</Label>
            <Input
              type="text"
              name="firstName"
              id="firstName"
              value={this.state.firstName}
              onChange={this.setFirstName}
              onBlur={this.handleInputText}
              minLength={2}
              error='You can type only letters'
              required
            />
            <FormFeedback valid>Sweet! that name is available</FormFeedback>
            <FormFeedback invalid='invalid'>Oh noes! that name is already taken</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="lastName">Last Name</Label>
            <Input
              type="text"
              name="lastName"
              id="lastName"
              value={this.state.lastName}
              onChange={this.setLastName}
              onBlur={this.handleInputText}
              minLength={2}
              error='You can type only letters'
              required
            />
            <FormFeedback valid>Sweet! that name is available</FormFeedback>
            <FormFeedback invalid='invalid'>Oh noes! that name is already taken</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              type="email"
              name="email"
              id="email"
              value={this.state.email}
              onChange={this.setEmail}
              onBlur={this.handleInputEmail}
              error='You can type valid email address'
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="phone">Phone</Label>
            <PhoneInput
              type='tel'
              name="phone"
              id="phone"
              value={this.state.phone}
              onChange={this.setPhone}
              onBlur={this.handleInputTel}
              error='You can type valid phone number'
              required
            />
            <FormFeedback valid>success text here</FormFeedback>
            <FormFeedback invalid='invalid'>error-text here</FormFeedback>
          </FormGroup>
          <Button color="primary">Create User</Button>
        </Form>
      </div>
    );
  }
}

export default UserForm;
