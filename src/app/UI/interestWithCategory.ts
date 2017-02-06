import {Input, Component, Output, OnDestroy} from "@angular/core";
import {EventEmitter} from "@angular/platform-browser-dynamic/src/facade/async";
import {InterestItem} from "./interest-item";

@Component({
  selector: 'interest-with-category',
  template: `<div class="formBoxWrapper">
             <div class="formBox " >
            <div class="interestHeader">{{name}}<span (click)="onRemove.emit()" class="dislikeButton">Remove</span></div><hr>
            <div *ngIf="answers">
            <div *ngFor="let answer of answers">
             <div class="inlineInput">
           <p>My favorite </p>
                        <div class="cuteLittleArrow list dumb">
            <select (change)="saveInterests()" [(ngModel)]="answer.category"  class="mySelect" id="gender" >
			         	<option  *ngFor="let option of options" >{{option}}</option>
			        </select>
			        </div>
			        <p>are</p>
            <interest-item  (save)="saveInterests()" [placeholder]="placeholder" [(answers)] = "answer.value"></interest-item>
            </div>
            </div>
            </div>
            <div class="inlineInput">
           <p>My favorite </p>
                        <div class="cuteLittleArrow list dumb">
            <select [(ngModel)]="currentInterest.category"  class="mySelect" id="gender" >
			         	<option  *ngFor="let option of options" >{{option}}</option>
			        </select>
			        </div>
			       <p> are</p>
             <interest-item (save)="saveInterests()" [placeholder]="placeholder" [(answers)] = "currentInterest.value"></interest-item>
             </div>
             
             
            <span (click)="handleAddMore()" class="addmoreButton">+ Add</span>
            <div class="background"></div>
              
              </div>
              
              </div>
              
              `,
  directives: [InterestItem]
})
export class InterestWithCategory implements OnDestroy{
  @Input('name') name: string;
  @Input('title') title: string;
  @Input('placeholder') placeholder;
  @Input('options') options: string[] = [];
  @Output() onRemove = new EventEmitter<string>();
  @Output() onDone = new EventEmitter<any>();
  private currentInterest = {category: '', value: []};
  @Input('answers') answers = [];
  constructor() {

  }

  resetAnswers(){
  this.answers = [];
  this.currentInterest = {category: '', value: []};
  }
  handleAddMore(){
    this.saveInterests();
    this.checkInputs();
  }

  ngOnDestroy(){
    this.saveInterests()
  }
  saveInterests(){
      for(var i in this.answers){
        if(this.answers[i].value.length >0 && this.answers[i].category.length>0){
          continue;
        } else if( this.answers[i].value.length == 0 || this.answers[i].category.length == 0 ) {
          this.answers.splice(i,1);
          //TODO:: ERROR MESSAGE

        }
      }
      if(this.currentInterest.value.length>0 && this.currentInterest.category.length>0){
        this.onDone.emit(this.answers.concat(this.currentInterest))
        this.resetAnswers()
      } else {
        this.onDone.emit(this.answers);
      }
  }
  checkInputs(){
    if(this.currentInterest.value.length > 0 && this.currentInterest.category.length > 0){
      this.answers.push({value: this.currentInterest.value, category: this.currentInterest.category });
      this.currentInterest.value = [];
      this.currentInterest.category = '';
    }

  }

}
