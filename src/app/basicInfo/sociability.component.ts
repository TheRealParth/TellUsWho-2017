import {Component, OnInit} from '@angular/core'
import {AppState} from "../app.service";
import {ChooseFive} from "../UI/choose-five";
import {ProgressService} from "../services/progress.service";
import {NavigatorService} from "../services/navigator.service";
import {QuestionsService} from "../services/questions-service";
import {sociabilityQuestions} from "../options/surveyQuestions";
import {Survey} from "../models/basic-survey.model";
import {OnDestroy} from "@angular/core";
@Component({
  selector: "sociability",
  template: `
<h2 style="font-size: 1.5em;
    text-align: center;
    margin-top: 200px;
    padding-right: 40px;
    margin-bottom: 20px;
   ">Please rate the following on how characteristic they are for you.</h2>
<div class="barFix auth" >    
  <div id="main">
  <div  class="flexFifthInput formBox flexTopLeft flexTopRight likePeople">
        <label class="hideToggle" > I like to be with people</label> <br>
        <choose-five (onChosen)="setAnswer('likePeople', $event)" [oldChoice]="localState.likePeople" ></choose-five>
  </div>

  <div  class="flexFifthInput formBox   mixSocially">
        <label class="hideToggle" >I welcome the opportunity to mix socially with people</label> <br>
        <choose-five (onChosen)="setAnswer('mixSocially', $event)" [oldChoice]="localState.mixSocially"></choose-five>
  </div>

  <div  class="flexFifthInput formBox   preferOthers">
        <label class="hideToggle" > I prefer working with others rather than alone</label> <br>
        <choose-five (onChosen)="setAnswer('preferOthers', $event)" [oldChoice]="localState.preferOthers"></choose-five>
  </div>

  <div  class="flexFifthInput formBox   peopleStimulating">
        <label class="hideToggle" > I find people more stimulating than anything else</label> <br>
        <choose-five (onChosen)="setAnswer('peopleStimulating', $event)" [oldChoice]="localState.peopleStimulating"></choose-five>
  </div>
 
  <div  class="flexFifthInput formBox  makingContacts">
        <label class="hideToggle" >I'd be unhappy if I were prevented from making many social contacts</label> <br>
        <choose-five (onChosen)="setAnswer('makingContacts', $event)" [oldChoice]="localState.makingContacts"></choose-five>
  </div>

  <div  class="flexFifthInput formBox  sociallyAwkward">
        <label class="hideToggle" >I am somewhat socially awkward</label> <br>
        <choose-five (onChosen)="setAnswer('sociallyAwkward', $event)" [oldChoice]="localState.sociallyAwkward"></choose-five>
  </div>
  
  <div  class="flexFifthInput formBox  talkToStrangers">
        <label class="hideToggle" >I don't find it hard to talk to strangers</label> <br>
        <choose-five (onChosen)="setAnswer('talkToStrangers', $event)" [oldChoice]="localState.talkToStrangers"></choose-five>
  </div>

  <div  class="flexFifthInput formBox  tenseWithStrangers">
        <label class="hideToggle" >I feel tense when I'm with people I don't know well</label> <br>
        <choose-five (onChosen)="setAnswer('tenseWithStrangers', $event)" [oldChoice]="localState.tenseWithStrangers"></choose-five>
  </div>

  <div  class="flexFifthInput formBox  saySomethingDumb">
        <label class="hideToggle" >When conversing I worry about saying something dumb</label> <br>
        <choose-five (onChosen)="setAnswer('tenseWithPeople', $event)" [oldChoice]="localState.tenseWithPeople"></choose-five>
  </div>

  <div  class="flexFifthInput formBox  nervousAuthority">
        <label class="hideToggle" >I feel nervous when speaking to someone in authority</label> <br>
        <choose-five (onChosen)="setAnswer('nervousAuthority', $event)" [oldChoice]="localState.nervousAuthority"></choose-five>
  </div>
  
  <div  class="flexFifthInput formBox  uncomfortableParties">
        <label class="hideToggle" > I am often uncomfortable at parties and other social functions</label> <br>
        <choose-five (onChosen)="setAnswer('uncomfortableParties', $event)" [oldChoice]="localState.uncomfortableParties"></choose-five>
  </div>

  <div  class="flexFifthInput formBox flexBottomLeft flexBottomRight oppositeSex">
        <label class="hideToggle" >I am more shy with members of the opposite sex</label> <br>
        <choose-five (onChosen)="setAnswer('oppositeSex', $event)" [oldChoice]="localState.oppositeSex"></choose-five>
  </div>

</div>
  </div>

<div class="blockContainer">
  <a   (click)="nextPage()" id="navigator">Continue</a>
</div>
`,
  directives: [ ChooseFive],
})


export class SociabilityComponent extends Survey implements OnDestroy {
  localState = {
    likePeople: -1,
    mixSocially: -1,
    preferOthers: -1,
    peopleStimulating: -1,
    makingContacts: -1,
    sociallyAwkward: -1,
    talkToStrangers: -1,
    tenseWithStrangers: -1,
    tenseWithPeople: -1,
    nervousAuthority: -1,
    uncomfortableParties: -1,
    oppositeSex: -1,
  }
  SUBS: any = {};
  constructor(private navigator: NavigatorService, private questions: QuestionsService, private appState: AppState){
    this.appState.set('page', 'sociability');
    this.appState.set('section', 'scientificSurvey');

    super(questions, this.localState);

    sociabilityQuestions.forEach((item)=>{
      this.SUBS[item] = this.answer(item);
    });
  }
  ngOnDestroy(){
    sociabilityQuestions.forEach((item)=>{
      this.SUBS[item].unsubscribe();
    });
  }

  nextPage(){
    //run field checks here
    this.navigator.next();
    window.scroll(0,0);
  }
}
