export enum ActionNames {
  SUCCESS_LOGIN = "SUCCESS_LOGIN",
  FAILED_LOGIN = "FAILED_LOGIN",
  SUCCESS_REGISTER = "SUCCESS_REGISTER",
  FAILED_REGISTER = "FAILED_REGISTER",
  LOGOUT = "LOGOUT",
}

export interface IAction<T> {
  type: string;
  payload: T;
}
export interface IUser {
  name?: string;
  _id?: string;
  email: string;
  password: string;
}
export interface IState {
  user: IUser | null;
  isAuth: boolean;
  loading: boolean;
}
