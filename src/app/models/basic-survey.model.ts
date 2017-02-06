export class Survey{
  constructor(questions, localState){
    this.localState = localState;
  }
  answer(q){
   return this.questions.answer(q).subscribe((data)=>{if(data.value) this.localState[q] = data.value});
  }
  setAnswer(q, a){
    this.questions.setAnswer(q, a).then((stuff)=> {this.localState[q] = a});
  }
  answers(q){
   return this.questions.answers(q).subscribe((data)=>{if(data){
      this.localState[q] = [];
      data.forEach(item=>this.localState[q].push(item.value));
    }});
  }
  setAnswers(q, a){
    if(this.localState[q] != a || this.localState[q].length == 0 || this.localState[q].length != a)
      return this.questions.setAnswers(q, a).subscribe((data)=>{})
  }
  nextPage(){
    //run field checks here
    this.navigator.next();
    window.scroll(0,0);
  }
}
