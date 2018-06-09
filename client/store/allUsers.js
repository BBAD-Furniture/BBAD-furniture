import axios from 'axios';

const GET_USERS = 'GET_USERS';
const DELETE_USER = 'DELETE_USER';
const UPDATE_ADMIN_STATUS = 'UPDATE_ADMIN_STATUS';

const getUsers = users => ({
  type: GET_USERS,
  users
});

const deleteUser = id => ({
  type: DELETE_USER,
  id
});

const updateAdminStatus = () => ({
  type: UPDATE_ADMIN_STATUS
});

export const getAllUsers = () => dispatch =>
  axios
    .get('/api/users')
    .then(res => dispatch(getUsers(res.data)))
    .catch(err => console.log(err));

//delete user
export const deleteTheUser = userId => dispatch =>
  axios
    .delete(`/api/users/${userId}`)
    .then(res => dispatch(deleteUser(res.data)))
    .catch(err => console.log(err));

//update user
export const updateUserAdminStat = (userId, userAdminStatus) => dispatch => {
  axios
    .put(`/api/users/${userId}`, userAdminStatus)
    .then(res => dispatch(updateAdminStatus(res.data)))
    .catch(err => console.log(err));
};

export default (state = [], action) => {
  switch (action.type) {
    case GET_USERS:
      return action.users;
    case DELETE_USER:
      return state.filter(user => user.id !== action.id);
    case UPDATE_ADMIN_STATUS:
      console.log('User stauts Updated');
      return state;
    default:
      return state;
  }
};
