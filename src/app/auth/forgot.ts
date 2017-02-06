import {Component, Inject} from '@angular/core';
import {AngularFire, AngularFireAuth, FirebaseAuth} from 'angularfire2';
import {AuthService} from "../services/auth.service";
import {AppState} from "../app.service";
import {Router} from "@angular/router";

@Component({
  moduleId: module.id,
  selector: 'forgot',
  template: `
  
  <div class="barFix">    
	<div id="main"  class="auth"  style="padding:20px;">
	<h1>Tell Us Who Login</h1>
	<div >
	<div class="error">{{appState.get().authError}}</div>
		<div *ngIf="appState.get().authSuccess" class="success">{{appState.get().authSuccess}}</div>
    <input [(ngModel)]="email" (keyup)="keyupHandler($event)"  type="email" placeholder="Email">
    <br>
    <div style="width: 100%; text-align: right;">
  <button style="margin-right: 20px;margin-bottom: 20px; text-align: center; font-size: 17px; padding:0px; width: 100px; height: 50px;" id="navigator"  (click)="forgot()">Send</button>
  </div>
  
  </div>
<div style="width: 100%; padding-right: 30px; padding-left: 30px; display: inline-flex; justify-content: space-between">
  <span><a (click)="router.navigateByUrl('login')">Login</a></span><span><a (click)="router.navigateByUrl('signup')">Signup</a></span>
  </div>
	</div>
</div>

  `,
})
export class Forgot {
  email: string = '';
  constructor(private af: AngularFire, private appState: AppState, private router: Router,  private authService: AuthService) {
  }
  keyupHandler(e){
    if(e.keyCode == 13) {
      this.forgot();
    }
  }
  forgot(){
    this.authService.forgot(this.email)
      .catch((e)=>this.appState.set('authError', e.message))
      .then((s)=>{
        console.log(s)
        this.appState.set('authError', ''); this.appState.set('authSuccess', "Email sent successfuly")
      });;
  }
}
