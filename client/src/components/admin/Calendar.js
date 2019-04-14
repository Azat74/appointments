import React, { Component } from "react";
import { connect } from 'react-redux';
import { Spinner, Table } from 'reactstrap';

import { formatAppointment } from '../../Helper.js';
import { fetchAppointments, setLoading } from '../../redux/actions';


class Calendar extends Component {
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

    return (
      <div className='container'>
        <h1>Hello, {this.props.user.email}</h1>
        <Table striped>
          <thead>
            <tr>
              <th>Date</th>
              <th>Customer</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            { 
              this.state.appointments.map(appointment => {
                const { date, time } = formatAppointment(appointment);
                const user = appointment.attributes.user;
                return (
                  <tr key={appointment.id}>
                    <td>{date}</td>
                    <td>{`${user.first_name} ${user.last_name}`}</td>
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
    user: state.authenticate.user
  };
};

export default connect(
  mapStateToProps,
  { fetchAppointments, setLoading }
)(Calendar);
