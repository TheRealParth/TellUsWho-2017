import {Component}      from '@angular/core';
import {RouterLink,
  ROUTER_DIRECTIVES, Router }   from '@angular/router'
import {AppState} from "../app.service";
import {DND_DIRECTIVES } from 'ng2-dnd/'
import {NavigatorService} from "../services/navigator.service";
import {InterestService} from "../services/interests.service";
import {Dnd} from "../models/dnd.model";
@Component({
  selector: "willing-to-teach",
  template: `
<div  class="barFix section4">    
    <h2 style="font-size: 1.5em; text-align:center;">Please drag each interest into a bucket below based on if you want to teach, coach, or learn more about the interest.</h2>
    <div class="cardHolder dragFrame ">
     <div *ngFor="let interest of interests; let i =index" dnd-draggable [dragEnabled]="true"
                    [dropZones]="[ 'not', 'teach', 'coach', 'learn']" 
                    [dragData]="interest"
                    class="formBox formBox-drag reviewBox ">
                  
          
      <div style="padding:0px">	
	    <div class="interestHeader no-highlight" style="font-size: 15px; line-height: .5;">{{interest.answer}}</div>
	    	<div class="inlineInput">
        </div>
	        <div class="background"></div>
	    </div>     
	    </div>

    </div>
    <div class="droppables">
      <div  dnd-droppable  [dropZones]="['not']" (onDropSuccess)="putItem('not', $event)" class="droppableOption"><h3>Does not apply</h3>
          <span class="dropbox"><div  *ngFor="let item of localState.willingToTeach.not" class="stackedcard">{{item.answer}}<div (click)="removeItem('not', item)" class="closeCard no-highlight">X</div></div></span></div>
      <div  dnd-droppable  [dropZones]="['teach']" (onDropSuccess)="putItem('teach', $event)" class="droppableOption"><h3>Willing to Teach</h3>
          <span class="dropbox"><div  *ngFor="let item of localState.willingToTeach.teach" class="stackedcard">{{item.answer}}<div (click)="removeItem('teach', item)" class="closeCard no-highlight">X</div></div></span></div>
      <div  dnd-droppable  [dropZones]="['coach']"  (onDropSuccess)="putItem('coach', $event)" class="droppableOption"><h3>Willing to Coach</h3>
          <span class="dropbox"><div  *ngFor="let item of localState.willingToTeach.coach" class="stackedcard">{{item.answer}}<div (click)="removeItem('coach', item)" class="closeCard no-highlight">X</div></div></span></div>
	    <div   dnd-droppable  [dropZones]="['learn']" (onDropSuccess)="putItem('learn', $event)" class="droppableOption"><h3>Want to be taught or coached</h3>
	        <span class="dropbox"><div  *ngFor="let item of localState.willingToTeach.learn" class="stackedcard">{{item.answer}}<div (click)="removeItem('learn', item)" class="closeCard no-highlight">X</div></div></span></div>
    </div>
	</div>	   
	<div class="blockContainer">
	<a (click)="nextPage()" id="navigator">Continue</a>
	</div>

`,
  directives: [RouterLink, ROUTER_DIRECTIVES, DND_DIRECTIVES],

})




export class WillingToTeachComponent extends Dnd {
  localState = {
    willingToTeach: {
      not: [],
      teach: [],
      coach: [],
      learn: [],
    }
  }
  interestRefs = {};
  interests = [];
  done = {};
  index = 0;
  constructor(private navigator: NavigatorService, private appState: AppState, private interestService: InterestService ){
    super("willingToTeach", this.localState, this.interests, this.interestRefs);
    this.interestSub = this.interestService.getInterests().subscribe((data)=>{
      data.forEach(item=>{
          if(item.completed){
            this.interestRefs[item.shortName] = item.answers;
            var i = 0;
            item.answers.forEach(ans=>{
              var j = 0;
              ans.value.forEach(val=>{
                val.shortName = item.shortName;
                val.index = i;
                val.valIndex = j;
                if(val.willingToTeach == 'not'){
                  if(this.localState.willingToTeach.not.indexOf(val)==-1){
                    this.localState.willingToTeach.not.push(val);
                  }
                }
                else if(val.willingToTeach == 'teach'){
                  if(this.localState.willingToTeach.teach.indexOf(val)==-1){
                    this.localState.willingToTeach.teach.push(val);
                  }
                }
                else if(val.willingToTeach == 'coach') {
                  if(this.localState.willingToTeach.coach.indexOf(val)==-1){
                    this.localState.willingToTeach.coach.push(val);
                  }
                }
                else if(val.willingToTeach == 'learn'){
                  if(this.localState.willingToTeach.learn.indexOf(val)==-1) {
                    this.localState.willingToTeach.learn.push(val);
                  }
                } else {
                  this.interests.push(val);
                }

                j++;
              });
              i++;
            });

          }
        }
      )

    });
  }

}

