import {Component, OnInit}      from '@angular/core'
import {ChooseFive} from "../UI/choose-five";
import {AppState} from "../app.service";
import {NavigatorService} from "../services/navigator.service";
import {QuestionsService} from "../services/questions-service";
import {Survey} from "../models/basic-survey.model";
import {socQuestions} from '../options/surveyQuestions';
@Component({
  selector: "senseOfCommunity-info",
  providers: [ NavigatorService, QuestionsService],
  template: `
<h2 style="font-size: 1.5em;
    text-align: center;
    margin-top: 200px;
    padding-right: 40px;
    margin-bottom: 20px;
   ">Please rate the following on how much you agree/disagree.</h2>
<div class="barFix " >
  <div id="main" >

  <div  class="flexFifthInput formBox flexTopLeft flexTopRight studentsCaare">

        <label class="hideToggle" > <p style="margin-bottom:20px;">In general...</p>I find that students at NJIT care about each other</label> <br>
        <choose-five  style="margin-top: 15px;" (onChosen)="setAnswer('studentsCare', $event)" oldChoice="localState.studentsCare" type="1"></choose-five>
  </div>

  <div  class="flexFifthInput formBox   facultyCare">
      <label class="hideToggle" > I feel that faculty at NJIT care about their students</label> <br>
        <choose-five (onChosen)="setAnswer('facultyCare', $event)" oldChoice="localState.facultyCare" type="1"></choose-five>
  </div>

  <div  class="flexFifthInput formBox   connected">
        <label class="hideToggle" > I feel connected to others at NJIT</label> <br>
        <choose-five (onChosen)="setAnswer('connected', $event)" oldChoice="localState.connected" type="1"></choose-five>
  </div>

  <div  class="flexFifthInput formBox   community">
        <label class="hideToggle" >I do not feel a spirit of community at NJIT</label> <br>
        <choose-five (onChosen)="setAnswer('community', $event)" oldChoice="localState.community" type="1"></choose-five>
  </div>

  <div  class="flexFifthInput formBox   likeFamily">
        <label class="hideToggle" >I feel that NJIT is like family</label> <br>
        <choose-five (onChosen)="setAnswer('likeFamily', $event)" oldChoice="localState.likeFamily" type="1"></choose-five>
  </div>

  <div  class="flexFifthInput formBox   isolated">
          <label class="hideToggle" >I feel isolated at NJIT</label> <br>
        <choose-five (onChosen)="setAnswer('isolated', $event)" oldChoice="localState.isolated" type="1"></choose-five>
  </div>

  <div  class="flexFifthInput formBox   friendSupport">
          <label class="hideToggle" >I feel confident that my friends at NJIT will support me if I need them</label> <br>
        <choose-five (onChosen)="setAnswer('friendSupport', $event)" oldChoice="localState.friendSupport" type="1"></choose-five>
  </div>

  <div  class="flexFifthInput formBox   satisifed">
          <label class="hideToggle"  >I am satisfied with my life at NJIT</label> <br>
       <choose-five (onChosen)="setAnswer('satisfied', $event)" oldChoice="localState.satisfied" type="1"></choose-five>
  </div>

  <div  class="flexFifthInput formBox   loan">
          <label class="hideToggle" >If I need an emergency loan of $100, I know someone at NJIT i can turn to</label> <br>
        <choose-five (onChosen)="setAnswer('loan', $event)" oldChoice="localState.loan" type="1"></choose-five>
  </div>

  <div  class="flexFifthInput formBox flexBottomLeft flexBottomRight advice">
        <label class="hideToggle"  >There is someone at NJIT I can turn to for advice for making very important decisions</label> <br>
        <choose-five (onChosen)="setAnswer('advice', $event)" oldChoice="localState.advice" type="1"></choose-five>
  </div>


  </div>
  </div>

<div class="blockContainer">
  <a (click)="nextPage()" id="navigator">Continue</a>
</div>
`,
  directives: [ChooseFive],
})


export class SenseOfCommunityComponent extends Survey{
  localState = {
    studentsCare: -1,
    facultyCare: -1,
    connected: -1,
    community: -1,
    likeFamily: -1,
    isolated: -1,
    friendSupport: -1,
    satisfied: -1,
    loan: -1,
    advice: -1,
  }
  SUBS: any = {};

  constructor(private navigator: NavigatorService, private questions: QuestionsService, private appState: AppState){
    super(questions, this.localState);
    this.appState.set('section', 'scientificSurvey');
    this.appState.set('page', 'senseOfCommunity');
    this.appState.set('terms', true);


    socQuestions.forEach((item)=>{
      this.SUBS[item] = this.answer(item);
    });
  }
  ngOnDestroy(){
    socQuestions.forEach((item)=>{
      this.SUBS[item].unsubscribe();
    });
  }

  nextPage(){
    //run field checks here
    this.navigator.next();
    window.scroll(0,0);
  }
}
