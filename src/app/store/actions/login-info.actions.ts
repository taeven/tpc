import { Action } from "@ngrx/store";

export enum LoginInfoActionTypes {
  LoadLoginInfos = "[LoginInfo] Load LoginInfos",
  Login = "[LoginInfo] Login",
  Logout = "[LoginInfo] Logout"
}

export class LoadLoginInfos implements Action {
  readonly type = LoginInfoActionTypes.LoadLoginInfos;
}

export class Login implements Action {
  readonly type = LoginInfoActionTypes.Login;
  constructor(
    public payload: { isLogin: number; username: string; token: string }
  ) {}
}
export class Logout implements Action {
  readonly type = LoginInfoActionTypes.Logout;
}
export type LoginInfoActions = Login | Logout;
