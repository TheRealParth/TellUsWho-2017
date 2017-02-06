import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {NavigatorService} from "../services/navigator.service";

@Component({
  selector: 'no-content',
  template: `
 <div class="barFix">
          
        <div id="main" style="background-color: rgba(0,0,0,0); margin-top: 15%">
         <h1>404: Page Not Found</h1>        
         <p style="font-size: 1.2em">Page either does not exist or was taken down.</p>
         <br>
         <a (click)="goBack()">Go back</a>
        </div>
        
  </div>
  `
})
export class NoContent {
    constructor(private navServ: NavigatorService, private authService: AuthService, private router: Router){

    }
    goBack(){
      if(this.authService.authenticated)
      this.router.navigateByUrl(this.navServ.currentPage);
      else
        this.router.navigateByUrl('')
    }
}
