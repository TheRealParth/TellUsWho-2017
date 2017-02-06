import {Injectable} from '@angular/core';

@Injectable()
export class MiniProfileService {
  localState  = {
    dob: false,
    nationality: false,
    live: false,
    nativeLanguage: false,
    studentType: false,
    majors: false,
    currentCity: false,
    currentState: false,
    currentCountry: false,
    campusHousing: false,
    onCampus: false,
    interests: false,
    graduate: false,
    fullTime: false,
    ethnicity: false,
  }

  constructor() {
  }
  get age(){
    if(!this.dob) return false;
    let birthday = new Date(this.dob);
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    var age = Math.abs(ageDate.getUTCFullYear() - 1970)
    return (age > 1 && age < 140) ? age : false ;
  }
  get dob(){
    return this.localState.dob;
  }
  set dob(value) {
    this.localState.dob = value;
  }
  get nationality(){
    return this.localState.nationality;
  }
  set nationality(value: string) {
    this.localState.nationality = value;
  }
  get live(){
    if(this.localState.onCampus)
    if (this.localState.onCampus == "Off Campus" && this.localState.currentCity){
      if(this.localState.currentState) {
        return this.localState.currentCity + ', ' + this.localState.currentState;
      } else {
        return this.localState.currentCity
      }
    } else if (this.localState.onCampus == "On Campus"){
      return this.localState.campusHousing;
    } else {
      return false;
    }
  }
  get nativeLanguage(){
    return this.localState.nativeLanguage;
  }
  set nativeLanguage(value) {
    this.localState.nativeLanguage = value;
  }
  set onCampus(value) {
    this.localState.onCampus = value;
  }
  set campusHousing(value) {
    this.localState.campusHousing = value;
  }
  set currentCity(value) {
    this.localState.currentCity = value;
  }
  set currentState(value) {
    this.localState.currentState = value;
  }
  set currentCountry(value) {
    this.localState.currentCountry = value;
  }
  set graduate(value) {
    this.localState.graduate = value;

  }
  get graduate(){
    this.localState.graduate;
  }
  set fullTime(value){
    this.localState.fullTime = value;
  }
  get fullTime(){
    return this.localState.fullTime;
  }
  get studentType() {
    if(!this.localState.graduate) return false;
    if(!this.localState.fullTime) return false;
    return this.localState.fullTime + ' ' + this.localState.graduate;
  }
  get majors(){
    return this.localState.majors;
  }
  set majors(value) {
    this.localState.majors = value;
  }
  get interests(){
    return this.localState.interests;
  }
  set interests(value) {
    if(!this.localState.interests) this.localState.interests = [];
    value.forEach((item)=>{this.localState.interests.push(item.value) });
    console.log(this.interests)
  }
  get ethnicity() {
    return this.localState.ethnicity;
  }
  set ethnicity(value) {
    this.localState.ethnicity = value;
  }

}
