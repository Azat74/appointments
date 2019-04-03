import { SIGN_IN, SET_LOADING, SIGN_OUT } from './actionTypes';


export const requestAuth = (email, password) => {
  return function(dispatch, getState) {
    const baseUrl = getState().api.url;
    return fetch(
      `http://${baseUrl}/auth/sign_in`,
      {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password })
      }
    ).then(
       response => {
         // TODO: Add logic when response false
         const allowedHeaders = [
           'access-token',
           'token-type',
           'client',
           'expiry',
           'uid'
         ];

         const headers = {};
         allowedHeaders.forEach((header) => {
           headers[header] = response.headers.get(header);
         });

         response.json().then((json) => {
          const user = {
            firstName: json.data.first_name,
            lastName: json.data.last_name,
            email: json.data.email,
            isAdmin: json.data.is_admin
          };

          dispatch(signIn(headers, user));
         });
       }
     );
  }
};

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
