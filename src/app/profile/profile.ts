import {Component} from '@angular/core';
import {RouterLink, ROUTER_DIRECTIVES, Router} from '@angular/router'
import {Http, HTTP_PROVIDERS} from '@angular/http';
import 'rxjs/add/operator/map';
import {OptionService} from '../services/options.service'
import {AppState} from "../app.service";
import {NavigatorService} from "../services/navigator.service";
import {QuestionsService} from "../services/questions-service";
import {Autocomplete} from "../UI/autocomplete";
import {MultipleSelect} from "../UI/multiple-select";
import {Chosen} from "../UI/chosen";
import {MiniProfileService} from "../services/mini-profile.service";
import {Survey} from "../models/basic-survey.model";
import {OnDestroy} from "@angular/core";
import { profileQuestions} from "../options/surveyQuestions";
import * as firebase from "firebase";
import {AuthService} from "../services/auth.service";
import {InterestService} from "../services/interests.service";
@Component({
  selector: "background-info",
  providers: [Http, HTTP_PROVIDERS, OptionService],
  template: `
<h2 style="font-size: 1.5em;
    text-align: center;
     margin-top: 200px;
    padding-right: 220px;
    margin-bottom: 20px;
   ">You're almost there! <br> To complete your profile please upload a profile picture.<br> If you need to edit anything you can click the pencil icon <br> next to each section.</h2>
      <div class="barFix">
          
        <div id="main" class="profileMain to-the-left">
        <div *ngIf="authService.imageUrl" class="profilePicMain" [ngStyle]="{'background-image' : 'url(' + authService.imageUrl + ')'}"><span class="label no-highlight">Upload</span></div>
        <h1 class="nameTitle">{{authService.displayName.split(' ')[0]}} <span> {{authService.displayName.split(' ')[1]}}</span></h1>
        <hr>
          <h1>Basic Info</h1>
<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 width="17px" height="17px" viewBox="0 0 485.219 485.22" style="float:right; margin-top: -6%"
	 xml:space="preserve">
<g>
	<path d="M467.476,146.438l-21.445,21.455L317.35,39.23l21.445-21.457c23.689-23.692,62.104-23.692,85.795,0l42.886,42.897
		C491.133,84.349,491.133,122.748,467.476,146.438z M167.233,403.748c-5.922,5.922-5.922,15.513,0,21.436
		c5.925,5.955,15.521,5.955,21.443,0L424.59,189.335l-21.469-21.457L167.233,403.748z M60,296.54c-5.925,5.927-5.925,15.514,0,21.44
		c5.922,5.923,15.518,5.923,21.443,0L317.35,82.113L295.914,60.67L60,296.54z M338.767,103.54L102.881,339.421
		c-11.845,11.822-11.815,31.041,0,42.886c11.85,11.846,31.038,11.901,42.914-0.032l235.886-235.837L338.767,103.54z
		 M145.734,446.572c-7.253-7.262-10.749-16.465-12.05-25.948c-3.083,0.476-6.188,0.919-9.36,0.919
		c-16.202,0-31.419-6.333-42.881-17.795c-11.462-11.491-17.77-26.687-17.77-42.887c0-2.954,0.443-5.833,0.859-8.703
		c-9.803-1.335-18.864-5.629-25.972-12.737c-0.682-0.677-0.917-1.596-1.538-2.338L0,485.216l147.748-36.986
		C147.097,447.637,146.36,447.193,145.734,446.572z"/>
</g>
</svg>

          <div class="questions">
          <ul>
          <li>Date of Birth <span>{{dob}}</span></li>
          <li>Gender <span>{{gender}}</span></li>
          <li>Relationship Status <span>{{relationshipStatus}}</span></li>
          <li>Sexual Identification <span>{{sexualIdentification}}</span></li>
          <li>Nationality <span>{{nationality}}</span></li>
          <li>Language <span>{{language}}</span></li>
          <li>Hometown <span>{{hometown}}</span></li>
          <li>Current Living <span>{{live}}</span></li>
            </ul>
            <hr>
           <h1>School and Work</h1>
           <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 width="17px" height="17px" viewBox="0 0 485.219 485.22" style="float:right; margin-top: -6%"
	 xml:space="preserve">
<g>
	<path d="M467.476,146.438l-21.445,21.455L317.35,39.23l21.445-21.457c23.689-23.692,62.104-23.692,85.795,0l42.886,42.897
		C491.133,84.349,491.133,122.748,467.476,146.438z M167.233,403.748c-5.922,5.922-5.922,15.513,0,21.436
		c5.925,5.955,15.521,5.955,21.443,0L424.59,189.335l-21.469-21.457L167.233,403.748z M60,296.54c-5.925,5.927-5.925,15.514,0,21.44
		c5.922,5.923,15.518,5.923,21.443,0L317.35,82.113L295.914,60.67L60,296.54z M338.767,103.54L102.881,339.421
		c-11.845,11.822-11.815,31.041,0,42.886c11.85,11.846,31.038,11.901,42.914-0.032l235.886-235.837L338.767,103.54z
		 M145.734,446.572c-7.253-7.262-10.749-16.465-12.05-25.948c-3.083,0.476-6.188,0.919-9.36,0.919
		c-16.202,0-31.419-6.333-42.881-17.795c-11.462-11.491-17.77-26.687-17.77-42.887c0-2.954,0.443-5.833,0.859-8.703
		c-9.803-1.335-18.864-5.629-25.972-12.737c-0.682-0.677-0.917-1.596-1.538-2.338L0,485.216l147.748-36.986
		C147.097,447.637,146.36,447.193,145.734,446.572z"/>
</g>
</svg>
           <ul>
          <li>Student Type <span>{{studentType}}</span></li>
          <li>Major(s) <span>{{majors}}</span></li>
          <li>Campus Organization <span>{{organizations}}</span></li>
          <li>Work <span>{{work}}</span></li>
          <li>Volunteer <span>{{volunteer}}</span></li>
            </ul>
            <hr>
            <h1>Interests</h1>
            <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 width="17px" height="17px" viewBox="0 0 485.219 485.22" style="float:right; margin-top: -6%"
	 xml:space="preserve">
<g>
	<path d="M467.476,146.438l-21.445,21.455L317.35,39.23l21.445-21.457c23.689-23.692,62.104-23.692,85.795,0l42.886,42.897
		C491.133,84.349,491.133,122.748,467.476,146.438z M167.233,403.748c-5.922,5.922-5.922,15.513,0,21.436
		c5.925,5.955,15.521,5.955,21.443,0L424.59,189.335l-21.469-21.457L167.233,403.748z M60,296.54c-5.925,5.927-5.925,15.514,0,21.44
		c5.922,5.923,15.518,5.923,21.443,0L317.35,82.113L295.914,60.67L60,296.54z M338.767,103.54L102.881,339.421
		c-11.845,11.822-11.815,31.041,0,42.886c11.85,11.846,31.038,11.901,42.914-0.032l235.886-235.837L338.767,103.54z
		 M145.734,446.572c-7.253-7.262-10.749-16.465-12.05-25.948c-3.083,0.476-6.188,0.919-9.36,0.919
		c-16.202,0-31.419-6.333-42.881-17.795c-11.462-11.491-17.77-26.687-17.77-42.887c0-2.954,0.443-5.833,0.859-8.703
		c-9.803-1.335-18.864-5.629-25.972-12.737c-0.682-0.677-0.917-1.596-1.538-2.338L0,485.216l147.748-36.986
		C147.097,447.637,146.36,447.193,145.734,446.572z"/>
</g>
</svg>
            <div class="interest-tags">
            <span  *ngFor="let interest of myInterests" class="interest-tag">{{interest}}</span>
</div>
          </div>
        </div>          
      </div>
      
      <div class="blockContainer">
          <a  (click)="nextPage();" class='to-the-left' id="navigator">Continue</a>
      </div>
`,
  directives: [RouterLink, MultipleSelect, Autocomplete, Chosen, ROUTER_DIRECTIVES],
})


