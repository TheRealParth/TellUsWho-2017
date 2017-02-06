import {Component, Inject} from '@angular/core';
import {AngularFire, AngularFireAuth,firebaseAuthConfig, FirebaseAuth} from 'angularfire2';
import {AuthService} from "../services/auth.service";
import {AppState} from "../app.service";
import {Router} from "@angular/router";
import {AuthMethods} from "angularfire2";
import {AuthProviders} from "angularfire2";

@Component({
  selector: 'signup',
  template: `

  <div class="barFix">
	<div id="main" class="auth"  style="padding:20px;">
	<h1>Welcome</h1>
	<div >
	<div class="error">{{appState.get().authError}}</div>
    <input [(ngModel)]="fname" type="text" placeholder="First Name">
    <br>
    <input [(ngModel)]="lname" type="text" placeholder="Last Name">
    <br>
    <input [(ngModel)]="uname" type="text" placeholder="User Name">
    <br>
    <input [(ngModel)]="email" type="email" placeholder="Email">
    <br>
    <input [(ngModel)]="contact" type="number" placeholder="Phone Number">
    <br>
    <input [(ngModel)]="password"  type="password" placeholder="Password">
    <br>
    <input [(ngModel)]="confirmPassword" (keyup)="keyupHandler($event)" type="password" placeholder="Confirm Password">
    <br>
    <div style="width: 100%; text-align: right;">
    <button  (click)="facebookLogin()">facebook</button>
  <button style="margin-right: 20px;margin-bottom: 20px; text-align: center; font-size: 17px; padding:0px; width: 100px; height: 50px;" id="navigator"  (click)="signup()">Signup</button>
  </div>

  </div>
  <div style="width: 100%; padding-right: 30px; padding-left: 30px; display: inline-flex; justify-content: space-between">
  <span><a (click)="router.navigateByUrl('forgot')">Forgot?</a></span><span><a (click)="router.navigateByUrl('login')">Login</a></span>
  </div>
	</div>
</div>

  `,
})
export class SignUp {
  fname: string = '';
  lname: string = '';
  uname: string = '';
  email: string= '';
  contact = '';
  password: string= '';
  confirmPassword: string= '';
  constructor(private af: AngularFire, private router: Router, private appState: AppState,  private authService: AuthService) {
    /*(s)=>console.log("success: " + s));*/
    // this.a.createUser({email: 'prp66@njit.edu', password: 'lolTroll1'})
    //   .catch((e)=>console.log('error: ', e))
    //   .then((success)=>console.log('success: ', success));
  }
  keyupHandler(e){
    if(e.keyCode == 13) {
      this.signup();
    }
  }
  facebookLogin(){

    this.af.auth.login({
      provider: AuthProviders.Facebook,
      method: AuthMethods.Redirect});
  }
  signup(){
    this.appState.set('authError', '')
    if(this.password.length && this.email.length && this.contact!='') {
      if (this.password === this.confirmPassword) {
        this.appState.set('authError', '')
        this.authService.signUp(this.fname, this.lname, this.uname, this.email, this.password, this.contact)
          .catch((e)=>{
            this.appState.set('authError', e.message);
          })
          .then(
            (data) => {
              console.log(data.user)
              if(data.user!=undefined){
                // if(data.code)
                // {
                //   this.appState.set('authError', data.message);
                // }
                this.appState.set('authError', '');
                if(this.authService.redirectUrl){
                  this.router.navigateByUrl(this.authService.redirectUrl);
                } else {
                  //this.authService.authState.auth.sendEmailVerification();
                  this.appState.set('terms', true);
                  this.router.navigateByUrl('background-info')}
              }
              else{
                console.log("else")
                this.appState.set('authError', data.message.message);
              }
            });
      } else {
        this.appState.set('authError', 'Passwords do not match')
      }
    } else {
      this.appState.set('authError', 'Incomplete Fields')
    }
  }
}
