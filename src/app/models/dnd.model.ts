import { OnDestroy}  from '@angular/core';


export class Dnd implements OnDestroy {
  page;
  localState;
  interests;
  interestRefs;

  constructor(page,localState, interests, interestRefs ){
    this.localState = localState;
    this.page = page;
    this.interests = interests;
    this.interestRefs = interestRefs;
  }
  unsub(){
    if(this.interestSub) this.interestSub.unsubscribe();
  }
  ngOnDestroy(){
    this.unsub();
  }
  putItem(category, event){
    this.unsub();
    if(!(this.localState[this.page][category].indexOf(event.dragData) > -1)){

      event.dragData[this.page] = category;
      this.saveToDb(event.dragData);
      this.localState[this.page][category].push(event.dragData);
      this.interests.splice(this.interests.indexOf(event.dragData),1)
    } else {
      this.localState[this.page][category].splice(this.localState[this.page][category].indexOf(event.dragData), 1)
    }
    // console.log(this.localState.passionate)
  }
  saveToDb(answer){
    this.unsub();
    var oldAnswers = this.interestRefs[answer.shortName];
    console.log(oldAnswers);
    oldAnswers[answer.index].value[answer.valIndex][this.page] = answer[this.page];
    this.interestService.saveAnswers(answer.shortName, oldAnswers).then((val)=>console.log(val));
  }
  removeItem(category, item){
    this.unsub();
    if(this.localState[this.page][category].indexOf(item) > -1) {
      item[this.page] = '';
      this.saveToDb(item);
      this.localState[this.page][category].splice(this.localState[this.page][category].indexOf(item), 1);
    }
    if(this.interests.indexOf(item) < 0){
      this.interests.push(item);
    }
  }

  nextPage(){
    //run field checks here
    this.navigator.next();
    window.scroll(0,0);
  }

}
