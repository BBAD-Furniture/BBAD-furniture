import React from 'react';
import { connect } from 'react-redux';
import { Sidebar } from './index';
import { Table } from 'reactstrap';
import { deleteTheUser, updateUser } from '../store';
import '../styles/AllUsers.css';

const AllUsers = props => {
  const { allUsers, handleClick, currentUser, handleChange } = props;
  return !currentUser.isAdmin ? (
    <h3>You don't have access</h3>
  ) : (
    <div>
      <div className="flexWrap">
        <div className="product-main">
          <Table hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Fullname</th>
                <th>Email</th>
                <th>Admin Status</th>
                <th>Delete User</th>
                <th>Password Reset</th>
              </tr>
            </thead>
            <tbody>
              {allUsers.map((user, idx) => {
                return currentUser.id !== user.id ? (
                  <tr key={user.id}>
                    <th scope="row">{++idx}</th>
                    <td>{user.fullName}</td>
                    <td>{user.email}</td>
                    <td>
                      <select
                        id={user.id}
                        onChange={() => handleChange(user.id)}>
                        <option value={String(user.isAdmin)}>
                          {String(user.isAdmin)}
                        </option>
                        <option value={String(!user.isAdmin)}>
                          {String(!user.isAdmin)}
                        </option>
                      </select>
                    </td>

                    <td
                      className="closebtn"
                      name="delete"
                      onClick={() => handleClick('delete', user.id)}>
                      X
                    </td>
                    <td
                      className="closebtn"
                      onClick={() => handleClick('reset', user.id)}>
                      O
                    </td>
                  </tr>
                ) : null;
              })}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

const mapProducts = state => {
  return {
    allUsers: state.allUsers,
    currentUser: state.user
  };
};
const mapDispatch = dispatch => {
  return {
    handleClick(type, id) {
      switch (type) {
        case 'delete':
          dispatch(deleteTheUser(id));
          break;
        case 'reset':
          dispatch(updateUser(id, { resetPassword: true }));
          break;
        default:
          break;
      }
    },
    handleChange(userId) {
      const selectOptionValue = document.getElementById(userId);
      var optionValue =
        selectOptionValue.options[selectOptionValue.selectedIndex].value;
      dispatch(updateUser(userId, { isAdmin: optionValue }));
    }
  };
};
export default connect(mapProducts, mapDispatch)(AllUsers);
