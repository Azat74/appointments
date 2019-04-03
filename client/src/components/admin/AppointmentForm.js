import React, { Component } from 'react';
import { Button, Input, Form, FormGroup , Label} from 'reactstrap';
import { connect } from 'react-redux';


class AppointmentForm extends Component {
  constructor(props) {
    super(props);
    this.state = { time: '', user: '1', workingDay: '' };
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
    // TODO: Think about helper.
    fetch(
      `http://${this.props.apiUrl}/v1/appointments`,
      { 
        headers: { ...this.props.headers, "Content-Type": "application/json" },
        method: 'POST',
        body: JSON.stringify({
          appointment: { 
            time: this.state.time,
            user_id: this.state.user,
            working_day_id: this.state.workingDay
          } 
        })
      }
    ).then(response => {
      return response.json();
    }).then((json) => {
      this.setState({ time: '', workingDay: '' });
    });
  }

  render() {
    return (
      <div>
        <h2>Create appointment</h2>
        <Form onSubmit={this.handleForm}>
          {/* TODO: Hardcoded for testing */}
          <FormGroup>
            <Label for="user">Customer</Label>
            <Input type="select"
                   name="selectUser"
                   id="user"
                   value={this.state.user}
                   onChange={this.setUser}
            >
              <option value="1">Marge Simpson</option>
              <option value="2">Bart Simpson</option>
              <option value="3">Homer Simpson</option>
              <option value="4">Montgomery Burns</option>
            </Input>
          </FormGroup>
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
  mapStateToProps
)(AppointmentForm);
