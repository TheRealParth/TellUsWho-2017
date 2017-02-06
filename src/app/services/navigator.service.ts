import {Injectable} from '@angular/core';
import {ProgressService} from "./progress.service";
import {Router} from "@angular/router";
import {Subject} from "rxjs";
import {Routey} from '../models/routey.enum';
import {AppState} from "../app.service";


@Injectable()
export class NavigatorService {
  sectionIndex: number = 0;
  routeIndex: number = 0;
  initRoute: string = '';
  public routey = Routey;
  public naviDone = new Subject();
  constructor( private router: Router, private appState: AppState, private completed: ProgressService) {
    this.appState.set('isLoading', false);
    console.log("navigator")
    completed.isReady.subscribe(stuff=>{
      console.log(stuff)
      if(!stuff) this.naviDone.next(true);
      if(stuff) {

        this.itemCompleted = this.completed.itemCompleted;
        this.setSection()
        var initRouteIndex = this.routey.urlToIndex(this.initRoute);
        if ((initRouteIndex <= this.completed.itemCompleted)  && (initRouteIndex > -1)) {
          console.log("traveller", this.initRoute)
          this.router.navigateByUrl(this.initRoute);
          this.naviDone.next(true)
        } else {
          console.log("curr page", this.currentPage)
          this.router.navigateByUrl(this.currentPage);
          this.naviDone.next(true)
        }
      }
    })
  }
  next(){
    this.itemCompleted+=1;
    if(this.completed.itemCompleted <= this.itemCompleted ) this.completed.itemCompleted = this.itemCompleted;
    this.router.navigateByUrl( this.routey.indexToUrl(this.itemCompleted));
    this.setSection();
  }
  get section(): number{
    return this.sectionIndex;
  }
  set section(n: number){
    this.sectionIndex = n;
  }
  get itemCompleted():number {
    return this.routeIndex;
  }
  set itemCompleted(n: number) {
    this.routeIndex = n;
  }
  get currentPage(): string {
    return this.routey.indexToUrl(this.itemCompleted);
  }
  get profileBuilder(): boolean{
    return (this.routeIndex > 2 && this.routeIndex < 6) || this.routeIndex == 13;
  }
  canVisit(url: string):boolean{
    url ='/' + url;
      if(this.routey.urlToIndex(url) <= this.completed.itemCompleted + 1 ) {return true;}
     return false;
  }

  setSection(){
    if(this.routeIndex > 2)
      this.section = 1;
    if(this.routeIndex > 4)
      this.section = 2;
    if(this.routeIndex > 12)
      this.section = 3;
    if(this.routeIndex > 13)
      this.section = 4;
  }

}
