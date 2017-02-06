import {Component, ViewEncapsulation} from '@angular/core';
import {CONTACTS} from "../models/contacts";
import {TAGS} from "../models/contacts";
import {Dnd} from "../models/dnd.model";
import {DND_DIRECTIVES } from 'ng2-dnd/';
@Component({
  selector: 'contact-list',
  encapsulation: ViewEncapsulation.None,
  template: `
  <div class="tabContainer">
      <input class="contactSearch" (keyup)="handleChange($event)" [(ngModel)]="searchValue"  placeholder="Search contacts">
      <ul class="contactsList" *ngIf="toggleSwitch">
        <li *ngFor="let contact of results" dnd-draggable dragEnabled="true"

                        dropZones="['people']"
                        dragData="contact">
          <img class = "userImg" [attr.src]="contact.imageUrl"> <span class="userInfo"><span class="contactName">{{contact.firstName + " " + contact.lastName}}</span><br>
          <span class="phone">{{ contact.phone }}</span><br><span class="email">{{ contact.email }}</span></span>
        </li>
      </ul>
      <button type="button" class="btn btn-primary pull-right">Add +</button>
</div>
    `,

directives: [DND_DIRECTIVES]
})

export class ContactList {
  public contacts = CONTACTS;
  public tags = TAGS;
  results = this.contacts;
  tagsList = this.tags;
  toggleSwitch = true;
  searchValue:string = "";
  constructor() {
  }
  handleChange(e) {
    if(this.searchValue.length == 0 ){
      this.results = this.contacts;
      return true;
    }
    if (e.target.value.length > 0) {
      this.results = [];
      this.contacts.forEach((x)=> {
        if (x.firstName.indexOf(e.target.value) > -1) {
           this.results.push(x);
        } else if (x.lastName.indexOf(e.target.value) > -1) {
          this.results.push(x);
        } else if (x.email.indexOf(e.target.value) > -1){
          this.results.push(x);
        } else if (x.phone.indexOf(e.target.value) > -1){
          this.results.push(x);
        }

      });
    }
  }
}

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
