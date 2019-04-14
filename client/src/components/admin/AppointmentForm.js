import React, { Component } from 'react';
import { Button, Input, Form, FormGroup , Label} from 'reactstrap';
import { connect } from 'react-redux';

import { createAppointment } from '../../redux/actions';
import Autosuggest from '../Autosuggest';


class AppointmentForm extends Component {
  constructor(props) {
    super(props);
    this.state = { time: '', user: '', workingDay: '' };
  }

  setTime = (event) => {
    this.setState({ time: event.target.value });
  }

  setUser = (event) => {
    this.setState({ user: event.target.value });
  }

  setWorkingDay = (event) => {
    this.setState({ workingDay: event.target.value });
  }

  handleForm = (event) => {
    event.preventDefault();
    this.props.createAppointment(
      this.state.time,
      this.state.user,
      this.state.workingDay
    )
      .then((json) => {
        console.log(json);
        this.setState({ time: '', workingDay: '' });
      });
  }

  render() {
    return (
      <div>
        <h2>Create appointment</h2>
        <Form onSubmit={this.handleForm}>
          <FormGroup>
            <Autosuggest onChange={id => { this.setState({user: id}) }}/>
          </FormGroup>
          {/* TODO: Hardcoded for testing */}
          <FormGroup>
            <Label for="workingDay">Day</Label>
            <Input
              name="workingDay"
              id="workingDay"
              placeholder="date placeholder"
              value={this.state.workingDay}
              onChange={this.setWorkingDay}
            />
          </FormGroup>
          {/* End of hardcoded block */}
          <FormGroup>
            <Label for="time">Time</Label>
            <Input
              type="time"
              name="time"
              id="time"
              placeholder="time placeholder"
              value={this.state.time}
              onChange={this.setTime}
            />
          </FormGroup>
          <Button color="primary">Create Appointment</Button>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.authenticate.user,
    apiUrl: state.api.url,
    headers: state.authenticate.headers,
    loading: state.app.loading
  };
};
  
export default connect(
  mapStateToProps,
  { createAppointment }
)(AppointmentForm);
