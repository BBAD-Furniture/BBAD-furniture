/* global describe beforeEach afterEach it */

import { expect } from 'chai';
import mainReducer, { me, logout, getUser, removeUser } from './user'; //thunk craetors & action creators
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import { createStore } from 'redux';
import history from '../history';

const middlewares = [thunkMiddleware];
const mockStore = configureMockStore(middlewares);

describe('thunk creators', () => {
  let store;
  let mockAxios;

  const initialState = { user: {} };

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
    store = mockStore(initialState);
  });

  afterEach(() => {
    mockAxios.restore();
    store.clearActions();
  });

  describe('me', () => {
    it('eventually dispatches the GET USER action', () => {
      const fakeUser = { email: 'Cody' };
      mockAxios.onGet('/auth/me').replyOnce(200, fakeUser);
      return store.dispatch(me()).then(() => {
        const actions = store.getActions();
        expect(actions[0].type).to.be.equal('GET_USER');
        expect(actions[0].user).to.be.deep.equal(fakeUser);
      });
    });
  });

  describe('logout', () => {
    it('logout: eventually dispatches the REMOVE_USER action', () => {
      mockAxios.onDelete('/auth/logout').replyOnce(204);
      return store.dispatch(logout()).then(() => {
        const actions = store.getActions();
        expect(actions[0].type).to.be.equal('REMOVE_USER');
        expect(history.location.pathname).to.be.equal('/login');
      });
    });
  });
});

describe('action creators', () => {
  let testUser = {};
  beforeEach(() => {
    testUser = {
      email: 'bob@abc.com',
      firstName: 'Bob',
      lastName: 'Builder',
      fullName: 'Bob Builder',
      isAdmin: false,
      profilePic: 'https://i.stack.imgur.com/l60Hf.png'
    };
  });

  describe('get user action', () => {
    it('returns proper action', () => {
      expect(getUser(testUser)).to.be.deep.equal({
        type: 'GET_USER',
        user: testUser
      });
    });
  });
  describe('remove user action', () => {
    it('returns proper action', () => {
      expect(removeUser(testUser)).to.be.deep.equal({
        type: 'REMOVE_USER'
      });
    });
  });
});

describe('New Reducer', () => {
  let testStore,
    testUser = {};
  beforeEach('mock store for test', () => {
    testStore = createStore(mainReducer);
    testUser = {
      email: 'bob@abc.com',
      firstName: 'Bob',
      lastName: 'Builder',
      fullName: 'Bob Builder',
      isAdmin: false,
      profilePic: 'https://i.stack.imgur.com/l60Hf.png'
    };
  });

  it('has correct initial state', () => {
    expect(testStore.getState()).to.be.deep.equal({});
  });

  describe('get User', () => {
    it('returns correct user in state', () => {
      testStore.dispatch({ type: 'GET_USER', user: testUser });
      const newState = testStore.getState();
      expect(newState).to.be.deep.equal(testUser);
    });
  });

  describe('remove User', () => {
    it('empties user in state', () => {
      testStore.dispatch({ type: 'REMOVE_USER' });
      const newState = testStore.getState();
      expect(newState).to.be.deep.equal({});
    });
  });
});
