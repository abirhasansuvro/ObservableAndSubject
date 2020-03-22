import { Component, OnInit, OnDestroy } from "@angular/core";
import { userService } from "./user/user.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit, OnDestroy {
  is_activated: boolean = false;
  private activatedSubs: Subscription;
  constructor(private userServe: userService) {}

  ngOnInit() {
    this.activatedSubs = this.userServe.activateUser.subscribe(
      value => (this.is_activated = value)
    );
  }
  ngOnDestroy() {
    this.activatedSubs.unsubscribe();
  }
}
