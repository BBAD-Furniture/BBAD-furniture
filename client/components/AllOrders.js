import React from 'react';
import { connect } from 'react-redux';
import { Sidebar } from './index';
import { Table } from 'reactstrap';
import { getAllUsers } from '../store';
import '../styles/AllOrders.css';

const AllOrders = props => {
  const { allUsers, handleClick, currentUser, handleChange } = props;
  return !currentUser.isAdmin ? null : null;
};

const mapProducts = state => {
  return {
    allUsers: state.allUsers,
    currentUser: state.user
  };
};
const mapDispatch = dispatch => {
  return {
    // dispatch(getAllUsers());
  };
};
export default connect(mapProducts, mapDispatch)(AllOrders);
