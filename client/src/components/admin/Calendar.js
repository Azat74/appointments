import React, { Component } from "react";
import { connect } from 'react-redux';
import { Spinner } from 'reactstrap';
import dayjs from 'dayjs';

import { fetchWorkingDays, setLoading } from '../../redux/actions';


class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = { workingDays: [], appointments: [] }
  }

  componentWillMount() {
    this.props.setLoading(true);
    this.props.fetchWorkingDays()
      .then((json) => {
        this.setState({ workingDays: json.data, appointments: json.included});
        this.props.setLoading(false);
      });
  }

  render() {
    if (this.props.loading) {
      return <Spinner color='primary' />
    }

    return (
      <div className='container'>
        <h1>Schedule</h1>
        <div className="row">
          {
            this.state.workingDays.map(day => {
              let date = dayjs(day.attributes.date).format('MMMM D');
              const appointments =
                this.state.appointments.filter((appointment) => {
                  const id = appointment.relationships['working-day'].data.id;
                  return id === day.id
                });
              return (
                <div key={day.id} className="col-sm-3">
                  <h4>{date}</h4>
                  <div>
                    {
                      appointments.map(appointment => {
                        let time = dayjs(appointment.attributes.time)
                          .format('HH:mm');
                        return (
                          <div key={appointment.id}>{time}</div>
                        )
                      })
                    }
                  </div>
                </div>
              );
            })
          }
        </div>
      </div>
    )
  }
}

export default connect(
  null,
  { fetchWorkingDays, setLoading }
)(Calendar);
