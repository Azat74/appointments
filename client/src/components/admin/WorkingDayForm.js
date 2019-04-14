import React, { Component } from 'react';
import { Button, Input, Form, FormGroup , Label} from 'reactstrap';
import { connect } from 'react-redux';

import { createWorkingDay } from '../../redux/actions';


class WorkingDayForm extends Component {
  constructor(props) {
    super(props);
    this.state = { date: '' };
  }

  setDate = (event) => {
    this.setState({date: event.target.value});
  }

  handleForm = (event) => {
    event.preventDefault();
    this.props.createWorkingDay(this.state.date)
      .then(() => {
        this.setState({ date: '' });
      });
  }

  render() {
    return (
      <div>
        <h2>Create working day</h2>
        <Form onSubmit={this.handleForm}>
          <FormGroup>
            <Label for="exampleDate">Date</Label>
            <Input
              type="date"
              name="date"
              id="exampleDate"
              placeholder="date placeholder"
              value={this.state.date}
              onChange={this.setDate}
            />
          </FormGroup>
          <Button color="primary">Create Working Day</Button>
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
  { createWorkingDay }
)(WorkingDayForm);
