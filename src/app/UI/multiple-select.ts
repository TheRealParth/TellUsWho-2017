import {Component, EventEmitter, Input, Output, OnInit, ElementRef} from '@angular/core';


@Component({
  selector: "multiple-select",
  template: `
         <div class="awesomplete triangle">

          <div class="tags-box">
           <span>
           <span class="no-highlight" style="border-radius: 3px; display: inline-flex; justify-content: space-between; width: auto; overflow: hidden;"
           *ngFor="let choice of chosen; let i = index; ">
              <span style="max-width: 80px; white-space: nowrap;overflow: hidden;text-overflow:ellipsis;" > {{choice}} </span>
            <svg (click)="removeTag(i)" class ="closeButton" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 84 84" style="enable-background:new 0 0 84 84;" xml:space="preserve" width="512px" height="512px">
            <g>
              <g>
                <path d="M42,0C18.803,0,0,18.807,0,42c0,23.197,18.803,42,42,42c23.193,0,42-18.803,42-42    C84,18.807,65.193,0,42,0z M50.643,42l15.303,15.302l-8.643,8.642L42.002,50.643L26.699,65.944l-8.641-8.642L33.359,42    l-15.3-15.298l8.641-8.646L42,33.357l15.301-15.299l8.643,8.641L50.643,42z" fill="#FFFFFF"/>
              </g>
            </g>
            </svg>

           </span>
           </span>

         <input  [ngStyle]="{'width': 550 - (chosen.length * 100) + 'px'}"
                *ngIf="chosen.length < 5"
                [attr.placeholder]="placeholder"
                (keyup)="filter($event); "
                (focus)="active = true; filter($event);  "
                (blur)="checkBlur(true); "
                [(ngModel)]="multiinput"

                class="dropdown-input"  autocomplete="off" aria-autocomplete="list">
         </div>
         <div class="ddHolder" [hidden]="!canOpen()">
         <ul >
          <li *ngFor="let result of results; let i = index;" (mouseenter)="activeIndex=i" [class.active]="i == activeIndex" (mousedown)="choose($event.target.innerText); multiinput = ''">
            {{result}}
          </li>
        </ul>
        </div>
        </div>

        <button (mousedown)="checkBlur(false);" class="dropdown-btn" style="top: 38px; right: 2px;" type="button"><span class="caret"></span></button>
`,
})


export class MultipleSelect implements OnInit{
  state: any;

  active: boolean = false;
  results: string[];
  multiinput: string = "";
  activeIndex: number = 0;
  @Input('oldChoice') chosen: string[] =  [];

  @Input('placeholder') placeholder: string;
  @Input('options') options: string[];
  @Output() onChosen = new EventEmitter<any>();
  @Output() setDefaults = new EventEmitter<string>();
  constructor(private _eref: ElementRef) {

  }
  removeTag(i){
    this.chosen.splice(i, 1);
    this.onChosen.emit(this.chosen);
    console.log("remove")
  }

  arrowDown(event){
    if(this.multiinput.length == 0) {
      if (event.keyCode == 8) {
        this.results.push(this.chosen.pop());
        this.onChosen.emit(this.chosen);
        this.results.sort();
      }
    }
    else if(event.keyCode ==40){
      if((this.activeIndex < this.results.length -1) && (this.results.length > 0))
      { this.activeIndex++}
    }
    else if(event.keyCode == 38){
      if((this.activeIndex > 0) && (this.results.length > 0))
      { this.activeIndex--}
    }
  }



  checkBlur(isBlur){
    if(isBlur)
    {
      this.active = false;
    }
    else if(!isBlur)
    {
      this.active = !this.active;
    }

  }

  canOpen(){
    return (this.active && this.results.length > 0);
  }

  ngOnInit() {
    this.setDefaults.emit('nothing');
    console.log("stuff")
    this.results = this.options;
  }



  filter(event){
    if(event.keyCode == 13 ) {
      if(this.results.length) {
        this.choose(this.results[this.activeIndex]);
      }
    }
    if(this.multiinput) {
      this.results = [];
      for (var i = 0; i < this.options.length; i++) {
        if(this.options[i].toLowerCase().indexOf(this.multiinput.toLowerCase()) > -1){
          if(this.chosen.indexOf(this.options[i]) > -1){ continue;}
          this.activeIndex = 0;
          this.results.push(this.options[i]);
        }
      }
    } else {
      this.results = this.options;
      for(let i in this.chosen){
        this.results.splice(this.results.indexOf(this.chosen[i]),1);
      }
    }
  }
  choose(target){
    if(!this.checkRepeat(target) && this.chosen.length < 5) {
      this.chosen.push(target)
      this.onChosen.emit(this.chosen);
    }
  }

  checkRepeat(target){
    var temp = false;
    for(var x in this.chosen){
      if(target == this.chosen[x]){
        temp = true;
      }
    }
    return temp;
  }



}
