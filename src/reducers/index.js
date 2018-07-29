import { combineReducers } from 'redux';
import { REQUEST_LIST, SUCCESS_LIST, FAILURE_LIST, CHANGE_VIEW, UPDATE_HAVE_LIST } from '../actions';

const initial = {
  status: 'init',
  error: false,
  list: [],
  have: [],
  selected: 'id'
};

const reducer = (state = initial, action) => {
  switch (action.type) {
  case REQUEST_LIST: {
    return { ...state, status: 'loading', error: false };
  }
  case SUCCESS_LIST: {
    return { ...state, status: 'done', error: false, list: action.payload.data };
  }
  case FAILURE_LIST: {
    return { ...state, status: 'done', error: true };
  }
  case CHANGE_VIEW: {
    return { ...state, selected: action.payload };
  }
  case UPDATE_HAVE_LIST: {
    let newHaveList = [];
    if (action.payload.action === 'add') {
      newHaveList = [...state.have, ...action.payload.list];
    } else {
      newHaveList = state.have.filter(id => {
        return action.payload.list.indexOf(id) === -1;
      });
    }
    return { ...state, have: newHaveList };
  }
  default:
    return state;
  }
};

export default combineReducers({ reducer });
