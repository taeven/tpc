import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { State } from "src/app/store/reducers";
import { getUsername } from "src/app/store/reducers";

@Component({
  selector: "app-sidenav",
  templateUrl: "./sidenav.component.html",
  styleUrls: ["./sidenav.component.css"]
})
export class SidenavComponent implements OnInit {
  constructor(private store: Store<State>) {}

  private username = "default";

  ngOnInit() {
    this.store.select(getUsername).subscribe(username => {
      this.username = username;
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
