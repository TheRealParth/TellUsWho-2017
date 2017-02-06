import {Component}      from '@angular/core'
import {AppState} from "../app.service";
import {NavigatorService} from "../services/navigator.service";
import {InterestWithCategory } from "../UI/interestWithCategory"
import {OptionService} from "../services/options.service";
import {InterestService} from "../services/interests.service";
import {INTERESTS} from '../models/interests.ts';
import {Interest} from "../models/interest.model";
import {List} from "immutable";
import {OnDestroy} from "@angular/core";
import {MiniProfileService} from "../services/mini-profile.service";

@Component({
	selector: "interests",
	providers: [OptionService, NavigatorService, InterestService, MiniProfileService],
  template: `
<h2 style="font-size: 1.5em;
    text-align: center;
    margin-top: 200px;
    padding-right: 220px;
   ">In this section, we're interested in all your personal interests, <br>
   activities and hobbies. Please list as many as you can think of.</h2>
<div class="barFix to-the-left">
	<div id="interest-tags">
		<div >
		  <span  [class.complete]="interest.completed" [class.active]="currentIndex == i" [class.scratch]="interest.removed" *ngFor="let interest of interests; let i = index;" > {{interest.name}} </span>
		</div>

	</div>
	<div id="main" class="interestsHeight">
	<div *ngFor="let interest of interests; let i = index">
    <interest-with-category [answers]='interest.answers || []' *ngIf="interest.options && (i === currentIndex)" [options]="interest.options"   (onDone)="finish(interest, $event)" (onRemove)="removeNext()" [name]="interest.name" [title]="interest.title" [placeholder]="interest.placeholder"></interest-with-category>
	</div>
	<a *ngIf="!done" (click)="nextInterest()" id="navigator" class="next">Next</a>

	</div>
</div>
<div class="blockContainer">
	<a *ngIf="done" (click)="nextPage()" id="navigator">Continue</a>
</div>
`,
directives: [InterestWithCategory],
})


export class InterestsComponent implements OnDestroy {
    done: boolean = false;
    currentIndex: number = 0;
    localState = {
      currentInterest: {},
    }
    private interests: List<Interest> = INTERESTS;

    constructor(private miniProfile: MiniProfileService, private appState: AppState, private options: OptionService, private interestService: InterestService, private navigator: NavigatorService){
      // interestService.saveInterest().then((value)=>{if(value)console.log(value)});
      //get initial list of interests if any
      this.thingy = this.interestService.getInterests().subscribe( (data)=>{data.forEach(item=>{
        const index = this.interests.findIndex((j: Interest) =>j.shortName === item.shortName);
        this.interests = this.interests.set(index, item);
          if(index>this.currentIndex) this.currentIndex = index;
      })

      });

    }
    ngOnDestroy(){
      if(this.thingy)this.thingy.unsubscribe();
      this.appState.set('profileBuilder', false);
    }
    finish(intrst, e){
      intrst.answers = e;
      this.interests = this.interests.set(this.currentIndex, intrst);
      this.interestService.saveInterest(this.interests.get(this.currentIndex))
        .then((value)=>{if(value)console.log(value)})
        .catch((err)=>{console.log(err)});
    }

    nextInterest(){
      if(this.currentIndex<= this.interests.size){
        const stuff =  this.interests.get(this.currentIndex)
        console.log(stuff.answers);
        if(stuff.answers){
          stuff.removed = false;
        stuff.completed = true;
        this.miniProfile.interests = stuff.answers;
        this.interests.set(this.currentIndex, stuff);
        this.interestService.saveInterest(this.interests.get(this.currentIndex))
          .then((value)=>{if(value)console.log(value)})
          .catch((err)=>{console.log(err)});
        this.currentIndex += 1;
        } else {
            //TODO: incomplete error
        }
      }
      if(this.currentIndex == this.interests.size){
        this.done=true;
      }
    }
    removeNext() {
      if (this.currentIndex < this.interests.size) {
        const stuff = this.interests.get(this.currentIndex)
            stuff.removed = true;
            stuff.completed = false;

        this.interests = this.interests.set(this.currentIndex, stuff);
        this.interestService.saveInterest(this.interests.get(this.currentIndex))
          .then((value)=>{if(value)console.log(value)})
          .catch((err)=>{console.log(err)});
        this.currentIndex += 1;
      }
      if(this.currentIndex == this.interests.size){
        this.done=true;
      }
    }

    nextPage(){
      //run field checks here
      this.navigator.next();
      window.scroll(0,0);
    }
}
