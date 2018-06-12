import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateUser, getUserOrders, getAllUsers } from '../store';
import { Link } from 'react-router-dom';
import { Table } from 'reactstrap';

/**
 * COMPONENT
 */
// export const UserHome = props => {
//   const {
//     fullName,
//     email,
//     profilePic,
//     reviews,
//     isAdmin,
//     resetPassword,
//     id
//   } = props.user;
//   const { handleClick, handleSubmit, users, order } = props;
//   let curUser = {};
//   if (Array.isArray(users) && users.length) {
//     curUser = users.find(userEle => userEle.id === props.user.id);
//     console.log('GOT CURR USER!!', curUser);
//   }

//   const handleSubmitFirst = evt => {
//     // evt.preventDefault();
//     const password = evt.target.password.value;
//     evt.target.password.value = '';
//     handleSubmit(id, password);
//   };

//   return (
//     <div>
//       {resetPassword ? (
//         <div>
//           <div>RESET YOUR PASSWORD</div>
//           <form onSubmit={handleSubmitFirst} name={name}>
//             <div>
//               <label htmlFor="password">
//                 <small>Password</small>
//               </label>
//               <input name="password" type="password" />
//             </div>
//             <button type="submit">Reset Password</button>
//           </form>
//         </div>
//       ) : (
//         <div>
//           <h3>Welcome, {fullName || email}</h3>
//           {isAdmin ? (
//             <div>
//               <h6>Administrator Account</h6>
//               <button type="button" onClick={handleClick}>
//                 View All Users
//               </button>
//               <Link to="/addproduct">Add Products</Link>
//             </div>
//           ) : null}
//           <img src={profilePic} width="500" height="300" />
//           <div>{email}</div>
//           <h3>Order History</h3>
//           <Table hover>
//             <thead>
//               <tr>
//                 <th>Order Number</th>
//                 <th>Date of Order</th>
//               </tr>
//             </thead>
//             <tbody>
//               {(curUser.orders || order || []).map(ord => {
//                 if (ord.status) {
//                   return (
//                     <tr key={ord.id}>
//                       <td>
//                         <Link to={`/${ord.id}/orderInfo`}>
//                           Order Number # {ord.id}
//                         </Link>
//                       </td>
//                       <td>{ord.updatedAt.slice(0, 10)}</td>
//                     </tr>
//                   );
//                 }
//               })}
//             </tbody>
//           </Table>
//           <h3>My Reviews</h3>
//           {(curUser.reviews || reviews) &&
//             (curUser.reviews || reviews).map(review => (
//               <div key={review.id}>
//                 --->
//                 {review.review}
//               </div>
//             ))}
//         </div>
//       )}
//     </div>
//   );
// };

// /**
//  * CONTAINER
//  */
// const mapState = state => {
//   return {
//     user: state.user,
//     users: state.allUsers,
//     order: state.order
//   };
// };

// const mapDispatch = (dispatch, ownProps) => {
//   return {
//     handleClick() {
//       dispatch(getAllUsers());
//       ownProps.history.push('/users');
//     },
//     handleSubmit(id, password) {
//       dispatch(updateUser(id, { password: password, resetPassword: false }));
//     },
//     getUserOrders: userId => {
//       dispatch(getUserOrders(userId));
//     }
//   };
// };

// export default connect(mapState, mapDispatch)(UserHome);

// /**
//  * PROP TYPES
//  */
// UserHome.propTypes = {
//   email: PropTypes.string
// };

class UserHome extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmitFirst = this.handleSubmitFirst.bind(this);
  }

  componentDidMount() {
    this.props.getUserOrders(this.props.user.id);
  }

  handleSubmitFirst(evt) {
    const password = evt.target.password.value;
    this.props.handleSubmit(this.props.user.id, password);
    evt.target.password.value = '';
  }
  render() {
    const {
      fullName,
      email,
      profilePic,
      reviews,
      isAdmin,
      resetPassword,
      id
    } = this.props.user;
    const { handleClick, handleSubmit, users, order } = this.props;

    return (
      <div>
        {resetPassword ? (
          <div>
            <div>RESET YOUR PASSWORD</div>
            <form onSubmit={this.handleSubmitFirst} name={name}>
              <div>
                <label htmlFor="password">
                  <small>Password</small>
                </label>
                <input name="password" type="password" />
              </div>
              <button type="submit">Reset Password</button>
            </form>
          </div>
        ) : (
          <div>
            <h3>Welcome, {fullName || email}</h3>
            {isAdmin ? (
              <div>
                <h6>Administrator Account</h6>
                <button type="button" onClick={this.props.handleClick}>
                  View All Users
                </button>
                <Link to="/addproduct">Add Products</Link>
              </div>
            ) : null}
            <img src={profilePic} width="500" height="300" />
            <div>{email}</div>
            <h3>Order History</h3>
            <Table hover>
              <thead>
                <tr>
                  <th>Order Number</th>
                  <th>Date of Order</th>
                </tr>
              </thead>
              <tbody>
                {(order || []).map(ord => {
                  if (ord.status) {
                    return (
                      <tr key={ord.id}>
                        <td>
                          <Link to={`/${ord.id}/orderInfo`}>
                            Order Number # {ord.id}
                          </Link>
                        </td>
                        <td>{ord.updatedAt.slice(0, 10)}</td>
                      </tr>
                    );
                  }
                })}
              </tbody>
            </Table>
            <h3>My Reviews</h3>
            {reviews &&
              reviews.map(review => (
                <div key={review.id}>
                  --->
                  {review.review}
                </div>
              ))}
          </div>
        )}
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user,
    users: state.allUsers,
    order: state.order
  };
};

const mapDispatch = (dispatch, ownProps) => {
  return {
    handleClick() {
      dispatch(getAllUsers());
      ownProps.history.push('/users');
    },
    handleSubmit(id, password) {
      dispatch(updateUser(id, { password: password, resetPassword: false }));
    },
    getUserOrders: userId => {
      dispatch(getUserOrders(userId));
    }
  };
};

export default connect(mapState, mapDispatch)(UserHome);

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
};
