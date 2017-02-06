import {Component}      from '@angular/core';
import {RouterLink,
  ROUTER_DIRECTIVES }   from '@angular/router'
import {AppState} from "../app.service";
import {DND_DIRECTIVES } from 'ng2-dnd/';
import {NavigatorService} from "../services/navigator.service";
import {MapSearch} from "../UI/MapSearch";
import {OptionService} from "../services/options.service";
import {InterestService} from "../services/interests.service";
import {Dnd} from "../models/dnd.model";
@Component({
  selector: "places",
  template: `
<div  class="barFix section4">    
    <h2 style="font-size: 1.5em; text-align:center;">Where are the places where you do or would like to do this activity?</h2>
    <div class="cardHolder dragFrame ">
     <div class="formBox formBox-drag reviewBox no-highlight" *ngFor="let interest of interests" >
	    <div class="interestHeader no-highlight" style="font-size: 15px; line-height: .5;">{{interest.answer}}</div>
      <div class="interest-tags-box" >
           <span>
             <span class="no-highlight" 
             *ngFor="let place of interest.places">
                 {{place}} 
              <svg (click)="removeMethod(interest, place)" class ="closeButton" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 84 84" style="enable-background:new 0 0 84 84;" xml:space="preserve" width="512px" height="512px">
              <g>
                <g>
                  <path d="M42,0C18.803,0,0,18.807,0,42c0,23.197,18.803,42,42,42c23.193,0,42-18.803,42-42    C84,18.807,65.193,0,42,0z M50.643,42l15.303,15.302l-8.643,8.642L42.002,50.643L26.699,65.944l-8.641-8.642L33.359,42    l-15.3-15.298l8.641-8.646L42,33.357l15.301-15.299l8.643,8.641L50.643,42z" fill="#FFFFFF"/>
                </g>
              </g>
              </svg>
    
             </span>
           </span>
         </div>
	    <map-search (onSelect)="addMethod(interest, $event)"></map-search>
	    	  <button (click)="addMethod(interest)" class="addmoreButton">add</button>
	        <div class="background"></div>
	    
    </div>
     
	</div>	   
	<div class="blockContainer">
	<a (click)="nextPage()" id="navigator">Continue</a>
	</div></div>

`,
  directives: [RouterLink, ROUTER_DIRECTIVES, DND_DIRECTIVES, MapSearch],
  providers: [OptionService]
})




export class PlacesComponent extends Dnd {

  interestRefs = {};
  interests = [];
  done = {};
  index = 0;

  constructor(private options: OptionService, private navigator: NavigatorService,private appState: AppState, private  interestService: InterestService) {
    super("places", {}, this.interests, this.interestRefs);
    this.interestSub = this.interestService.getInterests().subscribe((data)=> {
      data.forEach(item=> {
          if (item.completed) {
            this.interestRefs[item.shortName] = item.answers;
            var i = 0;
            item.answers.forEach(ans=> {
              var j = 0;
              ans.value.forEach(val=> {
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

  addMethod(answer, place){
    console.log(place)
    if(!answer.places) answer.places = [];
    answer.places.push(place);
    answer.currentPlace = '';
    this.saveToDb(answer)
  }
  removeMethod(answer, method){
    if(!answer.places) answer.places = [];
    answer.places.splice(answer.places.indexOf(method), 1);
    this.saveToDb(answer)
  }

}
