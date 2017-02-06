import {Injectable, Inject} from '@angular/core';
import {AuthProviders, FirebaseAuth, FirebaseObjectObservable, AngularFire} from 'angularfire2';
import {Subject} from "rxjs";
import {Router} from "@angular/router";


@Injectable()
export class ProgressService {
  checkProgress = {
  }
  progress: FirebaseObjectObservable<any>;
  private _isReady: boolean = false;
  public isReady: Subject<any> = new Subject();
  constructor(private router: Router, private af: AngularFire) {
  }


  initiate(id){
    if(id != '') {
      console.log(id)
      const PROGRESS_URL = '/users/' + id + '/progress';

      this.progress = this.af.database.object(PROGRESS_URL);
      this.SUB = this.progress.subscribe(item=> {
        this.checkProgress = item;
        if (!(item.itemCompleted >= 0)) {
          this.progress.update({ itemCompleted: 0 } )
            .then((status)=>console.log("New progress set"));
        }
        this.ready = true;
      });
    } else {
      this.ready = false;
    }
  }
  unsub(){
    this.SUB.unsubscribe();
  }
  public set ready(v: boolean){
    this._isReady = v;
    this.isReady.next(v);
  }
  public get ready(): boolean {
    return this._isReady;
  }
  get itemCompleted(): number {
    if(this.checkProgress.itemCompleted >= 0)  {
      return this.checkProgress.itemCompleted;
    } else {
      return 0;
    }
  }
  set itemCompleted(n: number) {
    if (this.itemCompleted < n)
    this.progress.update({itemCompleted: n}).then((status)=>{this.checkProgress.itemCompleted = n;});
  }

}
