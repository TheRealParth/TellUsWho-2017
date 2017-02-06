import {Injectable, Inject} from '@angular/core';
import {AuthProviders, FirebaseAuth, FirebaseObjectObservable, FirebaseListObservable, AngularFire} from 'angularfire2';
import {AuthService} from "./auth.service";
import {NavigatorService} from "./navigator.service";
import {AppState} from "../app.service";
import {Interest} from "../models/interest.model";
import {INTERESTS} from '../models/interests';

@Injectable()
export class InterestService {
  id: string;

  question: FirebaseObjectObservable<any>;
  multipleChoice: FirebaseListObservable<any[]>;
  interests = INTERESTS;
  constructor(private appState: AppState, private af: AngularFire, private navServ: NavigatorService, private authService: AuthService) {
  }
  saveInterest(i: Interest){
    const INTEREST_URL = '/data/'+ this.authService.id + '/interests/yourInterests/' + i.shortName;
    console.log("HERE2");
    console.log(i.answers);
    this.question = this.af.database.object(INTEREST_URL);
    if(i.removed)
      const removedKey = {shortName: i.shortName, name: i.name, answers: [], completed: i.completed, removed: i.removed, options: i.options, title: i.title}
    else
      const removedKey = {shortName: i.shortName, name: i.name, answers: i.answers, completed: i.completed, removed: i.removed, options: i.options, title: i.title}
    return this.question.update(removedKey);
  }
  saveAnswers(shortName, answers){
    const INTEREST_URL = '/data/'+ this.authService.id + '/interests/yourInterests/' + shortName;

    this.question = this.af.database.object(INTEREST_URL);
    return this.question.update({answers: answers});
  }
  getInterests(){
    const INTEREST_URL = '/data/'+ this.authService.id + '/interests/yourInterests/';
    this.multipleChoice = this.af.database.list(INTEREST_URL);
    return this.multipleChoice;
  }


  // update(shortName: string ) {
  //   const index = this.interests.findIndex((i: Interest) => i.shortName === shortName);
  //   const interest = this.interests.get(index);
  //   this.interests = this.interests.set(index, interest);
  // }
}
