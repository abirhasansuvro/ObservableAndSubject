import { Component, OnInit, OnDestroy } from "@angular/core";
import { interval, Subscription, Observable } from "rxjs";
import { map, filter } from "rxjs/operators";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit, OnDestroy {
  private sbs: Subscription;
  masg: string;
  constructor() {}

  ngOnInit() {
    // this.sbs=interval(1000).subscribe((counter: number) => {
    //   console.log(counter);
    // });
    const obs = Observable.create(observer => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        count++;
        if (count == 3) observer.complete();
        if (count > 3) observer.error(new Error("Counter just exceeded 3!"));
      }, 1000);
    }).pipe(
      filter((data: number) => {
        return data % 2 == 1;
      }),
      map((data: number) => {
        return data + " th Round";
      })
    );
    this.sbs = obs.subscribe(
      data => {
        console.log(data);
      },
      error => {
        this.masg = error;
      },
      () => {
        this.masg = "Completed";
      }
    );
  }
  ngOnDestroy() {
    this.sbs.unsubscribe();
  }
}
