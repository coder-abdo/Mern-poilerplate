import { ActionNames, IAction, IUser } from "../customTypes";
const {
  FAILED_LOGIN,
  FAILED_REGISTER,
  LOGOUT,
  SUCCESS_LOGIN,
  SUCCESS_REGISTER,
} = ActionNames;

const loginSuccess = (user: IUser): IAction<IUser> => ({
  type: SUCCESS_LOGIN,
  payload: user,
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
export { loginSuccess, failedLogin, successRegister, failedRegister, logout };
