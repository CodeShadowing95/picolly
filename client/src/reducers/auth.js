import { AUTH, LOGOUT } from '../constants/actionTypes';

const authReducer = (state = { authData: null } , action) => {
  switch (action.type) {
    case AUTH:
      // console.log(action?.data);

      /* This line of code is setting an item in the browser's local storage with the key "profile" and
      the value of a JSON stringified version of the `data` property of the `action` object. The
      `?.` is the optional chaining operator, which checks if the `data` property exists before
      trying to access it. If it doesn't exist, `undefined` will be stored in the local storage. */
      localStorage.setItem('profile', JSON.stringify({ ...action?.data }));

      return { ...state, authData: action?.data };
    case LOGOUT:
      localStorage.clear();

      return { ...state, authData: null };
    default:
      return state;
  }
}

export default authReducer;