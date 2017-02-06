import {Component, Input, Output} from '@angular/core';
import {EventEmitter} from "@angular/platform-browser-dynamic/src/facade/async";

@Component({
  selector: "choose-five",
  template: `
  	<div *ngIf="type==0" class="btn-group fiveGroup">
	      <button  type="button" class="btn btn-primary" [class.chosen]="chosen == 0" (click)="chose(0)" class="btn btn-primary">Extremely <br>Uncharacteristic</button>
	      <button  type="button" class="btn btn-primary" [class.chosen]="chosen == 1" (click)="chose(1)" class="btn btn-primary">Uncharacteristic</button>
        <button  type="button" class="btn btn-primary" [class.chosen]="chosen == 2" (click)="chose(2)" class="btn btn-primary">Neutral</button>
	      <button  type="button" class="btn btn-primary" [class.chosen]="chosen == 3" (click)="chose(3)" class="btn btn-primary">Characteristic</button>
	      <button  type="button" class="btn btn-primary" [class.chosen]="chosen == 4" (click)="chose(4)" class="btn btn-primary">Extremely <br>Characteristic</button>
    </div>
    <div *ngIf="type==1" class="btn-group fiveGroup">
	      <button  type="button" class="btn btn-primary" [class.chosen]="chosen == 0" (click)="chose(0)" class="btn btn-primary">Strongly <br>Disagree</button>
	      <button  type="button" class="btn btn-primary" [class.chosen]="chosen == 1" (click)="chose(1)" class="btn btn-primary">Disagree</button>
        <button  type="button" class="btn btn-primary" [class.chosen]="chosen == 2" (click)="chose(2)" class="btn btn-primary">Neutral</button>
	      <button  type="button" class="btn btn-primary" [class.chosen]="chosen == 3" (click)="chose(3)" class="btn btn-primary">Agree</button>
	      <button  type="button" class="btn btn-primary" [class.chosen]="chosen == 4" (click)="chose(4)" class="btn btn-primary">Strongly <br>Agree</button>
    </div>
    <div *ngIf="type==2" class="btn-group fiveGroup">
	      <button  type="button" class="btn btn-primary" [class.chosen]="chosen == 0" (click)="chose(0)" class="btn btn-primary">Very happy<br>at NJIT</button>
	      <button  type="button" class="btn btn-primary" [class.chosen]="chosen == 1" (click)="chose(1)" class="btn btn-primary">Happy<br>at NJIT</button>
        <button  type="button" class="btn btn-primary" [class.chosen]="chosen == 2" (click)="chose(2)" class="btn btn-primary">Neutral</button>
	      <button  type="button" class="btn btn-primary" [class.chosen]="chosen == 3" (click)="chose(3)" class="btn btn-primary">Unhappy<br>at NJIT</button>
	      <button  type="button" class="btn btn-primary" [class.chosen]="chosen == 4" (click)="chose(4)" class="btn btn-primary">Very unhappy<br>at NJIT</button>
    </div>
    <div *ngIf="type==3" class="btn-group fiveGroup">
	      <button  type="button" class="btn btn-primary" [class.chosen]="chosen == 0" (click)="chose(0)" class="btn btn-primary">Will definitely<br>stay at NJIT</button>
	      <button  type="button" class="btn btn-primary" [class.chosen]="chosen == 1" (click)="chose(1)" class="btn btn-primary">Will probably<br>stay at NJIT</button>
        <button  type="button" class="btn btn-primary" [class.chosen]="chosen == 2" (click)="chose(2)" class="btn btn-primary">Neutral</button>
	      <button  type="button" class="btn btn-primary" [class.chosen]="chosen == 3" (click)="chose(3)" class="btn btn-primary">Will probably <br>leave NJIT</button>
	      <button  type="button" class="btn btn-primary" [class.chosen]="chosen == 4" (click)="chose(4)" class="btn btn-primary">Will definitely<br>leave NJIT</button>
    </div>
    <div *ngIf="type==4" class="btn-group fiveGroup">
	      <button  type="button" class="btn btn-primary" [class.chosen]="chosen == 0" (click)="chose(0)" class="btn btn-primary">Never</button>
	      <button  type="button" class="btn btn-primary" [class.chosen]="chosen == 1" (click)="chose(1)" class="btn btn-primary">Hardly Ever</button>
        <button  type="button" class="btn btn-primary" [class.chosen]="chosen == 2" (click)="chose(2)" class="btn btn-primary">Sometimes</button>
	      <button  type="button" class="btn btn-primary" [class.chosen]="chosen == 3" (click)="chose(3)" class="btn btn-primary">Often</button>
	      <button  type="button" class="btn btn-primary" [class.chosen]="chosen == 4" (click)="chose(4)" class="btn btn-primary">Always</button>
    </div>
`,
})


export class ChooseFive {
  @Input('type') type: number = 0;
  @Input('oldChoice') chosen: number;
  @Output() onChosen = new EventEmitter<number>();
  constructor() {
  }
  chose(i: number){
    if(this.chosen != i){
      this.chosen = i;
      this.onChosen.emit(this.chosen);
    }
  }
}

