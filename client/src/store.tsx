import React, { createContext, useReducer } from "react";
import { ActionNames, IAction, IState, TContext } from "./customTypes";
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
  AUTH,
} = ActionNames;
const reducer = (state = initialState, { type, payload }: IAction<any>) => {
  switch (type) {
    case SUCCESS_LOGIN:
      return { ...state, isAuth: payload, loading: false };
    case SUCCESS_REGISTER:
      return { ...state, loading: false };
    case FAILED_LOGIN:
    case FAILED_REGISTER:
    case LOGOUT:
      return { ...state, user: null, loading: false, isAuth: false };
    case AUTH:
      return {
        ...state,
        loading: false,
        isAuth: payload.isAuth,
        user: payload.user,
      };
    default:
      return state;
  }
};

export const Store = createContext<TContext | null>(null);

const Provider: React.FunctionComponent = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>
  );
};
export default Provider;
