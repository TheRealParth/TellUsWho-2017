import {Component}      from '@angular/core';
import {AppState} from "../app.service";
import {NavigatorService} from "../services/navigator.service";
import {InterestService} from "../services/interests.service";
import {Dnd} from "../models/dnd.model";

@Component({
  selector: "looking-for-others",
  template: `
<div  class="barFix section4">    
    <h2 style="font-size: 1.5em; text-align:center;">Select all interests that you are looking to do with other people.</h2>
    <div class="cardHolder dragFrame ">
     <div *ngFor="let interest of interests; let i =index" (click)="toggle(i)" class="formBox formBox-drag reviewBox no-highlight" [class.selected]="interest.looking">
                  
          
      <div style="padding:0px">	
	    <div class="interestHeader no-highlight" style="font-size: 15px; line-height: .5;">{{interest.answer}}</div>
	    	<div class="inlineInput">
        </div>
	        <div class="background"></div>
	    </div>     
	    </div>
      
    </div>
  </div>     
  <div class="blockContainer">
  <a (click)="nextPage()" id="navigator">Continue</a>
  </div>

`,

})




export class LookingForOthersComponent extends Dnd {
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
                this.interests.push(val);
                j++
              })


              i++;
            });

          }
        }
      );
    });
  }
  toggle(interest){
    if(this.interests[interest].looking) {
      this.interests[interest].looking = false;
      this.saveToDb(this.interests[interest])
    }
    else {
      this.interests[interest].looking = true;
      this.saveToDb(this.interests[interest])
    }
  }
}

