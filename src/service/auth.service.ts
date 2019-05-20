import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { CheckLoginResponse } from "../model";
import { ApiUrl } from "../constant";

const postOption = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  }),
  withCredentials: true
};

@Injectable()
export class AuthService {
  private check_url = ApiUrl.CHECK_LOGIN;
  private login_url = ApiUrl.LOGIN;
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

  

  //   public registerBatteryPack(postparm: RegisterBatteryPost): Observable<RegisterBatteryResponse> {
  //     return this.httpClient.post<RegisterBatteryResponse>(this.url, postparm, postOption);
  //   }

  //   public fetchUnassociatedBmsId(): Observable<FetchBmsResponse> {
  //     return this.httpClient.get<FetchBmsResponse>(this.bmsurl);
  //   }
}
