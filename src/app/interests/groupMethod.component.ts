import {Component}      from '@angular/core';
import {NavigatorService} from "../services/navigator.service";
import {Autocomplete} from "../UI/autocomplete";
import {OptionService} from "../services/options.service";
import {InterestService} from "../services/interests.service";
import {AppState} from "../app.service";
import {Dnd} from "../models/dnd.model";

@Component({
  selector: "group-method",
  template: `
<div  class="barFix section4">    
    <h2 style="font-size: 1.5em; text-align:center;">How would you like to do this activity with others?</h2>
    <div class="cardHolder dragFrame ">
     <div class="formBox formBox-drag reviewBox no-highlight" *ngFor="let interest of interests" >
     <div class="interestHeader no-highlight" style="font-size: 15px; line-height: .5;">{{interest.answer}}</div>
       
	     <div class="interest-tags-box" >
           <span>
             <span class="no-highlight" 
             *ngFor="let method of interest.methods">
                 {{method}} 
              <svg (click)="removeMethod(interest, method)" class ="closeButton" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 84 84" style="enable-background:new 0 0 84 84;" xml:space="preserve" width="512px" height="512px">
              <g>
                <g>
                  <path d="M42,0C18.803,0,0,18.807,0,42c0,23.197,18.803,42,42,42c23.193,0,42-18.803,42-42    C84,18.807,65.193,0,42,0z M50.643,42l15.303,15.302l-8.643,8.642L42.002,50.643L26.699,65.944l-8.641-8.642L33.359,42    l-15.3-15.298l8.641-8.646L42,33.357l15.301-15.299l8.643,8.641L50.643,42z" fill="#FFFFFF"/>
                </g>
              </g>
              </svg>
    
             </span>
           </span>
         </div>
      	
	    
	    <div class="inlineInput">
	                <div class="cuteLittleArrow method">
            <select [(ngModel)]="interest.currentMethod"  style="margin-left: 30px; margin-bottom:20px;" class="mySelect" id="gender" >
			         	<option  *ngFor="let option of options.verbs" >{{option}}</option>
			        </select>
			        </div>
	    	  <button (click)="addMethod(interest)" class="addmoreButton">add</button>
	        <div class="background"></div>
	    </div>     
	    
    </div>
    
	</div>	   
	<div class="blockContainer">
	<a (click)="nextPage()" id="navigator">Continue</a>
	</div>
</div>
`,
  directives: [Autocomplete],
  providers: [OptionService]

})




export class GroupMethodComponent extends Dnd {
  localState =  {};
  interestRefs = {};
  interests = [];
  done = {};
  index = 0;


  constructor(private options: OptionService, private navigator: NavigatorService,private appState: AppState, private  interestService: InterestService){
    super("methods", this.localState, this.interests, this.interestRefs );
    this.interestSub = this.interestService.getInterests().subscribe((data)=>{
      data.forEach(item=>{
          if(item.completed){
            this.interestRefs[item.shortName] = item.answers;
            var i = 0;
            item.answers.forEach(ans=>{
              if(!ans.methods) ans.methods = [];
              ans.shortName = item.shortName;
              ans.index = i;
              ans.value.forEach(val=>{
                  if (val.groupActivity == 'currently' || val.groupActivity == 'future') {
                    if (this.interests.indexOf(val) == -1) {
                      this.interests.push(val);
                    }
                  }
              });

              i++;
            });

          }
        }
      )
    });
  }
  addMethod(answer){
    if(!answer.methods) answer.methods = [];
    answer.methods.push(answer.currentMethod);
    answer.currentMethod = '';
    this.saveToDb(answer)
  }
  removeMethod(answer, method){
    if(!answer.methods) answer.methods = [];
    answer.methods.splice(answer.methods.indexOf(method), 1);
    this.saveToDb(answer)
  }
}

