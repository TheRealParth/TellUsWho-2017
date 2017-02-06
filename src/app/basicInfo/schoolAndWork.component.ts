import {Component, OnInit  } from '@angular/core'
import {RouterLink, Router,} from '@angular/router'
import {AppState} from "../app.service";
import {Chosen} from "../UI/chosen";
import {MultipleSelect} from "../UI/multiple-select";
import {NavigatorService} from "../services/navigator.service";

import {QuestionsService} from "../services/questions-service";
import {OptionService} from "../services/options.service";
import {MiniProfileService} from "../services/mini-profile.service";
import {Survey} from "../models/basic-survey.model";
import {schoolworkQuestions} from "../options/surveyQuestions";
import {OnDestroy} from "@angular/core";

@Component({
	selector: "workAndSchool-info",
  directives: [Chosen, MultipleSelect],
  providers: [OptionService],
  template: `
<h2 style="font-size: 1.5em;
    text-align: center;
    margin-top: 200px;
    padding-right: 220px;
    margin-bottom: 20px;
   ">Please answer the questions below.</h2>
      <div class="barFix" >    
        <div id="main" class="to-the-left">
        
        <div class="formBoxWrapper">
            <div  class="formBox flexTopLeft ">
                <label class="hideToggle" for="DOB"> Student Type </label> <br>
               <div style="display: flex; flex-direction: row; justify-content: space-around; margin-top: 1.5%;">
               <chosen [oldChoice]="localState.fullTime" [options]="['Part-time','Full-time']" (onChosen)="setTwice('fullTime', $event)" ></chosen>
              <chosen [oldChoice]="localState.graduate" [options]="['Undergraduate','Graduate']" (onChosen)="setTwice('graduate', $event)" ></chosen>
              </div>
        </div>
         <div  class="formBox flexTopRight" style="flex:.5;">
                <label class="hideToggle" for="DOB"> Year first attended NJIT:  </label> <br>
                <input (blur)="setFirstYear()" type="textarea" [(ngModel)]="localState.firstYear"    placeholder="Year">
        </div>
          </div>
      
      
            <div class="formBoxWrapper">
            <div class="formBox" >
                <label class="right" for="DOB"> What is/are your current major(s)?</label> 
                <br>
               <multiple-select (setDefaults)="localState.majors" [options]="majorOptions()" [oldChoice]="localState.majors" (onChosen)="setTwice('majors', $event, false)" [placeholder]="'Select majors'" ></multiple-select>
                <div class="background"></div>
            </div>     
            </div>
                  <div class="formBox" >
                <label class="right" for="DOB"> Please list any campus organzations you are involved in:</label>
                <p class="subtitle">(e.g. Clubs, Athletics, Greek Life)</p>
                <multiple-select (setDefaults)="localState.organizations" [options]="options.countryOptions" [oldChoice]="localState.organizations"  (onChosen)="setAnswers('organizations', $event)" [placeholder]="'Select Organizations'" ></multiple-select>
                <div class="background"></div>
            </div>     
      
      
            <div class="formBoxWrapper bigbox workbox">
           
            <div  class="formBox">
                <label for="DOB"> Work</label> <br>
              <div class="flexHalfWrapper">
            <div class="flexHalf flexTopLeft flexBottomLeft sizeUp">
                    <p class="flexHalfSubtitle">What field of work are you in?</p>
                  <input [disabled]="!localState.work.doesWork" (blur)="setWork()" [(ngModel)]="localState.work.field" class="oneLiner" type="textarea"  placeholder="Field of work">
                  </div>
            <div class="flexHalf flexTopRight flexBottomRight sizeUp">
                        <p class="flexHalfSubtitle">What company/organization are you working for?</p>
                <input [disabled]="!localState.work.doesWork" (blur)="setWork()" type="textarea" [(ngModel)]="localState.work.place"    placeholder="Company/Organization">
                </div>
              </div>
              <span (click)="handleDoNotWork()" [class.active]="!localState.work.doesWork" class="dislikeButton " style="position: absolute; top: 5px; right: 5px;">I do not work</span>
      
        </div>
      </div>
            <div class="formBoxWrapper bigbox volunteerbox">
           
            <div  class="formBox flexBottomLeft flexBottomRight">
                <label for="DOB"> Volunteer</label> <br>
              <div class="flexHalfWrapper">
            <div class="flexHalf flexTopLeft flexBottomLeft sizeUp">
                    <p class="flexHalfSubtitle">What field of volunteer work are you in?</p>
                  <input [disabled]="!localState.volunteer.doesVolunteer" (blur)="setVolunteer()" [(ngModel)]="localState.volunteer.field" class="oneLiner" type="textarea"  placeholder="Volunteer Workplace">
                  </div>
            <div class="flexHalf flexTopRight flexBottomRight sizeUp">
                        <p class="flexHalfSubtitle">What organizations are you volunteering for?</p>
                <input [disabled]="!localState.volunteer.doesVolunteer" (blur)="setVolunteer()" [(ngModel)]="localState.volunteer.place"  type="textarea"   placeholder="Organization">
                </div>
              </div>
            <span (click)="handleDoNotVolunteer()" [class.active]="!localState.volunteer.doesVolunteer" class="dislikeButton " style="position: absolute; top: 5px; right: 5px;">I do not volunteer</span>
        </div>
      </div>
      
        </div>
      </div>
      
      <div class="blockContainer">
        <a   (click)="nextPage();" id="navigator" class="to-the-left">Continue</a>
      </div>
      `,
})

