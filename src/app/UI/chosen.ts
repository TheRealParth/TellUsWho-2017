import {Component, Input, Output} from '@angular/core';
import {EventEmitter} from "@angular/platform-browser-dynamic/src/facade/async";

@Component({
  selector: "chosen",
  template: `	<div class="btn-group">
	  <button  type="button" [class.chosen]="chosen == options[0]" (click)="chose(0)" class="btn btn-primary">{{options[0]}}</button>
	  <button  type="button" [class.chosen]="chosen == options[1]" (click)="chose(1)" class="btn btn-primary">{{options[1]}}</button>
	</div>
`,
})


export class Chosen {
  @Input('oldChoice') chosen: string = '';
  @Input('options') options: string[];
  @Output() onChosen = new EventEmitter<string>();
  constructor() {
  }
  chose(i: number){
    if(this.chosen != this.options[i]){
      this.chosen = this.options[i];
      this.onChosen.emit(this.chosen);
    }
  }
}

