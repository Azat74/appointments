import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';

import WorkingDayForm from './WorkingDayForm';
import AppointmentForm from './AppointmentForm';


const WORKING_DAY = 'working_day';
const APPOINTMENT = 'appointment';

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = { currentForm: WORKING_DAY };
  }

  toggleForm = () => {
    this.state.currentForm === WORKING_DAY
      ? this.setState({ currentForm: APPOINTMENT })
      : this.setState({ currentForm: WORKING_DAY });
  };

  render() {
    return (
      <div className="container">
        <Button color="link" onClick={this.toggleForm}>
          {
            this.state.currentForm === WORKING_DAY
              ? 'Create Appointment'
              : 'Create Working Day'
          }
        </Button>
        { this.state.currentForm === WORKING_DAY ? (
            <WorkingDayForm />
          ) : (
            <AppointmentForm />
          )
        }
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
)(Admin);
