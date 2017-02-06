import {Component}      from '@angular/core';
import {RouterLink,
  ROUTER_DIRECTIVES, Router }   from '@angular/router'
import {AppState} from "../app.service";
import {DND_DIRECTIVES } from 'ng2-dnd/'
import {NavigatorService} from "../services/navigator.service";
import {InterestService} from "../services/interests.service";
import {Dnd} from "../models/dnd.model";

@Component({
  selector: "group",
  providers: [ NavigatorService, InterestService],
  template: `
<div  class="barFix section4">
    <h2 style="font-size: 1.5em; text-align:center;">How would you like to do this activity with others?
   <br> Please drag each interest into one of the three buckets below.</h2>
    <div class="cardHolder dragFrame ">
     <div *ngFor="let interest of interests; let i =index" dnd-draggable dragEnabled="true"
                    dropZones="[ 'not', 'currently', 'future']"
                    dragData="interest"
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
      <div  dnd-droppable  dropZones="['not']" (onDropSuccess)="putItem('not', $event)" class="droppableOption"><h3>I do this by myself</h3>
          <span class="dropbox"><div  *ngFor="let item of localState.groupActivity.not" class="stackedcard">{{item.answer}}<div (click)="removeItem('not', item)" class="closeCard no-highlight">X</div></div></span></div>
      <div  dnd-droppable  dropZones="['currently']" (onDropSuccess)="putItem('currently', $event)" class="droppableOption"><h3>I currently do this in a group</h3>
          <span class="dropbox"><div  *ngFor="let item of localState.groupActivity.currently" class="stackedcard">{{item.answer}}<div (click)="removeItem('currently', item)" class="closeCard no-highlight">X</div></div></span></div>
      <div  dnd-droppable  dropZones="['future']"  (onDropSuccess)="putItem('future', $event)" class="droppableOption"><h3>I want to do this in a group in the future</h3>
          <span class="dropbox"><div  *ngFor="let item of localState.groupActivity.future" class="stackedcard">{{item.answer}}<div (click)="removeItem('future', item)" class="closeCard no-highlight">X</div></div></span></div>
    </div>
  </div>
  <div class="blockContainer">
  <a (click)="nextPage()" id="navigator">Continue</a>
  </div>

`,
  directives: [RouterLink, ROUTER_DIRECTIVES, DND_DIRECTIVES],

})




export class GroupComponent extends Dnd {
  localState = {
    groupActivity: {
      not: [],
      currently: [],
      future: [],
    }
  }
  interestRefs = {};
  interests = [];
  done = {};
  index = 0;


  constructor(private navigator: NavigatorService,private appState: AppState, private  interestService: InterestService){
    super("groupActivity", this.localState, this.interests, this.interestRefs);
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
                if(val.groupActivity == 'not'){
                  if(this.localState.groupActivity.not.indexOf(val)==-1){
                    this.localState.groupActivity.not.push(val);
                  }
                }
                else if(val.groupActivity == 'currently'){
                  if(this.localState.groupActivity.currently.indexOf(val)==-1){
                    this.localState.groupActivity.currently.push(val);
                  }
                }
                else if(val.groupActivity == 'future') {
                  if(this.localState.groupActivity.future.indexOf(val)==-1){
                    this.localState.groupActivity.future.push(val);
                  }
                }
                else {
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
