import { SET_LOADING } from '../actionTypes';

export default function app(state = { loading: false }, action) {
  switch (action.type) {
    case SET_LOADING:
      return Object.assign({}, state, {
        loading: action.value
      });
    default:
      return state;
  }
}