export class ProfileComponent extends Survey implements OnDestroy{
  localState = {
    dob: '',
    gender: '',
    nationality: '',
    nativeLanguage: '',
    otherLanguages: [],
    sexualIdentification: '',
    relationshipStatus: '',
    currentCountry: '',
    currentCity: '',
    currentState: '',
    grownCountry: '',
    grownCity: '',
    grownState: '',
    onCampus: '',
    campusHousing: '',
    fullTime: '',
    graduate: '',
    majors: [],
    work: {},
    volunteer: {},
    organizations: [],
    interests: [],
  }
  SUBS: any = {};

  constructor(private interestService: InterestService, private authService: AuthService, private miniProfile: MiniProfileService, private questions: QuestionsService, private options: OptionService,  private navigator: NavigatorService, private appState: AppState) {
    super(questions, this.localState);
    this.appState.set('section', 'profile');
    this.appState.set('page', 'reviewProfile');


    const storageLink =  'users/' + authService.id + '/avatar.jpg';
    const avatarRef = firebase.storage().ref().child(storageLink);

    // avatarRef.on('state_changed', function(snapshot){
    //   console.log(snapshot);
    // }, function(error) {
    //   console.log(error);
    // }, function() {
    //   var downloadURL = uploadTask.snapshot.downloadURL;
    //   console.log(downloadURL);
    // });

    profileQuestions.forEach((item)=>{
      this.SUBS[item] = this.answer(item);
    });
    this.SUBS['otherLanguages'] = this.answers('otherLanguages');
    this.SUBS['organizations'] = this.answers('organizations');
    this.SUBS['majors'] = this.answers('majors');
    this.SUBS['interests'] = this.interestService.getInterests().subscribe( (data)=>{data.forEach(item=>{
      if(item.completed){
        item.answers.forEach(answer=>{
          this.localState.interests.push(answer.value);
        })
      }
    })
    });
  }
  get dob(){
    if(this.localState.dob){
      var dob = new Date(this.localState.dob);
      var dob1 = dob.toString().split(' ');
      return dob1[1] + ' ' + dob1[2] + ', ' + dob1[3];
    }
    else return '';
  }
  get nationality(){
    return this.localState.nationality;
  }
  get hometown(){
    return this.localState.currentCity + ', ' + this.localState.currentState + ', ' + this.localState.currentCountry;
  }
  get language(){
    var lang = this.localState.nativeLanguage;
    if(this.localState.otherLanguages.length > 0){
      this.localState.otherLanguages.forEach(item=>{
        lang = lang + ', ' + item;
      });
    }
    return lang;
  }
  get sexualIdentification(){
    return this.localState.sexualIdentification;
  }
  get gender(){
    return this.localState.gender;
  }
  get relationshipStatus(){
    return this.localState.relationshipStatus;
  }
  get live(){
    if(this.localState.onCampus == "On Campus"){
      return this.localState.campusHousing;
    }else{
      return this.localState.currentCity + ', ' + this.localState.currentState + ', ' + this.localState.currentCountry;
    }
  }
  get majors(){
    var majors = '';
    this.localState.majors.forEach(item=>{
      if(majors.length!=0)
        majors += ', '
      majors +=  item ;
    });
    return majors;
  }
  get studentType(){
    return this.localState.fullTime + ' ' + this.localState.graduate;
  }
  get organizations(){
    var organizations = '';
    this.localState.organizations.forEach(item=>{
      if(organizations.length!=0)
      organizations += ', '
      organizations +=  item ;
    });
    return organizations;
  }
  get work(){
    if(this.localState.work.doesWork){
      return this.localState.work.field + ' at ' + this.localState.work.place;
    } else {
      return 'none';
    }

  }
  get volunteer(){
    if(this.localState.work.doesVolunteer){
      return this.localState.volunteer.field + ' at ' + this.localState.volunteer.place;
    } else {
      return 'none';
    }

  }
  get myInterests(){
    var i = [];
    if(this.localState.interests){
      this.localState.interests.forEach((item)=> {
        item.forEach(val=> i.push(val.answer));
      });
      return i;
    }
    return [];

  }
  ngOnDestroy(){
    profileQuestions.forEach((item)=>{
      this.SUBS[item].unsubscribe();
    });
    this.SUBS['otherLanguages'].unsubscribe();
    this.SUBS['majors'].unsubscribe();
    this.SUBS['organizations'].unsubscribe();
    this.SUBS['interests'].unsubscribe();
  }
  setTwice(field, value, push=true){
    if(push) this.setAnswer(field, value)
    if(field == 'dob'){
      this.miniProfile.dob = value;
    }
    if(field == 'nationality'){
      this.miniProfile.nationality = value;
    }
    if(field == 'nativeLanguage'){
      this.miniProfile.nativeLanguage = value;
    }
    if(field == 'onCampus'){
      this.miniProfile.onCampus = value;
    }
    if(field == 'campusHousing'){
      this.miniProfile.campusHousing = value;
    }
    if(field == 'currentCity'){
      this.miniProfile.currentCity = value;
    }
    if(field == 'currentState'){
      this.miniProfile.currentState = value;
    }
    if(field == 'currentCountry'){
      this.miniProfile.currentCountry = value;
    }
  }


  nextPage(){
    //run field checks here
    this.navigator.next();
  }

}
