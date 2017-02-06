import {QuestionsService} from "../services/questions-service";
export class Field {
  id: number;
  name: string;
  plural: boolean;
  value: any;
  constructor(id: number, name: string, plural: boolean = false, private questions: QuestionsService){
    this.id=id;
    this.name = name;
    this.plural = plural;
  }
  answer(){
    this.questions.answer(this.name).subscribe((data)=>{if(data.value) this.answer = data.value});
    return this.answer;
  }
  setAnswer(q, a){
    this.questions.setAnswer(q, a).then((stuff)=> {this.localState[q] = a});
  }

  answers(q){
    this.questions.answers(q).subscribe((data)=>{if(data){
      this.localState[q] = [];
      data.forEach(item=>this.localState[q].push(item.value));
    }});

  }
  setAnswers(q, a){
    if(this.localState[q] != a || this.localState[q].length == 0 || this.localState[q].length != a)
      this.questions.setAnswers(q, a).subscribe((data)=>{})

    //
  }
}