export class SchoolAndWorkComponent extends Survey implements OnDestroy{
    localState = {
      organizations: [],
      majors: [],
      onCampus: null,
      graduate: null,
      fullTime: null,
      work:      {doesWork: true,
                  field: '',
                  place: ''},
      volunteer: {doesVolunteer: true,
                  field: '',
                  place: ''},
      firstYear: null,
    }
  SUBS: any = {};
  constructor(private miniProfile: MiniProfileService, private options: OptionService , private questions: QuestionsService, private navigator: NavigatorService,private appState: AppState){
    this.appState.set('section', 'basic');
    this.appState.set('page', 'schoolAndWork');

    this.SUBS.majors = this.answers('majors');
    this.SUBS.organizations = this.answers('organizations');

    schoolworkQuestions.forEach((item)=>{
      this.SUBS[item] = this.answer(item);
    });
  }
  ngOnDestroy(){
    schoolworkQuestions.forEach((item)=>{
      this.SUBS[item].unsubscribe();
    });
    this.SUBS.majors.unsubscribe();
    this.SUBS.organizations.unsubscribe();
  }
  majorOptions(){
    if(this.localState.graduate == 'Graduate'){
      return this.options.graduateOptions;
    } else if(this.localState.graduate == 'Undergraduate'){
      return this.options.undergraduateOptions;
    } else {
      return [];
    }
  }
  setTwice(field, value, single=true) {
    if (single){ this.setAnswer(field, value)}
    else {this.setAnswers(field, value);}

    if(field == 'majors') {
      this.miniProfile.majors = value;
    }
    if (field == 'graduate') {
      this.miniProfile.graduate = value;
    }
    if(field == 'fullTime'){
      this.miniProfile.fullTime = value;
    }
  }
  handleDoNotVolunteer(){
    this.localState.volunteer.doesVolunteer = !this.localState.volunteer.doesVolunteer;
    this.localState.volunteer.field = '';
    this.localState.volunteer.place = '';
    this.setVolunteer();
  }
  setVolunteer(){
    this.setAnswer('volunteer', this.localState.volunteer);
  }
  handleDoNotWork(){
    this.localState.work.doesWork = !this.localState.work.doesWork;
    this.localState.work.field = '';
    this.localState.work.place = '';
    this.setWork();
  }
  setWork(){
    this.setAnswer('work', this.localState.work);
  }
  setFirstYear(){
    this.setAnswer('firstYear', this.localState.firstYear);
  }
}
