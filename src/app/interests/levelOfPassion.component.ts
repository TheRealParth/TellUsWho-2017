import {Component, OnDestroy}  from '@angular/core';
import {AppState} from "../app.service";
import {DND_DIRECTIVES } from 'ng2-dnd/';
import {NavigatorService} from "../services/navigator.service";
import { InterestService} from "../services/interests.service";
import {Dnd} from "../models/dnd.model";

@Component({
  selector: "passion",
  template: `
<div  class="barFix section4">    
    <h2 style="font-size: 15px; text-align:center;">Please indicate how passionate you are about each of the activities by dragging them into the categories below</h2>
    <div class="cardHolder dragFrame ">
    
       <div *ngFor="let interest of interests; let i =index" dnd-draggable [dragEnabled]="true"
                      [dropZones]="['slightly', 'somewhat', 'not', 'moderately', 'extremely']" 
                      [dragData]="interest"
                      class="formBox formBox-drag reviewBox ">
                    
            
        <div style="padding:0px">	
        <div class="interestHeader no-highlight" style="font-size: 15px; line-height: .5;">{{interests[i].answer}}</div>
          <div class="inlineInput">
          </div>
            <div class="background"></div>
        </div>     
       </div>
	    
    </div>
    <div class="droppables">
      <div  dnd-droppable  [dropZones]="['not']" (onDropSuccess)="putItem('not', $event)" class="droppableOption"><h3>Not at all passionate</h3>
          <span class="dropbox"><div   *ngFor="let item of localState.passionate.not" class="stackedcard">{{item.answer}}<div (click)="removeItem('not', item)" class="closeCard no-highlight">X</div></div></span></div>
      <div  dnd-droppable  [dropZones]="['slightly']" (onDropSuccess)="putItem('slightly', $event)" class="droppableOption"><h3>Slightly Passionate</h3>
          <span class="dropbox"><div  *ngFor="let item of localState.passionate.slightly" class="stackedcard">{{item.answer}}<div (click)="removeItem('slightly', item)" class="closeCard no-highlight">X</div></div></span></div>
      <div  dnd-droppable  [dropZones]="['somewhat']"  (onDropSuccess)="putItem('somewhat', $event)" class="droppableOption"><h3>Somewhat Passionate</h3>
          <span class="dropbox"><div  *ngFor="let item of localState.passionate.somewhat" class="stackedcard">{{item.answer}}<div (click)="removeItem('somewhat', item)" class="closeCard no-highlight">X</div></div></span></div>
	    <div   dnd-droppable  [dropZones]="['moderately']" (onDropSuccess)="putItem('moderately', $event)" class="droppableOption"><h3>Moderately Passionate</h3>
	        <span class="dropbox"><div  *ngFor="let item of localState.passionate.moderately" class="stackedcard">{{item.answer}}<div (click)="removeItem('moderately', item)" class="closeCard no-highlight">X</div></div></span></div>
	    <div  dnd-droppable  [dropZones]="['extremely']" (onDropSuccess)="putItem('extremely', $event)" class="droppableOption"><h3>Extremely Passionate</h3>
	        <span class="dropbox"><div  *ngFor="let item of localState.passionate.extremely" class="stackedcard">{{item.answer}}<div (click)="removeItem('extremely', item)" class="closeCard no-highlight">X</div></div></span></div>
    </div>
	</div>	   
	<div class="blockContainer">
	<a (click)="nextPage()" id="navigator">Continue</a>
	</div>
`,
  directives: [ DND_DIRECTIVES],
})
export class PassionComponent extends Dnd {
  localState = {
    passionate: {
      not: [],
      slightly: [],
      somewhat: [],
      moderately: [],
      extremely: [],
    }
  }
  interestRefs = {};
  interests = [];
  done = {};
  index = 0;
  interestSub: any;
  constructor(private navigator: NavigatorService,private appState: AppState, private  interestService: InterestService){
    super("passionate", this.localState, this.interests, this.interestRefs);
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
                if(val.passionate == 'not'){
                  if(this.localState.passionate.not.indexOf(val)==-1){
                    this.localState.passionate.not.push(val);
                  }
                }
                else if(val.passionate == 'slightly'){
                  if(this.localState.passionate.slightly.indexOf(val)==-1){
                    this.localState.passionate.slightly.push(val);
                  }
                }
                else if(val.passionate == 'somewhat') {
                  if(this.localState.passionate.somewhat.indexOf(val)==-1){
                    this.localState.passionate.somewhat.push(val);
                  }
                }
                else if(val.passionate == 'moderately'){
                  if(this.localState.passionate.moderately.indexOf(val)==-1){
                    this.localState.passionate.moderately.push(val);
                  }
                }
                else if(val.passionate == 'extremely'){
                  if(this.localState.passionate.extremely.indexOf(val)==-1){
                    this.localState.passionate.extremely.push(val);
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
