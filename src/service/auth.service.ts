import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { CheckLoginResponse, LogoutResponse } from "../model";
import { ApiUrl } from "../constant";

const postOption = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  }),
  withCredentials: true
};

@Injectable()
export class AuthService {
  //---------------------------------------------------
  private check_url = ApiUrl.CHECK_LOGIN;
  private login_url = ApiUrl.LOGIN;
  private logout_url = ApiUrl.LOGOUT;
  //---------------------------------------------------

  constructor(private httpClient: HttpClient) {}

  public checkLogin(): Observable<CheckLoginResponse> {
    return this.httpClient.get<CheckLoginResponse>(this.check_url);
  }

  public login(credentials): Observable<CheckLoginResponse> {
    return this.httpClient.post<CheckLoginResponse>(
      this.login_url,
      credentials,
      postOption
    );
  }

  public logout(): Observable<LogoutResponse> {
    return this.httpClient.get<LogoutResponse>(this.logout_url);
  }
}
