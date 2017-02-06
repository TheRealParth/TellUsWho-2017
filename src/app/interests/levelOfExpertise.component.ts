import {Component}      from '@angular/core';
import {RouterLink, ROUTER_DIRECTIVES }   from '@angular/router';
import {AppState} from "../app.service";
import {DND_DIRECTIVES } from 'ng2-dnd/';
import {NavigatorService} from "../services/navigator.service";
import {InterestService } from "../services/interests.service";
import {Dnd} from "../models/dnd.model";

@Component({
  selector: "expertise",
  providers: [NavigatorService, InterestService],
  template: `
<div  class="barFix section4">
    <h2 style="font-size: 15px; text-align:center;">Please indicate your level of expertise about each activity and/or interest by dragging them into the categories below</h2>
    <div class="cardHolder dragFrame ">
     <div *ngFor="let interest of interests; let i =index" dnd-draggable dragEnabled="true"
                    dropZones="[ 'not', 'novice', 'intermediate', 'expert']"
                    dragData="interest"
                    class="formBox formBox-drag reviewBox ">


      <div style="padding:0px">
	    <div class="interestHeader no-highlight" style="font-size: 15px; line-height: .5;">{{interest.answer}}</div>
	    	<div class="inlineInput">
        </div>

	    </div>
	    </div>

    </div>
    <div class="droppables">
      <div  dnd-droppable  dropZones="['not']" (onDropSuccess)="putItem('not', $event)" class="droppableOption"><h3>Does not apply</h3>
          <span class="dropbox"><div  *ngFor="let item of localState.expertise.not" class="stackedcard">{{item.answer}}<div (click)="removeItem('not', item)" class="closeCard no-highlight">X</div></div></span></div>
      <div  dnd-droppable  dropZones="['novice']" (onDropSuccess)="putItem('novice', $event)" class="droppableOption"><h3>Novice</h3>
          <span class="dropbox"><div  *ngFor="let item of localState.expertise.novice" class="stackedcard">{{item.answer}}<div (click)="removeItem('novice', item)" class="closeCard no-highlight">X</div></div></span></div>
      <div  dnd-droppable  dropZones="['intermediate']"  (onDropSuccess)="putItem('intermediate', $event)" class="droppableOption"><h3>Intermediate</h3>
          <span class="dropbox"><div  *ngFor="let item of localState.expertise.intermediate" class="stackedcard">{{item.answer}}<div (click)="removeItem('intermediate', item)" class="closeCard no-highlight">X</div></div></span></div>
	    <div   dnd-droppable  dropZones="['expert']" (onDropSuccess)="putItem('expert', $event)" class="droppableOption"><h3>Expert</h3>
	        <span class="dropbox"><div  *ngFor="let item of localState.expertise.expert" class="stackedcard">{{item.answer}}<div (click)="removeItem('expert', item)" class="closeCard no-highlight">X</div></div></span></div>
    </div>
	</div>
	<div class="blockContainer">
	<a (click)="nextPage()" id="navigator">Continue</a>
	</div>

`,
  directives: [RouterLink, ROUTER_DIRECTIVES, DND_DIRECTIVES],

})




export class ExpertiseComponent extends Dnd {
  localState = {
    expertise: {
      not: [],
      novice: [],
      intermediate: [],
      expert: [],
    }
  }
  interestRefs = {};
  interests = [];
  done = {};
  index = 0;
  interestSub: any;
  constructor(private navigator: NavigatorService, private interestService: InterestService, private appState: AppState){
    super("expertise", this.localState, this.interests, this.interestRefs);
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
                if(val.expertise == 'not'){
                  if(this.localState.expertise.not.indexOf(val)==-1){
                    this.localState.expertise.not.push(val);
                  }
                }
                else if(val.expertise == 'novice'){
                  if(this.localState.expertise.novice.indexOf(val)==-1){
                    this.localState.expertise.novice.push(val);
                  }
                }
                else if(val.expertise == 'intermediate') {
                  if(this.localState.expertise.intermediate.indexOf(val)==-1){
                    this.localState.expertise.intermediate.push(val);
                  }
                }
                else if(val.expertise == 'expert'){
                  if(this.localState.expertise.expert.indexOf(val)==-1){
                    this.localState.expertise.expert.push(val);
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
