import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from "@ngrx/store";
import { environment } from "../../../environments/environment";
import * as fromLoginInfo from "./login-info.reducer";
import * as fromLoginSelector from "../selectors/login-info.selector";

export interface State {
  loginInfo: fromLoginInfo.State;
}

export const reducers: ActionReducerMap<State> = {
  loginInfo: fromLoginInfo.reducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];

export const selectLoginInfoState = (state: State) => state.loginInfo;
export const getUsername = createSelector(
  selectLoginInfoState,
  fromLoginSelector.getUsername
);
export const getIsLogin = createSelector(
  selectLoginInfoState,
  fromLoginSelector.getIsLogin
);
export const getToken = createSelector(
  selectLoginInfoState,
  fromLoginSelector.getToken
);
