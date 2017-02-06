import {Component,EventEmitter, Input, Output, OnInit, ElementRef} from '@angular/core';


@Component({
  selector: "autocomplete",
  host: {
    '(document:click)': 'onClick($event)',
  },
  template: `
         <div class="awesomplete triangle">

         <input
                [attr.placeholder]="placeholder"
                (keyup)="filter($event); "
                (keydown)="arrowDown($event)"
                (focus)="checkBlur(false); "
                (blur)="checkBlur(true);  throwBlur()"
                [value] = "currentVal"
                class="dropdown-input"  autocomplete="off" aria-autocomplete="list">

          <div class="ddHolder" [hidden]="!canOpen()">
         <ul >
          <li *ngFor="let result of results; let i = index;" [class.active]=" i == activeIndex " (mouseenter)="activeIndex=i"  (mousedown)="choose($event.target.innerText)">
            {{result}}
          </li>
        </ul>
        </div>

        <button (mousedown)="checkBlur(false);" class="dropdown-btn" type="button"><span class="caret"></span></button>
        </div>


`,
})


export class Autocomplete implements OnInit{
  state: any;
  chosen: string;
  clickable: boolean = true;
  active: boolean = false;
  results: string[];

  activeIndex: number = 0;
  @Input('oldChoice') currentVal: string;
  @Input('placeholder') placeholder: string;
  @Input('options') options: string[];
  @Output() onChosen = new EventEmitter<string>();
  @Output() onBlur = new EventEmitter<string>();
  constructor(private _eref: ElementRef) {

  }

  onClick(event) {
    if (!this._eref.nativeElement.contains(event.target)) // or some similar check
      this.active = false;
  }
  arrowDown(event){
      if(event.keyCode ==40){
      if((this.activeIndex < this.results.length -1) && (this.results.length > 0))
     { this.activeIndex++}
    }
    else if(event.keyCode == 38){
      if((this.activeIndex > 0) && (this.results.length > 0))
     { this.activeIndex--}
    }
  }


  throwBlur(){
    if(this.chosen==null){
      this.onBlur.emit(this.currentVal);
    }

    // var revert = true;
    // for(var x in this.options){
    //   if(this.options[x] == this.currentVal){
    //     revert = false;
    //   }
    // }

    // if(revert){
    //   this.currentVal = ""
    // }
  }
  checkBlur(isBlur){
    if(isBlur)
    {
      this.active = false;
    }
    else if(!isBlur)
    {
      if(!this.active) this.active = true;
    }

  }

  canOpen(){
    if(this.chosen) {
      if(this.chosen.length > 0)
      return this.active;
    }
    else if(this.results.length) return this.active;
  }

  ngOnInit() {

    this.results = this.options;

  }

  outsideClick(event){
    if (!this._eref.nativeElement.parentNode.contains(event.target)){
      this.active = false;
    } // or some similar check
  }

  filter(event){
    this.currentVal = event.target.value;
    if((event.keyCode == 8) && (!this.canOpen())) {
      this.chosen = null;

      if(this.currentVal = "")
        this.results = this.options;
    }
    if(event.keyCode == 13 ) {
      if(this.results.length) {
        this.choose(this.results[this.activeIndex]);
        this.currentVal = this.results[this.activeIndex];
      }
    }


    if(event.target.value) {
      this.results = [];
      for (var i = 0; i < this.options.length; i++) {
        if(this.options[i].toLowerCase().indexOf(event.target.value.toLowerCase()) > -1){
          this.results.push(this.options[i]);
        }
      }
      this.results.sort(function(a, b){
        return a.length - b.length;
      });
    } else {
      this.results = this.options;
    }
  }
  choose(target){
    this.checkBlur(true)
    if(this.chosen != target) {
      this.chosen = target;
      this.onChosen.emit(this.chosen);
      this.currentVal = target;
    }
  }
}
