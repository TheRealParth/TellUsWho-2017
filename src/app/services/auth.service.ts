import { Injectable } from '@angular/core';
import {  FirebaseAuth, FirebaseAuthState } from 'angularfire2';
import {ProgressService} from "./progress.service";
import {Router} from "@angular/router";
import {Subject} from "rxjs";
import {AppState} from "../app.service";
import {AngularFire} from "angularfire2";
import {AuthMethods} from "angularfire2";
import {AuthProviders} from "angularfire2";
import { Http,Headers ,RequestOptions} from '@angular/http';

let headers = new Headers({ 'Content-Type': 'application/json'});
let options = new RequestOptions({ headers: headers,withCredentials:true});
let base_url = 'http://resources.coo-e.com:8080/'

@Injectable()
export class AuthService {

  public authState: FirebaseAuthState = null;
  redirectUrl: string;
  phoneNumber: string;

  constructor(private http:Http, private af: AngularFire, public router: Router, public progressService: ProgressService, public auth: FirebaseAuth) {
        if(localStorage.getItem('userId')!=''){
            var userId = (localStorage.getItem('userId'))
            progressService.initiate(userId)
        }  
  }

  get authenticated(): boolean {
    return localStorage.getItem('user') !== null;
  }
  set phone(val: string){
    this.phoneNumber = val;
  }
  get phone(){
    return this.phoneNumber;
  }
  get id(): string {
    return this.authenticated ? localStorage.getItem('userId') : '';
  }
  get displayName(): string {
    var user = JSON.parse(localStorage.getItem('user'))
    if(this.authenticated){
        return user.firstName;
    } else return 'No Name';
  }
  get imageUrl(): any{
    if(this.authenticated){
        return true
      //return this.authState.auth.photoURL;
    } else return false;
  }
  get email(): string {
    var user = JSON.parse(localStorage.getItem('user'))
    return this.authenticated ? user.email : '';
  }
  signUp(fname, lname, uname, email, pwd, ph){
    var promise = this.http.post(base_url+'auth/signup',{
        firstName:fname,
        lastName:lname,
        username:uname,
        email:email,
        phone:ph,
        password:pwd
    },options)
    .map(response => response.json())
    .toPromise()

    return promise;
    //return this.auth.createUser({email: email, password: password, name: name});
  }
  facebookLogin(): firebase.Promise<FirebaseAuthState>{
    return this.auth.login({
      provider: AuthProviders.Facebook,
      method: AuthMethods.Redirect})
  }
  forgot(email: string){
    var promise = this.http.get(base_url+'auth/resetPassword/byEmail/'+email,options)
    .map(response => response.json())
    .toPromise()
    .then((res)=>{
      this.router.navigateByUrl('')
    })
    return promise;

  }
  logout() {
    localStorage.removeItem('userId')
    localStorage.removeItem('user')
    this.progressService.unsub();
    this.router.navigateByUrl('')
  }
  resetPassword(email: string): Promise<void> {
    //return firebase.auth().sendPasswordResetEmail(email);
  }
  loginWithApi(uname,pwd) {
    var promise = this.http.post(base_url+'auth/login',{
      username:uname,
      password:pwd
    },options)
    .map(response => response.json())
    .toPromise()
    .then((res)=>{
        localStorage.setItem('user', JSON.stringify(res.user));
        localStorage.setItem('userId', (res.user.id));
        this.progressService.initiate(res.user.id)
    })
    return promise;
  }
}
