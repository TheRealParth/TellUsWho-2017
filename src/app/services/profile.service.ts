import {Injectable, Inject} from '@angular/core';
import {AuthProviders, FirebaseAuth, FirebaseObjectObservable, FirebaseListObservable, AngularFire} from 'angularfire2';
import {AuthService} from "./auth.service";
import {NavigatorService} from "./navigator.service";
import {AppState} from "../app.service";

@Injectable()
export class ProfileService {
  organizations:FirebaseListObservable<any[]>;
  interests:FirebaseListObservable<any[]>;
  constructor(private appState: AppState, private af: AngularFire, private navServ: NavigatorService, private authService: AuthService) {
  }
  getOrganizations(){
    const Profile_URL = 'users/'+ this.authService.id + '/profile/organizations';
    this.organizations = this.af.database.list(Profile_URL);
    return this.organizations;
  }
  getAddedInterests(){
    const INTEREST_URL = '/data/'+ this.authService.id + '/interests/yourInterests/';
    this.interests = this.af.database.list(INTEREST_URL);
    return this.interests;
  }



  // update(shortName: string ) {
  //   const index = this.interests.findIndex((i: Interest) => i.shortName === shortName);
  //   const interest = this.interests.get(index);
  //   this.interests = this.interests.set(index, interest);
  // }
}
