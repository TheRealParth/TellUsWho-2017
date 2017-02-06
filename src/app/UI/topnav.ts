import {Component, ViewEncapsulation, Input, Output, EventEmitter} from '@angular/core';
import {NavigatorService} from "../services/navigator.service";
/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'nav',
  encapsulation: ViewEncapsulation.None,
  template: `
    <ul id = "topNav">
    
        <li [class.selected]="navigatorService.section == 0" class="topNavItem">
            <div [ngClass]="{complete: navigatorService.section > 0, active: navigatorService.section == 0}" class="circle">
                <h1 *ngIf="navigatorService.section == 0" >1</h1>
                <span class="glyphicon glyphicon-ok " *ngIf="navigatorService.section > 0"></span>
            </div>
            Scientific Survey
        </li>
            <div class="seperator">
                <li *ngIf="navigatorService.section == 0" class="topNavItem small-item">
                    <div  [ngClass]="{complete: navigatorService.itemCompleted > 0, active: navigatorService.itemCompleted == 0}" class="small-circle">
                    </div>
                    <span class="bubble">Community</span>                                        
                </li>
                <li *ngIf="navigatorService.section == 0" class="topNavItem small-item">
                    <div  [ngClass]="{complete: navigatorService.itemCompleted > 1, active: navigatorService.itemCompleted == 1}" class="small-circle">
                    </div>
                    <span class="bubble">Sociability</span>                    

                </li>  
                <li *ngIf="navigatorService.section == 0" class="topNavItem small-item">
                    <div  [ngClass]="{complete: navigatorService.itemCompleted > 2, active: navigatorService.itemCompleted == 2}" class="small-circle">
                    </div>
                    <span class="bubble">Wellbeing</span>                    

                </li>                                
            </div>
        <li [class.selected]="navigatorService.section == 1"  class="topNavItem">
            <div [ngClass]="{complete: navigatorService.section > 1, active: navigatorService.section == 1}" class="circle">
                <h1 *ngIf="navigatorService.section <= 1">2</h1>
                <span class="glyphicon glyphicon-ok " *ngIf="navigatorService.section > 1"></span>
            </div>
            Basic Info
        </li>    
        <div class="seperator">
                <li *ngIf="navigatorService.section == 1" class="topNavItem small-item">
                    <div  [ngClass]="{complete: navigatorService.itemCompleted > 3, active: navigatorService.itemCompleted == 3 }" class="small-circle">
                    </div>
                    <span class="bubble">Background Info</span>                    
                </li>
                <li *ngIf="navigatorService.section == 1" class="topNavItem small-item">
                    <div  [ngClass]="{complete: navigatorService.itemCompleted > 4, active: navigatorService.itemCompleted == 4}" class="small-circle">
                    </div>
                    <span class="bubble">School and Work</span>                    

                </li>
            </div>
        <li [class.selected]="navigatorService.section == 2"  class="topNavItem">
            <div [ngClass]="{complete: navigatorService.section > 2, active: navigatorService.section == 2}" class="circle">
                <h1 *ngIf="navigatorService.section <= 2">3</h1>
                <span class="glyphicon glyphicon-ok " *ngIf="navigatorService.section > 2"></span>
            </div>
            Interests
        </li>
            <div class="seperator">
                <li *ngIf="navigatorService.section == 2" class="topNavItem small-item">
                    <div  [ngClass]="{complete: navigatorService.itemCompleted > 5, active: navigatorService.itemCompleted == 5}" class="small-circle">
                    </div>
                    <span class="bubble">Your Interests</span>                                                            
                </li>
       
                <li *ngIf="navigatorService.section == 2"  class="topNavItem small-item">
                    <div  [ngClass]="{complete: navigatorService.itemCompleted > 6, active: navigatorService.itemCompleted == 6}" class="small-circle">
                    </div>
                    <span class="bubble">Passion Level</span>                                                            
                </li>    
                <li *ngIf="navigatorService.section == 2"  class="topNavItem small-item">
                    <div  [ngClass]="{complete: navigatorService.itemCompleted > 7, active: navigatorService.itemCompleted == 7}" class="small-circle">
                    </div>
                    <span class="bubble">Expertise Level</span>                                                            
                </li>
                
                <li *ngIf="navigatorService.section == 2"  class="topNavItem small-item">
                    <div  [ngClass]="{complete: navigatorService.itemCompleted > 8, active: navigatorService.itemCompleted == 8}" class="small-circle">
                    </div>
                    <span class="bubble">Willing to Teach</span>                                                            
                </li>
                <li *ngIf="navigatorService.section == 2"  class="topNavItem small-item">
                    <div  [ngClass]="{complete: navigatorService.itemCompleted > 9, active: navigatorService.itemCompleted == 9}" class="small-circle">
                    </div>
                    <span class="bubble">Activities in Groups</span>                                                            
                </li>
                <li *ngIf="navigatorService.section == 2"  class="topNavItem small-item">
                    <div  [ngClass]="{complete: navigatorService.itemCompleted > 10, active: navigatorService.itemCompleted == 10}" class="small-circle">
                    </div>
                    <span class="bubble">Group Method</span>                                                            
                </li>
                <li *ngIf="navigatorService.section == 2"  class="topNavItem small-item">
                    <div  [ngClass]="{complete: navigatorService.itemCompleted > 11, active: navigatorService.itemCompleted == 11}" class="small-circle">
                    </div>
                    <span class="bubble">Looking for Others</span>                                                            
                </li>
                <li *ngIf="navigatorService.section == 2"  class="topNavItem small-item">
                    <div  [ngClass]="{complete: navigatorService.itemCompleted > 12, active: navigatorService.itemCompleted == 12}" class="small-circle">
                    </div>
                    <span class="bubble">Places</span>                                                            
                </li>                
            </div>        
        <li [class.selected]="navigatorService.section == 3" class="topNavItem">
            <div [ngClass]="{complete: navigatorService.section > 3, active: navigatorService.section == 3}"  class="circle" >
                <h1 *ngIf="navigatorService.section <= 3">4</h1>
                <span class="glyphicon glyphicon-ok " *ngIf="navigatorService.section > 3"></span>                
            </div>
            Profile
        </li>
         <div class="seperator">
                <li *ngIf="navigatorService.section == 3" class="topNavItem small-item">
                    <div  [ngClass]="{complete: navigatorService.itemCompleted > 13, active: navigatorService.itemCompleted == 13}" class="small-circle">
                    </div>
                    <span class="bubble">Profile Review</span>                                                            
                </li>
         </div>       
         <li [class.selected]="navigatorService.section == 4" class="topNavItem">
            <div [ngClass]="{complete: navigatorService.section > 4, active: navigatorService.section == 4}"  class="circle" >
                <h1 *ngIf="navigatorService.section <= 4">5</h1>
                <span class="glyphicon glyphicon-ok " *ngIf="navigatorService.section > 4"></span>                
            </div>
            Social
        </li>
                 <div *ngIf="navigatorService.section == 4" class="seperator">
                <li *ngIf="navigatorService.section == 4" class="topNavItem small-item"  style="margin-left: 10px;">
                    <div  [ngClass]="{complete: navigatorService.itemCompleted > 14, active: navigatorService.itemCompleted == 14}" class="small-circle">
                    </div>
                    <span class="bubble">Contacts</span>                                                            
                </li>
                    <li *ngIf="navigatorService.section == 4" class="topNavItem small-item" style="    float: right;
    margin-left: 5px; margin-right: 0px;">
                    <div  [ngClass]="{complete: navigatorService.itemCompleted > 15, active: navigatorService.itemCompleted == 15}" class="small-circle">
                    </div>
                    <span class="bubble"></span>                                                            
                </li>
         </div>  
    </ul>
  `,
})

export class TopNav {

  constructor(private navigatorService: NavigatorService){

  }
}

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
