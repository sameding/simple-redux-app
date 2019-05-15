import  {  AUTHENTICATE_USER, LOGOUT, RESET } from './types';

export const loginUser  = (payload ) => ({
      type: AUTHENTICATE_USER,
      payload
});

export const logoutUser = () => ({
    type: LOGOUT
});

export const clearStore = () => ({
    type: RESET
});
