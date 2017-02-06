import {Component, ViewEncapsulation} from '@angular/core';
import {MiniProfileService} from "../services/mini-profile.service";
import {AuthService} from "../services/auth.service";
import {Survey} from "../models/basic-survey.model";
import {QuestionsService} from "../services/questions-service";
import {OnDestroy} from "@angular/core";
import {InterestService} from "../services/interests.service";

@Component({
  selector: 'mini-profile',
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="profileView">
        <div *ngIf="authService.imageUrl" class="profilePic" [ngStyle]="{'background-image' : 'url(' + authService.imageUrl + ')'}"></div>
        <div *ngIf="!authService.imageUrl" class="profilePic"></div>
          <h2 *ngIf="authService.displayName">{{authService.displayName}} </h2>
          <h2 *ngIf="!authService.displayName">You</h2>
        <div class="profileInfo">
        <hr>
          <div class="infoHolders">
         <div class="info">Age<p class="valuePlaceholder" style="width: 30px;" *ngIf="!age() ||  age().length==0"></p><p *ngIf="age()">{{ age() }}</p></div>
         <div class="info" >Nationality<p class="valuePlaceholder" *ngIf="!nationality ||  nationality.length==0"></p><p *ngIf="nationality">{{nationality}}</p></div>
        </div>
          <div class="infoHolders">
          <div class="info" >Currently Live<p class="valuePlaceholder" style="width: 90px;" *ngIf="!live()"></p>
          <p *ngIf="live() ||  live().length==0">{{live()}}</p>
          </div>
          <div class="info">Native Language
          <p class="valuePlaceholder" style="width:100px" *ngIf="!nativeLanguage()"></p>
          <p *ngIf="nativeLanguage()">{{nativeLanguage()}}</p>
          </div>
        </div>
        <hr>
        <div class="info-list">
          <div class="info" style="padding-left: 10px; text-align:left; width: 100%;"><span>Student Type</span>
          <p class="studentPlaceholder" *ngIf="!studentType()"></p>
          <p class="bigger" *ngIf="studentType()">{{studentType()}}</p>
        </div>
        <div class="info" style="padding-left: 10px; text-align:left; width: 100%;"><span>Major(s)</span>
        <div *ngIf="!majors() || majors().length==0" class="mini-tags" style="text-align:left;" >
            <p class="majorsPlaceholder" style="width: 60px;"></p><p class="majorsPlaceholder" style="width: 75px;"></p><p class="majorsPlaceholder" style="width: 50px;"></p>
            </div>
        <div *ngIf="majors() " class="mini-tags" style=" text-align:left;" >
            
            <span class="interest-tag no-highlight bigger" *ngFor="let major of majors()">{{major}}</span>
            </div>
          </div>
        </div>
        <hr>
        
        <div class="info-list">
          <div class="info" style="width: 100%; padding-left: 10px; text-align:left;"><span style="font-size: 13px">Interests</span>
            <div *ngIf="interests()" class="mini-tags" style="text-align:left;" >
            <span *ngFor="let interest of interests()" class="interest-tag no-highlight">{{interest}}</span>
            </div>
             <div *ngIf="!interests() || interests().length==0" class="mini-tags" style="text-align:left;" >
            <p class="interestPlaceholder" style="width: 60px" ></p><p class="interestPlaceholder" style="width: 45px" ></p><p class="interestPlaceholder" style="width: 30px" ></p><p class="interestPlaceholder" style="width: 70px" ></p><p class="interestPlaceholder" style="width: 45px" ></p><p class="interestPlaceholder" style="width: 40px" ></p><p class="interestPlaceholder" style="width: 35px" ></p><p class="interestPlaceholder" style="width: 44px" ></p><p class="interestPlaceholder" style="width: 35px" >
            </div>
            
          </div>
        </div>

    </div>
    </div>`,

})

export class MiniProfile extends Survey implements OnDestroy {
  localState = {
    dob: '',
    nationality: '',
    onCampus: '',
    campusHousing: '',
    currentCity: '',
    currentState: '',
    currentCountry: '',
    studentType: '',
    majors: [],
    interests: [],
    nativeLanguage: '',
    fullTime: '',
    graduate: ''
  }
  quests = [
    "dob",
    "nationality",
    "onCampus",
    "campusHousing",
    "currentCity",
    "currentState",
    "currentCountry",
    "fullTime",
    "graduate",
    "nativeLanguage"
  ]
  SUBS: any = {}
  constructor(private interestService: InterestService, private questions: QuestionsService, private authService: AuthService, public miniProfileService: MiniProfileService) {
    super(questions, this.localState)
    this.quests.forEach((item)=>{
      this.SUBS[item] = this.answer(item);
    });
    this.SUBS['majors'] = this.answers('majors');
    this.SUBS['interests'] = this.interestService.getInterests().subscribe( (data)=>{data.forEach(item=>{
      if(item.completed){
        item.answers.forEach(answer=>{
          answer.value.forEach((val)=>{
            if(this.localState.interests.indexOf(val.answer) < 0)
              this.localState.interests.push(val.answer);
          });

        })
      }
    })
    });
    console.log(this.SUBS);

  }
  ngOnDestroy(){
    this.quests.forEach((item)=>{
      this.SUBS[item].unsubscribe();
    });
    this.SUBS['majors'].unsubscribe();
    this.SUBS['interests'].unsubscribe();
  }
  age(){
      return this.miniProfileService.age ? this.miniProfileService.age : this.oldAge;
  }
  get oldAge(){
    let birthday = new Date(this.localState.dob);
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    var age = Math.abs(ageDate.getUTCFullYear() - 1970)
    return (age > 1 && age < 140) ? age : false ;
  }
  get nationality(){
    if(this.miniProfileService.nationality.length) return this.miniProfileService.nationality;
    return this.localState.nationality;
  }
  live(){
    return this.miniProfileService.live ? this.miniProfileService.live : this.oldLive;
  }
  nativeLanguage(){
    return this.miniProfileService.nativeLanguage ? this.miniProfileService.nativeLanguage : this.localState.nativeLanguage;
  }
  studentType(){
    if(this.miniProfileService.studentType ) return this.miniProfileService.studentType;
    return this.localState.fullTime + ' ' + this.localState.graduate;
  }
  majors(){
    return this.miniProfileService.majors ? this.miniProfileService.majors : this.localState.majors;
  }
  interests(){
    return this.miniProfileService.interests ? this.miniProfileService.interests : this.localState.interests;
  }
  get oldLive(){
    if (this.localState.onCampus == "Off Campus" && this.localState.currentCity){
      if(this.localState.currentState) {
        return this.localState.currentCity + ', ' + this.localState.currentState;
      } else {
        return this.localState.currentCity
      }
    } else if (this.localState.onCampus == "On Campus"){
      return this.localState.campusHousing;
    } else {
      return false;
    }
  }
}

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */

