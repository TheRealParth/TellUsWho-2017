import {Component, Inject} from '@angular/core';
import {AngularFire, AngularFireAuth, FirebaseAuth} from 'angularfire2';
import {AuthService} from "../services/auth.service";
import {AppState} from "../app.service";
import {Router} from "@angular/router";
import {AuthMethods} from "angularfire2";
import {AuthProviders} from "angularfire2";

@Component({
  selector: 'login',
  template: `

  <div class="barFix">
	<div id="main" class="auth"  style="padding:20px;">
	<h1>Tell Us Who Login</h1>
	<div >
	<div class="error">{{appState.get().authError}}</div>
    <input [(ngModel)]="ucid" type="text" placeholder="UCID">
    <br>
    <input [(ngModel)]="password" (keyup)="keyupHandler($event)" type="password" placeholder="Password">
    <br>
    <div style="width: 100%; text-align: right;">
    <button (click)="facebookLogin()" style="margin-right: 20px;margin-bottom: 20px; text-align: center; font-size: 17px; padding:0px; width: 100px; height: 50px;" id="navigator" >Facebook</button>
  <button style="margin-right: 20px;margin-bottom: 20px; text-align: center; font-size: 17px; padding:0px; width: 100px; height: 50px;" id="navigator"  (click)="login()">Login</button>
  </div>
  <div style="width: 100%; padding-right: 30px; padding-left: 30px; display: inline-flex; justify-content: space-between">

  <span><a (click)="router.navigateByUrl('forgot')">Forgot?</a></span><span><a (click)="router.navigateByUrl('signup')">Signup</a></span>
  </div>

	</div>
</div></div>
`,
})
export class Login {

  ucid: string = '';
  password: string = '';
  userData: any;
  constructor(private af: AngularFire, private appState: AppState, private router: Router, private authService: AuthService) {
    this.appState.set('authError', '')
    /*(s)=>console.log("success: " + s));*/
    // this.a.createUser({email: 'prp66@njit.edu', password: 'lolTroll1'})
    //   .catch((e)=>console.log('error: ', e))
    //   .then((success)=>console.log('success: ', success));
  }
  keyupHandler(e){
    if(e.keyCode == 13) {
      this.login();
    }
  }
  facebookLogin(){

    this.authService.facebookLogin().then((thing)=>console.log(thing));
  }
  login(){
    console.log("Email: ",this.ucid)
    console.log("Pass: ",this.password)
    this.authService.loginWithApi(this.ucid,this.password)
      .catch((e)=>{
        console.log(e)
      })
      .then(()=>{
        this.appState.set('authError', '');
        if(this.authService.redirectUrl) {
          this.router.navigateByUrl(this.authService.redirectUrl);
        } else {
          this.router.navigateByUrl('background-info');
        }
      });
  }
}
