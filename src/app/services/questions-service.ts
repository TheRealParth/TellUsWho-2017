import {Injectable, Inject} from '@angular/core';
import {AuthProviders, FirebaseAuth, FirebaseObjectObservable, AngularFire} from 'angularfire2';
import {AuthService} from "./auth.service";
import {NavigatorService} from "./navigator.service";
import {FirebaseListObservable} from "angularfire2";
import {AppState} from "../app.service";


@Injectable()
export class QuestionsService {
  id: string;

  question: FirebaseObjectObservable<any>;
  multipleChoice: FirebaseListObservable<any[]>;

  constructor(private appState: AppState, private af: AngularFire,private navServ: NavigatorService, private authService: AuthService) {
    navServ.naviDone.subscribe(done=>{
      if(done && authService.authenticated){
        //TODO: load interests here....
      }
    })
  }

  answer(question: string): FirebaseObjectObservable<any> {
    if(this.appState.get().section == 'scientificSurvey')
    var QUESTION_URL = '/data/'+ this.authService.id + '/scientific/' + question;
    else
    var QUESTION_URL = '/users/'+ this.authService.id + '/profile/' + question;

    this.question = this.af.database.object(QUESTION_URL);
    return this.question;
  }
  setAnswer(question, answer): any {
    if(this.appState.get().section == 'scientificSurvey')
      var QUESTION_URL = '/data/'+ this.authService.id + '/scientific/' + question;
    else
      var QUESTION_URL = '/users/'+ this.authService.id + '/profile/' + question;

    this.question = this.af.database.object(QUESTION_URL);
    return this.question.set({value: answer});
  }
  answers(question): FirebaseListObservable<any[]>{
    if(this.appState.get().section == 'scientificSurvey')
      var QUESTION_URL = '/data/'+ this.authService.id + '/scientific/' + question;
    else
      var QUESTION_URL = '/users/'+ this.authService.id + '/profile/' + question;

    this.multipleChoice = this.af.database.list(QUESTION_URL);
    return this.multipleChoice;
  }
  setAnswers(question: string, answers: string[]): any {
    if(this.appState.get().section == 'scientificSurvey')
      var QUESTION_URL = '/data/'+ this.authService.id + '/scientific/' + question;
    else
      var QUESTION_URL = '/users/'+ this.authService.id + '/profile/' + question;

    this.multipleChoice = this.af.database.list(QUESTION_URL);
    this.multipleChoice.remove();
    answers.forEach((item)=> {console.log(item); this.multipleChoice.push({value: item})});
    return this.multipleChoice;
  }
  removeAnswer(question: string){
    if(this.appState.get().section == 'scientificSurvey')
      var QUESTION_URL = '/data/'+ this.authService.id + '/scientific/' + question;
    else
      var QUESTION_URL = '/users/'+ this.authService.id + '/profile/' + question;

    this.multipleChoice = this.af.database.list(QUESTION_URL);
    this.multipleChoice.remove();
  }
}
