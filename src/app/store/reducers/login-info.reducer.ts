import { Action } from "@ngrx/store";
import {
  LoginInfoActionTypes,
  LoginInfoActions
} from "../actions/login-info.actions";

export interface State {
  isLogin: number;
  username: string;
  token: string;
}

export const initialState: State = {
  isLogin: -1,
  username: "",
  token: ""
};

export function reducer(state = initialState, action: LoginInfoActions): State {
  switch (action.type) {
    case LoginInfoActionTypes.Login:
      return {
        ...state,
        
        username: action.payload.username,
        token: action.payload.token,
        isLogin: 1
      };
    case LoginInfoActionTypes.Logout:
      return { ...state, username: "", token: "", isLogin: 0 };
    default:
      return state;
  }
}
