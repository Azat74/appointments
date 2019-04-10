import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Spinner, Table } from 'reactstrap';

import { formatAppointment } from '../Helper.js';
import { fetchAppointments, setLoading } from '../redux/actions';


class Appointments extends Component {
    constructor(props) {
      super(props);
      this.state = { appointments: [] }
    }

    componentWillMount() {
      this.props.setLoading(true);
      this.props.fetchAppointments()
      .then((json) => {
        this.setState({ appointments: json.data });
        this.props.setLoading(false);
      });
    }

    render() {
      if (this.props.loading) {
        return <Spinner color='primary' />
      }

      // TODO: Fix it, here just quick testing
      return (
        <div className='container'>
          <h1>Hello, {this.props.user.email}</h1>
          <Table striped>
            <thead>
              <tr>
                <th>Date</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              { 
                this.state.appointments.map(appointment => {
                  const { date, time } = formatAppointment(appointment);
                  return (
                    <tr key={appointment.id}>
                      <td>{date}</td>
                      <td>{time}</td>
                    </tr>
                  );
                })
              }
            </tbody>
          </Table>
        </div>
      )
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
  { fetchAppointments, setLoading }
)(Appointments);

