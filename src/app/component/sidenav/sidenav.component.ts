import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { State } from "src/app/store/reducers";
import { getUsername } from "src/app/store/reducers";
import { AuthService } from "src/service";
import { Logout } from "src/app/store/actions/login-info.actions";

@Component({
  selector: "app-sidenav",
  templateUrl: "./sidenav.component.html",
  styleUrls: ["./sidenav.component.css"]
})
export class SidenavComponent implements OnInit {
  constructor(private store: Store<State>, private authService: AuthService) {}

  private username = "default";

  ngOnInit() {
    this.store.select(getUsername).subscribe(username => {
      this.username = username;
    });
  }

  public logout() {
    this.authService.logout().subscribe(res => {
      this.store.dispatch(new Logout());
    });
  }

  active = "";

  public toggle() {
    if (this.active === "") {
      this.active = "active";
    } else {
      this.active = "";
    }
  }
}
