import React, { createContext, useReducer } from "react";
import { ActionNames, IAction, IState } from "./customTypes";
const initialState = {
  user: null,
  isAuth: false,
  loading: true,
} as IState;
const {
  SUCCESS_LOGIN,
  LOGOUT,
  SUCCESS_REGISTER,
  FAILED_LOGIN,
  FAILED_REGISTER,
} = ActionNames;
const reducer = (state = initialState, { type, payload }: IAction<any>) => {
  switch (type) {
    case SUCCESS_LOGIN:
      return { ...state, isAuth: true, loading: false };
    case SUCCESS_REGISTER:
      return { ...state, loading: false };
    case FAILED_LOGIN:
    case FAILED_REGISTER:
    case LOGOUT:
      return { ...state, loading: false, isAuth: false };
    default:
      return state;
  }
};
export const Store = createContext<{
  state: IState;
  dispatch: React.Dispatch<IAction<any>>;
} | null>(null);

const Provider: React.FunctionComponent = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>
  );
};
export default Provider;
