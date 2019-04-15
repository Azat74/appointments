import React, { Component } from "react";
import { connect } from 'react-redux';
import { Spinner } from 'reactstrap';
import dayjs from 'dayjs';

import { formatUserName } from '../../Helper';
import { fetchWorkingDays, setLoading } from '../../redux/actions';


class Calendar extends Component {
  constructor(props) {
    super(props);
    // TODO: Try to find better solution
    this.state = { workingDays: [], included: [] }
  }

  componentWillMount() {
    this.props.setLoading(true);
    this.props.fetchWorkingDays()
      .then((json) => {
        this.setState({ workingDays: json.data, included: json.included });
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
                this.state.included.filter((value) => {
                  if (value.type !== 'appointments') {
                    return false;
                  }
                  const id = value.relationships.workingDay.data.id;
                  return id === day.id;
                });
              return (
                <div key={day.id} className="col-sm-3">
                  <h4>{date}</h4>
                  <div>
                    {
                      appointments.map(appointment => {
                        const time = dayjs(appointment.attributes.time)
                          .format('HH:mm');
                        const user_id = appointment.relationships.user.data.id;
                        const userIndex =
                          this.state.included.findIndex((value) => {
                            if (value.type !== 'users') {
                              return false;
                            }
                            return value.id === user_id;
                          });
                        const user = this.state.included[userIndex];
                        return (
                          <div key={appointment.id}>
                            {`${formatUserName(user)} ${time}`}
                          </div>
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
