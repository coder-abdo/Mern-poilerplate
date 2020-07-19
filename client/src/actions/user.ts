import { ActionNames, IAction, IUser } from "../customTypes";
const {
  FAILED_LOGIN,
  FAILED_REGISTER,
  LOGOUT,
  SUCCESS_LOGIN,
  SUCCESS_REGISTER,
  AUTH,
} = ActionNames;

const loginSuccess = (isAuth: boolean): IAction<boolean> => ({
  type: SUCCESS_LOGIN,
  payload: isAuth,
});
const auth = (payload: { user: IUser; isAuth: boolean }): IAction<any> => ({
  type: AUTH,
  payload,
});
const failedLogin = () => ({
  type: FAILED_LOGIN,
});
const successRegister = () => ({
  type: SUCCESS_REGISTER,
});
const failedRegister = () => ({
  type: FAILED_REGISTER,
});
const logout = () => ({
  type: LOGOUT,
});
export {
  loginSuccess,
  failedLogin,
  successRegister,
  failedRegister,
  logout,
  auth,
};
