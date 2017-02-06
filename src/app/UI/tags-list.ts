import {Component, ViewEncapsulation, Input, Output, EventEmitter, ElementRef} from '@angular/core';
import {DND_DIRECTIVES } from 'ng2-dnd/';
@Component({
  selector: 'tag-list',
  encapsulation: ViewEncapsulation.None,
  template: `
  <div class="tabContainer">
  <h5 style="color:#666">Social groups</h5>
    <ul class="contactsList tagsList">
        <div *ngFor="let tag of tagsArray" >
            <li  *ngIf="tag.type=='social groups'" class="tagDiv" [ngClass]="{active:tag.active}" (click)="activateTag(tag)" [style.background-color]="tag.color">               {{tag.group}}
            </li>
        </div>
    </ul>
  <h5 style="color:#666">Organizations</h5>
    <ul class="contactsList tagsList">
        <div *ngFor="let tag of tagsArray" >
            <li  *ngIf="tag.type=='organizations'" class="tagDiv" [ngClass]="{active:tag.active}" (click)="activateTag(tag)" [style.background-color]="tag.color">               {{tag.group}}
            </li>
        </div>
    </ul>
  <h5 style="color:#666">Interests</h5>
    <ul class="contactsList tagsList">
        <div *ngFor="let tag of tagsArray" >
            <li  *ngIf="tag.type=='interests'" class="tagDiv" [ngClass]="{active:tag.active}" (click)="activateTag(tag)" [style.background-color]="tag.color">               {{tag.group}}
            </li>
        </div>
    </ul>
    <button type="button" class="btn btn-sm btn-primary pull-right">Add +</button>
  </div>
    `,

directives: [DND_DIRECTIVES]
})

export class TagList {
  searchValue:string = "";
  @Input() tagsArray:Array;
  @Input() tagSelected = '';
  @Output() tagActivated = new EventEmitter();
  constructor(private el:ElementRef) {
  }
  handleChange(e) {
  }
  activateTag(tag){
      for(let i in this.tagsArray){
          this.tagsArray[i].active = false
      }
      tag.active = true;
      this.tagSelected = tag;
      console.log(this.tagSelected)
      this.tagActivated.emit(this.tagSelected);
  }
}

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
