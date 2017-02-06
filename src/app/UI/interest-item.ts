import {Component, EventEmitter, Input, Output} from '@angular/core';


@Component({
  selector: "interest-item",
  template: `
          <div class="interest-tags-box">
           <span>
           <span class="no-highlight"
           *ngFor="let choice of chosen; let i = index; ">
              <span > {{choice.answer}} </span>
            <svg (click)="removeTag(i)" class ="closeButton" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 84 84" style="enable-background:new 0 0 84 84;" xml:space="preserve" width="512px" height="512px">
            <g>
              <g>
                <path d="M42,0C18.803,0,0,18.807,0,42c0,23.197,18.803,42,42,42c23.193,0,42-18.803,42-42    C84,18.807,65.193,0,42,0z M50.643,42l15.303,15.302l-8.643,8.642L42.002,50.643L26.699,65.944l-8.641-8.642L33.359,42    l-15.3-15.298l8.641-8.646L42,33.357l15.301-15.299l8.643,8.641L50.643,42z" fill="#FFFFFF"/>
              </g>
            </g>
            </svg>

           </span>
            <span class="input" >
              <input
              (keyup)="choose($event)"
                 [(ngModel)] = "currentVal"
                 [attr.placeholder] = "placeholder"
                 class="dropdown-input"  autocomplete="off" aria-autocomplete="list">
            </span>
           </span>
         </div>
`,
})


export class InterestItem {
  @Output() save = new EventEmitter<any>();
  @Input('answers') chosen: string[] =  [];
  @Input('placeholder') placeholder: string;
   currentVal: string;
  @Output() answersChange = new EventEmitter<any>();
  constructor() {
  }
  removeTag(i){
    this.chosen.splice(i, 1);
    this.answersChange.emit(this.chosen);
    this.save.emit(true);
  }


  choose(e){
    if(this.currentVal.length == 0) {
      if (e.keyCode == 8) {
        this.chosen.pop();
        this.answersChange.emit(this.chosen);
        this.save.emit(true);
      }
    }
    if(this.currentVal.length > 0) {
      if (e.keyCode == 13) {
        this.chosen.push({answer: e.target.value});
        this.currentVal = "";
        this.answersChange.emit(this.chosen);
        this.save.emit(true);
      }
    }
  }



}
