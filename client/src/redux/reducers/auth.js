import { SIGN_IN, SIGN_OUT } from '../actionTypes';


export default function authenticate(
  state = {
    isAuthenticated: false,
    headers: {},
    user: {}
  },
  action
) {
  switch (action.type) {
    case SIGN_IN:
      return Object.assign({}, state, {
        isAuthenticated: true,
        headers: { ...action.payload.headers },
        user: { ...action.payload.user }
      });
    case SIGN_OUT:
      return Object.assign({}, state, {
        isAuthenticated: false,
        headers: {},
        user: {}
      });
    default:
      return state;
  }
}
