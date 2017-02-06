import {Component, OnInit}      from '@angular/core'
import {RouterLink, Router,} from '@angular/router'
import {AppState} from "../app.service";
import {ChooseFive} from "../UI/choose-five";
import {ProgressService} from "../services/progress.service";
import {NavigatorService} from "../services/navigator.service";
import {QuestionsService} from "../services/questions-service";
import {wellbeingQuestions} from "../options/surveyQuestions";
import {Survey} from "../models/basic-survey.model";
import {OnDestroy} from "@angular/core";

@Component({
  selector: "wellbeing-info",
  template: `
<h2 style="font-size: 1.5em;
    text-align: center;
    margin-top: 200px;
    padding-right: 40px;
    margin-bottom: 20px;
   ">Please rate the following to the best of your abilities.</h2>
<div class="barFix auth" >    
	<div id="main">


	<div  class="flexFifthInput formBox flexTopLeft flexTopRight physicalHealth">
	        <label class="hideToggle" for="DOB">In terms of your physical health, do your currently feel: </label> <br>
          <choose-five (onChosen)="setAnswer('physicalHealth', $event)" [oldChoice]="localStatephysicalHealth" [type]="2"></choose-five>
	</div>

	<div  class="flexFifthInput formBox   currentlyAre">
	        <label class="hideToggle" for="DOB"> Currently, you would say that you are:</label> <br>
	     	  <choose-five (onChosen)="setAnswer('happyAtNjit', $event)" [oldChoice]="localStatehappyAtNjit" [type]="2"></choose-five>
	</div>	

	<div  class="flexFifthInput formBox   currentWill">
	        <label class="hideToggle" for="DOB"> Currently, you  would say that you:</label> <br>
	     	<choose-five (onChosen)="setAnswer('stayAtNjit', $event)" [oldChoice]="localStatestayAtNjit" [type]="3"></choose-five>
	</div>		

	<div  class="flexFifthInput formBox   lackOfcompanionship">
	        <label class="hideToggle" for="DOB">How often do you feel you lack companionship?</label> <br>
	    <choose-five (onChosen)="setAnswer('lackCompanionShip', $event)" [oldChoice]="localStatelackCompanionShip" [type]="4"></choose-five>
	</div>	

	<div  class="flexFifthInput formBox   leftOut">
	        <label class="hideToggle" for="DOB">How often do you feel left out?</label> <br>
	     	<choose-five (onChosen)="setAnswer('feelLeftOut', $event)" [oldChoice]="localStatefeelLeftOut" [type]="4"></choose-five>
	</div>	

	<div  class="flexFifthInput formBox   isolated">
	        <label class="hideToggle" for="DOB">How often do you feel isolated from others?</label> <br>
	     	<choose-five (onChosen)="setAnswer('feelIsolated', $event)" [oldChoice]="localStatefeelIsolated" [type]="4"></choose-five>
	</div>	

	<div  class="flexFifthInput formBox   failure">
	        <label class="hideToggle" for="DOB">All in all, I am inclined to feel that I am a failure</label> <br>
	     	<choose-five (onChosen)="setAnswer('feelFailure', $event)" [oldChoice]="localStatefeelFailure" [type]="1"></choose-five>
	</div>	

	<div  class="flexFifthInput formBox   selfEsteem">
	        <label class="hideToggle" for="DOB">I have high self-esteem</label> <br>
	    <choose-five (onChosen)="setAnswer('highSelfEsteem', $event)" [oldChoice]="localStatehighSelfEsteem" [type]="1"></choose-five>
	</div>	


	<div  class="flexFifthInput formBox   idealLife">
	        <label class="hideToggle" for="DOB">In most ways my life is close to ideal</label> <br>
	     	<choose-five (onChosen)="setAnswer('lifeIdeal', $event)" [oldChoice]="localStatelifeIdeal" [type]="1"></choose-five>
	</div>	

	<div  class="flexFifthInput formBox   lifeCondition">
	        <label class="hideToggle" for="DOB">The conditions of my life are excellent</label> <br>
	     	<choose-five (onChosen)="setAnswer('lifeExcellent', $event)" [oldChoice]="localStatelifeExcellent" [type]="1"></choose-five>
	</div>	

	<div  class="flexFifthInput formBox   satisfied">
	        <label class="hideToggle" for="DOB"> I am satisfied with my life</label> <br>
	     	<choose-five (onChosen)="setAnswer('lifeSatisfied', $event)" [oldChoice]="localStatelifeSatisfied" [type]="1"></choose-five>
	</div>	

	<div  class="flexFifthInput formBox  flexBottomLeft flexBottomRight selfPride">
		        <label class="hideToggle" for="DOB">I feel I do not have much to be proud of</label> <br>
	     	<choose-five (onChosen)="setAnswer('doNotHaveProud', $event)" [oldChoice]="localStatedoNotHaveProud" [type]="1"></choose-five>
	</div>			
	

	</div>
	</div>
<div class="blockContainer">
<a   (click)="nextPage()" id="navigator" >Continue</a>
</div>


`,
  directives: [ChooseFive],
})


export class WellbeingComponent extends Survey implements OnDestroy{
  localState = {
    physicalHealth: -1,
    happyAtNjit: -1,
    stayAtNjit: -1,
    lackCompanionShip: -1,
    feelLeftOut: -1,
    feelIsolated: -1,
    feelFailure: -1,
    highSelfEsteem: -1,
    lifeIdeal: -1,
    lifeExcellent: -1,
    lifeSatisfied: -1,
    doNotHaveProud: -1,
  }
  SUBS: any = {};
  constructor(private navigator: NavigatorService, private questions: QuestionsService, private appState: AppState){
    this.appState.set('section', 'scientificSurvey');
    this.appState.set('page', 'wellbeing');

    super(questions, this.localState);
    wellbeingQuestions.forEach((item)=>{
      this.SUBS[item] = this.answer(item);
    });
  }
  ngOnDestroy(){
    wellbeingQuestions.forEach((item)=>{
      this.SUBS[item].unsubscribe();
    });
  }
  nextPage(){
    //run field checks here
    this.navigator.next();
    window.scroll(0,0);
  }
}
