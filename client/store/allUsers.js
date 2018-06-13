import axios from 'axios';
import notify from '../components/notify';

const GET_USERS = 'GET_USERS';
const DELETE_USER = 'DELETE_USER';
const UPDATE_USER = 'UPDATE_USER';

const getUsers = users => ({
  type: GET_USERS,
  users
});

const deleteUser = id => ({
  type: DELETE_USER,
  id
});

const updateUserInfo = user => ({
  type: UPDATE_USER,
  user
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
    .then(() => notify('User has been deleted.'))
    .catch(err => console.log(err));

//update user
export const updateUser = (userId, userInfo) => dispatch => {
  axios
    .put(`/api/users/${userId}`, userInfo)
    .then(res => dispatch(updateUserInfo(res.data)))
    .then(() => notify('User Info updated.'))
    .catch(err => console.log(err));
};

export default (state = [], action) => {
  switch (action.type) {
    case GET_USERS:
      return [...action.users];
    case DELETE_USER:
      return state.filter(user => user.id !== action.id);
    case UPDATE_USER:
      return state.map(user => {
        if (user.id === action.user.id) {
          user = action.user;
        }
        return user;
      });
    default:
      return state;
  }
};
