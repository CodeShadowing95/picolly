import { AUTH } from '../constants/actionTypes';
import * as api from '../api';

export const signin = (formData, navigate) => async (dispatch) => {
  try {
    // login user

    navigate('/');
  } catch (error) {
    console.log(error);
  }
}

export const signup = (formData, navigate) => async (dispatch) => {
  try {
    // signup user

    navigate('/');
  } catch (error) {
    console.log(error);
  }
}