import React, { Component } from 'react';
import { Button, Input, Form, FormGroup , Label} from 'reactstrap';
import { connect } from 'react-redux';


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
    // TODO: Think about helper.
    fetch(
      `http://${this.props.apiUrl}/v1/working_days`,
      { 
        headers: { ...this.props.headers, "Content-Type": "application/json" },
        method: 'POST',
        body: JSON.stringify({ working_day: { date: this.state.date } })
      }
    ).then(response => {
      return response.json();
    }).then(json => {
      this.setState({ date: '' });
      console.log(json);
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
  mapStateToProps
)(WorkingDayForm);
