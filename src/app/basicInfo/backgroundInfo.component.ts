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
import {bginfoQuestions} from "../options/surveyQuestions";

@Component({
  selector: "background-info",
  providers: [OptionService],
  template: `
<h2 style="font-size: 1.5em;
    text-align: center;
     margin-top: 200px;
    padding-right: 220px;
    margin-bottom: 20px;
   ">In this section, you will build your matching profile<br> located on the right hand side of the screen.<br>
    Please answer the questions below </h2>
      <div class="barFix">

        <div id="main" class="to-the-left">

        <div class="formBoxWrapper">
            <div   class="formBox flexTopLeft">
                <label class="hideToggle" for="DOB"> What's your date of birth?</label> <br>
                <div class="arrowHider">
                <input type="date" id="DOB" name="input" [(ngModel)]="localState.dob"
       placeholder="yyyy-MM-dd" max="2013-12-31" (blur)="setTwice('dob', $event.target.value)" />
                </div>
            </div>
            <div class="formBox flexTopRight" >
                    <label  class="right">What gender do you identify with?</label>
               <br>
            <autocomplete [oldChoice]="localState.gender" (onChosen)="setAnswer('gender', $event);" [placeholder]="'Select a gender'" [options]="options.genderOptions"  ></autocomplete>
            </div>

          </div>
          <div class="formBoxWrapper">
           <div class="formBox" >
            <label > What is your nationality?</label> <br>
            <autocomplete  [oldChoice]="localState.nationality" [options]="options.nationalityOptions" [placeholder]="'Select a nationality'" (onChosen)="setTwice('nationality', $event);"> </autocomplete>
          </div>

           <div class="formBox" >
            <label class="right"> What is your native language?</label> <br>
            <autocomplete [oldChoice]="localState.nativeLanguage"  id="spokenLanguage" [options]="options.languageOptions" [placeholder]="'Select a native language'" (onChosen)="setTwice('nativeLanguage', $event)"> </autocomplete>
          </div>

        </div>

          <div class="formBoxWrapper">

            <div class="formBox" >
                <label class="right"> What other languages do you speak?</label> <br>
          <multiple-select (setDefaults)="localState.otherLanguages" [oldChoice]="localState.otherLanguages" (onChosen)="setAnswers('otherLanguages', $event)" [options]="options.languageOptions" [placeholder]="'Select other languages'" ></multiple-select>
            </div>
        </div>


      <div class="formBoxWrapper">
            <div class="formBox nodrop" >
                <label> Where did you grow up?</label> <br>
                <div class="flexThirdWrapper">
                  <div class="flexThird flexTopLeft flexBottomLeft">
                    <input type="text" class="mySelect flexThird flexTopLeft flexBottomLeft cityTown" (blur)="setAnswer('grownCity', $event.target.value)" [(ngModel)]="localState.grownCity"  placeholder="City/Town" />
                  </div>

            <div class="flexThird" >
               <br>
              <autocomplete class="state" [placeholder]="'State'" [oldChoice]="localState.grownState" (onChosen)="setAnswer('grownState', $event);" [options]="options.stateOptions" ></autocomplete>
            </div>


            <div class="flexThird flexTopRight flexBottomRight country">
               <br>
            <autocomplete class="country" [oldChoice]="localState.grownCountry" (onChosen)="setAnswer('grownCountry', $event);" [placeholder]="'Country'" [options]="options.countryOptions" ></autocomplete>
            </div>
            </div>
        </div>
      </div>
      <div class="formBoxWrapper">
            <div class="formBox nodrop" style="height: auto">
                <label> Where do you currently live?</label> <br>
                <div class="flexThirdWrapper" style="margin: 10px">
                <chosen [oldChoice]="localState.onCampus" [options]="['On Campus','Off Campus']" (onChosen)="setTwice('onCampus', $event)" ></chosen>
                </div>
            <autocomplete style="margin-top: -20px" *ngIf="(localState.onCampus == 'On Campus')" [oldChoice]="localState.campusHousing"  id="spokenLanguage" [options]="options.campusOptions" [placeholder]="'Select a your campus housing'" (onChosen)="setTwice('campusHousing', $event)"> </autocomplete>
                <div style="margin-top: -20px"  *ngIf="(localState.onCampus == 'Off Campus')" class="flexThirdWrapper">
                  <div class="flexThird flexTopLeft flexBottomLeft">

                    <input (keyup)="setTwice('currentCity', $event.target.value, false)"(blur)="setAnswer('currentCity', $event.target.value)" type="text" class="mySelect flexThird flexTopLeft flexBottomLeft cityTown" [(ngModel)]="localState.currentCity" placeholder="City/Town" />
                  </div>

                    <div class="flexThird" >
                       <br>
                  <autocomplete class="state" [oldChoice]="localState.currentState" [placeholder]="'State'" [options]="options.stateOptions" (onChosen)="setTwice('currentState', $event)"></autocomplete>
                    </div>

                    <div class="flexThird flexTopRight flexBottomRight country">
                       <br>
                    <autocomplete class="country" [oldChoice]="localState.currentCountry" [placeholder]="'Country'" [options]="options.countryOptions" (onChosen)="setTwice('currentCountry', $event)" ></autocomplete>
                </div>
            </div>
        </div>
      </div>
            <div class="formBoxWrapper">
            <div class="formBox" >
                <label > Who do you currently live with?</label> <br>
                    <autocomplete [oldChoice]="localState.liveWith" [placeholder]="'Country'" [options]="options.livewithOptions" (onChosen)="setAnswer('liveWith', $event)" ></autocomplete>
                  </div>

            </div>
      <div class="formBoxWrapper">

       <div class="formBox" >
        <label > What is your relationship status?</label> <br>
        <autocomplete
        [oldChoice]="localState.relationshipStatus"
        [placeholder]="'Select your relationship status'"
        [options]="options.relationshipOptions"
        (onChosen)="setAnswer('relationshipStatus', $event)"></autocomplete>
      </div>

       <div class="formBox" >
        <label class="right"> What is your sexual identification?</label> <br>
        <autocomplete
        [oldChoice]="localState.sexualIdentification"
        [placeholder]="'Select your sexual identification'"
        [options]="options.orientationOptions"
        (onChosen)="setAnswer('sexualIdentification', $event)"></autocomplete>
      </div>

        </div>

      <div class="formBoxWrapper">
        <div class="formBox flexBottomLeft flexBottomRight">
          <label> What is your ethnicity? </label> <br>
        <autocomplete
        [oldChoice]="localState.ethnicity"
        [placeholder]="'Select your ethnicity'"
        [options]="options.ethnicityOptions"
        (onChosen)="setAnswer('ethnicity', $event)"></autocomplete>
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


export class BackgroundInfoComponent extends Survey implements OnDestroy{
  title = "Background Info"
  router: Router;
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
    liveWith: '',
    onCampus: '',
    campusHousing: '',
    ethnicity: '',
  }
  SUBS: any = {};

  constructor(private miniProfile: MiniProfileService, private questions: QuestionsService, private options: OptionService,  private navigator: NavigatorService, private appState: AppState) {
    super(questions, this.localState);
    this.appState.set('section', 'basic');
    this.appState.set('page', 'backgroundInfo');

    bginfoQuestions.forEach((item)=>{
      this.SUBS[item] = this.answer(item);
    });
    this.SUBS['otherLanguages'] = this.answers('otherLanguages');
  }
  ngOnDestroy(){
    bginfoQuestions.forEach((item)=>{
      this.SUBS[item].unsubscribe();
    });
    this.SUBS['otherLanguages'].unsubscribe();
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
    if(field == 'ethnicity'){
      this.miniProfile.ethnicity = value;
    }
  }




}
