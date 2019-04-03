import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Spinner, Table } from 'reactstrap';
import dayjs from 'dayjs';

import { setLoading } from '../redux/actions';


class Appointments extends Component {
    constructor(props) {
      super(props);
      this.state = { appointments: [] }
    }

    componentWillMount() {
      this.props.setLoading(true);
      fetch(
        `http://${this.props.apiUrl}/v1/appointments`,
        { headers: this.props.headers }
      ).then(response => {
        return response.json();
      }).then(json => {
        this.setState({ appointments: json.data }, () => {
          this.props.setLoading(false);
        })
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

function formatAppointment(appointment) {
  let time = dayjs(appointment.attributes.time).format('HH:mm');
  let date = dayjs(appointment.attributes['working-day'].date)
    .format('MMMM D');
  return { date, time }
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
  { setLoading }
)(Appointments);

