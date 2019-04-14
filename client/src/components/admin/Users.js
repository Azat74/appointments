import React, { Component } from "react";
import { connect } from 'react-redux';
import { Button, Spinner } from 'reactstrap';

import { fetchUsers, setLoading } from '../../redux/actions';
import UserList from './UserList';
import UserForm from './UserForm';


const USER_LIST = 'user_list';
const USER_FORM = 'user_form';

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = { users: [], current_state: USER_LIST }
  }

  componentWillMount() {
    this.props.setLoading(true);
    this.props.fetchUsers()
      .then((res) => {
        this.setState({ users: res.data });
        this.props.setLoading(false);
      });
  }

  toggleState = () => {
    this.state.current_state === USER_LIST
      ? this.setState({ current_state: USER_FORM })
      : this.setState({ current_state: USER_LIST });
  };

  render() {
    if (this.props.loading) {
      return <Spinner color='primary' />
    }

    return (
      <div className='container'>
        <Button outline color="success" onClick={this.toggleState}>
          New User
        </Button>

        { this.state.current_state === USER_LIST ? (
            <UserList userList={this.state.users} />
          ) : (
            <UserForm />
          )
        }
      </div>
    );
  }
}

export default connect(
  null,
  { fetchUsers, setLoading }
)(Users);
