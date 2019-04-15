import React, { Component } from "react";
import { Table } from 'reactstrap';


class UserList extends Component {
  render() {
    return (
      <div>
        <h1>Customers</h1>
          
        <Table striped>
          <thead>
            <tr>
              <th>User</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.userList.map(user => {
                return (
                  <tr key={user.id}>
                    <td>
                      {`\
                        ${user.attributes.firstName} \
                        ${user.attributes.lastName}\
                      `}
                    </td>
                    <td>{user.attributes.email}</td>
                  </tr>
                );
              })
            }
          </tbody>
        </Table>
      </div>
    );
  }
}

export default UserList;
