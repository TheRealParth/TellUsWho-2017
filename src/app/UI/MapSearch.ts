import {Component} from '@angular/core';
import {GoogleplaceDirective} from '../angular2-google-map-auto-complete/directives/googleplace.directive'
import {Output} from "@angular/core";
import {EventEmitter} from "@angular/core";
@Component({
  selector : 'map-search',
  directives: [GoogleplaceDirective],
  template:  `
           <input type="text" [(ngModel)] = "address"  (setAddress) = "getAddress($event)" googleplace/>
           `
})
export class MapSearch {
  @Output() onSelect =  new EventEmitter<string>();
  public address : Object;
  getAddress(place:Object) {
    this.address = place['formatted_address'];
    var location = place['geometry']['location'];
    var lat =  location.lat();
    var lng = location.lng();
    console.log(place)
    this.onSelect.emit(this.address);
  }
}
