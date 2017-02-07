import { Component } from '@angular/core';
import { SOCIALGROUPQUESTIONS } from "../models/socialQuestions";
import { TAGCOLORS } from "../models/socialQuestions";
import { ProfileService } from "../services/profile.service";
import { ContactList } from '../UI/contacts-list';
import { TagList } from '../UI/tags-list';
import { DND_DIRECTIVES } from "ng2-dnd";
import { Dnd } from "ng2-dnd";
@Component({
  selector: 'social',
  template: `

<div class="contactsContainer" style="margin-top: 13%;">
  <div class="contacts">
    <ul class="socialTabs nav nav-pills nav-justified">
      <li role="contacts" [class.active]="tabSelected=='contacts'" (click)="tabSelected='contacts'"><a>Contacts</a></li>
      <li role="tags" [class.active]="tabSelected=='tags'" (click)="tabSelected='tags'" *ngIf="currentGroup=='arrange'"><a>Tags</a></li>
    </ul>
    <contact-list *ngIf="tabSelected=='contacts'"></contact-list>
    <tag-list *ngIf="tabSelected=='tags'" (tagActivated)="setTag($event)" [tagsArray] = 'tagsArray' ></tag-list>
  </div>
</div>
<div class="socialMap" >
<h3> Adding people to your social map</h3>
<div *ngFor="let obj of tagsArray; let i = index">
    <p *ngIf= "i==currentQues"> Add your <span [style.color]="obj.color"><b><span [style.border-bottom-color]="addColor(tagsArray[currentQues],'triangle')" [style.background-color]="addColor(tagsArray[currentQues],'background')" class="inlineSymbol" [ngClass]="{'tagCircle':tagsArray[currentQues].symbol=='tagCircle', 'tagTriangle':tagsArray[currentQues].symbol=='tagTriangle', 'tagSquare':tagsArray[currentQues].symbol=='tagSquare'}"></span>{{obj.group}}</b></span> to the social map by dragging them from your contact list.<br>
     If the contact is already in the dropbox, you can simple click the contact to add them to the  <span [style.color]="obj.color"><b><span [style.border-bottom-color]="addColor(tagsArray[currentQues],'triangle')" [style.background-color]="addColor(tagsArray[currentQues],'background')" class="inlineSymbol" [ngClass]="{'tagCircle':tagsArray[currentQues].symbol=='tagCircle', 'tagTriangle':tagsArray[currentQues].symbol=='tagTriangle', 'tagSquare':tagsArray[currentQues].symbol=='tagSquare'}"></span>{{obj.group}}</b></span> group. <br>
     If you want to remove the contact from the current group, click the contact again.<br> At the end of this series of questions, you'll be able to review and change all of the contacts and their groups.
    </p>

</div>
<input  class="zoom-slider pull-right" type="range" (change)="log($event.target.value)" style="width: 20%;"/>
      <div   dnd-droppable dropZones="['people']" (onDropSuccess)="addContact($event)" class="daZone no-highlight" style="position: static; overflow: scroll;">
          <div id="dropbox" [ngStyle]="{'zoom' : zoom}"  (mousedown)="mouseDown($event);" class="dropbox" style="position: relative; min-height: inherit;">
          <div id="self" dnd-draggable *ngFor="let contact of selected" class="contactCard no-highlight" [style.background-color]="showContactsNotInGroup(contact)"  [ngStyle]="{'top': contact.offsetY - 40 + 'px', 'left': contact.offsetX - 90 + 'px'}"
          dropZones="['people']"
                    dragData="contact" (click)="addToGroup(contact)">
           <svg (click)="removeContact(contact)" class ="closeButton" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 84 84" style="enable-background:new 0 0 84 84;" xml:space="preserve" width="512px" height="512px">
            <g >
              <g>
                <path d="M42,0C18.803,0,0,18.807,0,42c0,23.197,18.803,42,42,42c23.193,0,42-18.803,42-42    C84,18.807,65.193,0,42,0z M50.643,42l15.303,15.302l-8.643,8.642L42.002,50.643L26.699,65.944l-8.641-8.642L33.359,42    l-15.3-15.298l8.641-8.646L42,33.357l15.301-15.299l8.643,8.641L50.643,42z" fill="#4eadef"/>
              </g>
            </g>
            </svg>

          <img class ="userImg"[attr.src]="contact.imageUrl"><h3 class="contactName">{{contact.firstName + " " + contact.lastName}}</h3><br id="self"><p id="self" class="email">{{contact.email}}</p>
          <hr >
          <div [ngClass]="{'tagCircle':group.symbol=='tagCircle', 'tagTriangle':group.symbol=='tagTriangle', 'tagSquare':group.symbol=='tagSquare'}" *ngFor="let group of contact.groups" [style.background-color]="addColor(group,'background')" [style.border-bottom-color]="addColor(group,'triangle')"></div>
        </div>
        </div>
      </div>
        <a id="navigator" class="pull-right" style="position: relative;margin-right:0; top:5px;" (click)="nextQues();" *ngIf="currentGroup!='arrange'"> Continue </a>
</div>
`,
  directives: [ContactList,TagList, DND_DIRECTIVES],
  providers:[ProfileService]
})
export class SocialComponent {
  tabSelected = 'contacts';
  tagSelected=null;
  tagsArray = [];
  socialGrpQuestions = SOCIALGROUPQUESTIONS;
  colors = TAGCOLORS;
  organizations=[];
  interests = [];
  currentQues = 0;
  currentGroup = 'social';
  selected = [];
  mouseX=0;
  mouseY=0;
  mouseOffsetX=0;
  mouseOffsetY=0;
  zoom = 0;
  constructor(private profile:ProfileService){
    this.profile.getOrganizations().subscribe((data)=>{
        this.organizations = data;
    })
    this.profile.getAddedInterests().subscribe((data)=>{
        data.forEach((item)=>{
            if(!item.removed && item.completed){
                this.interests.push(item);
            }
        })
        this.getTagArray(this.organizations,this.interests);
    })
  }
  ngOnInit(){
      console.log("init")
  }
  log(e){
    var x = parseInt(e);
    x = (x+50)/100;
    console.log(x)
    this.zoom = x;
  }
  getTagArray(orgData, intData){
    var index = 0
    for(var i in this.socialGrpQuestions._tail.array){
        this.tagsArray.push({
          group:this.socialGrpQuestions._tail.array[i].question,
          color:this.colors._tail.array[i],
          type:'social groups',
          symbol:'tagCircle',
          active:false
      })
      index = i;
    }
    for(var i in orgData){
        index++;
        this.tagsArray.push({
          group:orgData[i].value,
          color:this.colors._tail.array[index],
          type:'organizations',
          symbol:'tagTriangle',
          active:false
        })
    }
    for(var i in intData){
        index++;
        console.log(index)
        this.tagsArray.push({
          group:intData[i].name,
          color:this.colors._tail.array[index],
          type:'interests',
          symbol:'tagSquare',
          active:false
        })
    }

    this.tagSelected = this.tagsArray[0];
    console.log(this.tagsArray)
}
  removeContact(e){
    for(var i in this.selected){
      if(this.selected[i] == e){
        this.selected.splice(i,1);
      }
    }
  }
  setTag(event){
      console.log(event)
      this.tagSelected = event;

  }
  addToGroup(contact){
      if(this.tagSelected!= null){
          var tagExist = false;
          var index = 0;
          for(var i in contact.groups){
              if(contact.groups[i].group == this.tagSelected.group){
                  tagExist = true;
                  index = i;
                  break;
              }
          }
          if(!tagExist){
            contact.groups.push(this.tagSelected);
          }
          else{
              contact.groups.splice(index,1);
          }
      }
  }
  mouseDown(e){
    console.log("mouseDOWN:");

    this.mouseX = e.screenX;
    this.mouseY = e.screenY;
    console.log(this.mouseX);
    console.log(this.mouseY);
  }
  mouseUp(e){
    this.mouseOffsetX = e.screenX - this.mouseX;
    this.mouseOffsetY = e.screenY - this.mouseY;
    console.log("mouseUP:");
    console.log(e.mouseOffsetX);
    console.log(e.mouseOffsetY);

  }
  addContact(e){
    console.log(e.mouseEvent.target);
    var zoomMultiplier = 1;
    if(this.zoom == 0) zoomMultiplier = 1;
    else zoomMultiplier = this.zoom;
    if(!e.dragData.hasDropped){


      this.addToGroup(e.dragData);
      var itemInfo = e.dragData;
      if(e.mouseEvent.path[0].id == "dropbox"){

        itemInfo.offsetX =  e.mouseEvent.offsetX/zoomMultiplier;
        itemInfo.offsetY = e.mouseEvent.offsetY/zoomMultiplier;
      } else {
        itemInfo.offsetX = itemInfo.offsetX + ((e.mouseEvent.screenX - this.mouseX))/zoomMultiplier;
        itemInfo.offsetY = itemInfo.offsetY + ((e.mouseEvent.screenY - this.mouseY))/zoomMultiplier;
      }
      console.log(itemInfo.offsetX);
      console.log(itemInfo.offsetY);
      itemInfo.hasDropped = true;
      this.selected.push(Object.assign({}, itemInfo));
    } else {
      var itemInfo = e.dragData;
      if(e.mouseEvent.path[0].id == "dropbox"){
        itemInfo.offsetX =  e.mouseEvent.offsetX/zoomMultiplier;
        itemInfo.offsetY = e.mouseEvent.offsetY/zoomMultiplier;
      } else {
        itemInfo.offsetX = itemInfo.offsetX + ((e.mouseEvent.screenX - this.mouseX))/zoomMultiplier;
        itemInfo.offsetY = itemInfo.offsetY + ((e.mouseEvent.screenY - this.mouseY))/zoomMultiplier;
      }
      console.log(itemInfo.offsetX);
      console.log(itemInfo.offsetY);
      for (var i in this.selected) {
        if (this.selected[i] == e) {
          this.selected.splice(i, 1);
          this.selected.push(Object.assign({}, itemInfo));
        }
      }
    }

  }

  nextQues(){
      console.log(this.currentQues)
      if(this.currentQues < this.tagsArray.length - 1){
          this.currentQues++;
          this.tagSelected = this.tagsArray[this.currentQues];
      }
      else if(this.currentQues == this.tagsArray.length - 1){
          this.currentQues = -1;
          this.currentGroup = 'arrange';
          this.tagSelected = null;
      }
  }
  addColor(obj,e){
      if(e=='background' && obj.symbol=='tagCircle' || obj.symbol=='tagSquare'){
          return obj.color;
      }
      else if(e=='triangle'){
          return obj.color
      }
      else{
          return '';
      }
  }
  showContactsNotInGroup(contact){
    var contactInGroup = false;
    if(this.tabSelected=='tags'&&this.tagSelected!=null){
      contact.groups.forEach((obj)=>{
          if(this.tagSelected.group == obj.group){
              contactInGroup = true;
          }
      })
      if(!contactInGroup){
          return '#ccc';
      }
      else{
          return '#fff';
      }
    }
  }
}
