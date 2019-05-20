import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/service";
import { Store } from "@ngrx/store";
import { Login } from "src/app/store/actions/login-info.actions";
import { State } from "src/app/store/reducers";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  public cred = {
    username: "",
    password: ""
  };

  constructor(private authService: AuthService, private store: Store<State>) {}

  public login() {
    this.authService.login(this.cred).subscribe(res => {
      console.log(res);
      if (res.status == 200) {
        this.store.dispatch(
          new Login({
            isLogin: 1,
            username: res.username,
            token: res.token
          })
        );
      }
    });
  }

  ngOnInit() {}
}
