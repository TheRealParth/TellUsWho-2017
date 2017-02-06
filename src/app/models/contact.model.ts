import { List, Map } from 'immutable';

export class Contact {
  _data: Map<string, any>;

  get id() {
    return <string> this._data.get('id');
  }

  get firstName() {
    return this._data.get('firstName');
  }
  set firstName(val) {
    return new Contact(this._data.set('firstName', val));
  }
  get lastName() {
    return this._data.get('lastName');
  }
  set lastName(val) {
    return new Contact(this._data.set('lastName', val));
  }
  get name(){
    return this.firstName + ' ' + this.lastName;
  }
  get phone() {
    return this._data.get('phone');
  }
  set phone(val){
    return new Contact(this._data.set('phone', val));
  }
  get email() {
    return this._data.get('email');
  }
  set email(val){
    return new Contact(this._data.set('email', val));
  }
  get imageUrl(){
    return this._data.get('imageUrl');
  }


  constructor(data: any = undefined) {
    data = data || {firstName: '', lastName: '', phone: '', email: '', imageUrl: '../img/profilepic.jpg'};
    this._data = Map<string, any>(data);
  }
}
