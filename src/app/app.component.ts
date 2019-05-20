import { Component } from "@angular/core";
import { AuthService } from "../service";
import { Store } from "@ngrx/store";
import { getIsLogin } from "./store/reducers";
import { State } from "./store/reducers";
import { Login, Logout } from "./store/actions/login-info.actions";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "tpc";
  public islogin: number;
  public username = "default";
  public isFlash = true;

  private isLoginStore: boolean;

  constructor(private authService: AuthService, private store: Store<State>) {
    this.checkLogin();
  }

  private checkLogin() {
    this.authService.checkLogin().subscribe(res => {
      if (res.status == 200) {
        this.store.dispatch(
          new Login({
            isLogin: 1,
            username: res.username,
            token: res.token
          })
        );
      } else {
        this.store.dispatch(new Logout());
      }
    });
  }

  ngOnInit() {
    this.store.select(getIsLogin).subscribe(islogin => {
      console.log(islogin);
      this.islogin = islogin;
    });
  }
}
