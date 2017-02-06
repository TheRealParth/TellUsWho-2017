import { List, Map } from 'immutable';

export class Interest {
  _data: Map<string, any>;

  get id() {
    return <string> this._data.get('id');
  }

  get answers() {
      return this._data.get('answers');
  }
  set answers(val) {
    return new Interest(this._data.set('answers', val));
  }
  get shortName() {
    return this._data.get('shortName');
  }
  get name() {
    return this._data.get('name');
  }
  get title() {
    return this._data.get('question');
  }

  get options(){
    return this._data.get('options');
  }
  set update(value){
    return new Interest(this._data.get.set(value));
  }
  set answers(value) {
    return new Interest(this._data.set('answers', value));
  }

  get completed() {
    return <boolean> this._data.get('completed');
  }
  set completed(value: boolean) {
    return new Interest(this._data.set('completed', value));
  }

  get removed() {
    return <boolean> this._data.get('removed');
  }
  set removed(value: boolean) {
    return new Interest(this._data.set('removed', value));
  }


  constructor(data: any = undefined) {
    data = data || {shortName: '', name: '', title: '',placeholder: '', answers: [{category: '', value: []}], completed: false, removed: false, options: false};
    this._data = Map<string, any>(data);
  }
}
