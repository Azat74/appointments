import axios from 'axios';

import { SIGN_IN, SET_LOADING, SIGN_OUT } from './actionTypes';


export const requestAuth = (email, password) => {
  return function(dispatch, getState) {
    const apiUrl = getState().api.url;
    return axios({
      method: 'post',
      url: `http://${apiUrl}/auth/sign_in`,
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify({ email, password })
    })
      .then(
        res => {
          const headers = {
            'access-token': res.headers['access-token'],
            'token-type': res.headers['token-type'],
            client: res.headers.client,
            expiry: res.headers.expiry,
            uid: res.headers.uid
          };

          const user = {
            firstName: res.data.data.first_name,
            lastName: res.data.data.last_name,
            email: res.data.data.email,
            isAdmin: res.data.data.is_admin
          };

          dispatch(signIn(headers, user));
        }
      );
  }
};

export const fetchAppointments = (value = true) => {
  return function(dispatch, getState) {
    const apiUrl = getState().api.url;
    const user = getState().authenticate.user;
    const query = user.isAdmin ? '' : `?active=${value}`
    return axios({
      method: 'get',
      url: `http://${apiUrl}/v1/appointments` + query,
      headers: getState().authenticate.headers
    })
      .then(res => res.data);
  }
};

export const fetchUsers = () => {
  return function(dispatch, getState) {
    const apiUrl = getState().api.url;
    return axios({
      method: 'get',
      url: `http://${apiUrl}/v1/users`,
      headers: getState().authenticate.headers
    })
      .then(res => res.data);
  }
}

export const findUser = (query) => {
  return function(dispatch, getState) {
    const apiUrl = getState().api.url;
    return axios({
      method: 'get',
      url: `http://${apiUrl}/v1/users`,
      headers: getState().authenticate.headers,
      params: { q: query }
    });
  }
}

export const createAppointment = (time, user, workingDay) => {
  return function(dispatch, getState) {
    const apiUrl = getState().api.url;
    return axios({
      method: 'post',
      url: `http://${apiUrl}/v1/appointments`,
      headers: {
        'Content-Type': 'application/json',
        ...getState().authenticate.headers
      },
        data: JSON.stringify({
          appointment: { 
            time,
            user_id: user,
            working_day_id: workingDay
          } 
        })
    });
  }
}

export const createWorkingDay = (date) => {
  return function(dispatch, getState) {
    const apiUrl = getState().api.url;
    return axios({
      method: 'post',
      url: `http://${apiUrl}/v1/working_days`,
      headers: {
        'Content-Type': 'application/json',
        ...getState().authenticate.headers
      },
      data: JSON.stringify({ working_day: { date } })
    });
  }
}

export const requestLogOut = () => {
  return function(dispatch, getState) {
    const apiUrl = getState().api.url;
    return axios({
      method: 'delete',
      url: `http://${apiUrl}/auth/sign_out`,
      headers: getState().authenticate.headers
    });
  }
}

export const fetchWorkingDays = () => {
  return function(dispatch, getState) {
    const apiUrl = getState().api.url;
    return axios({
      method: 'get',
      url: `http://${apiUrl}/v1/working_days`,
      headers: getState().authenticate.headers
    })
      .then(res => res.data);
  }
}

export const signIn = (headers, user) => ({
  type: SIGN_IN,
  payload: {
    headers,
    user
  }
});

export const setLoading = (value) => ({
  type: SET_LOADING,
  value
});

export const signOut = () => ({
  type: SIGN_OUT
});
