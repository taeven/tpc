import { State } from "../reducers/login-info.reducer";

export const getUsername = (state: State) => state.username;
export const getIsLogin = (state: State) => state.isLogin;
export const getToken = (state: State) => state.token;
