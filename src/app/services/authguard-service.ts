import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import {Router, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import { Injectable }     from '@angular/core';
import { CanActivate }    from '@angular/router';
import {AuthService} from "./auth.service";
import {NavigatorService} from "./navigator.service";
import {ProgressService} from "./progress.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private navService: NavigatorService, private progress: ProgressService, private authService: AuthService, private router: Router){
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.authenticated ) {
      if(state.url.length>1)
      this.navService.initRoute = state.url;

      return true;
    } else {

      console.log('AuthGuard#canActivate called');
      // Store the attempted URL for redirecting
      // this.authService.redirectUrl = state.url;
      // Navigate to the login page
      console.log(state.url)
      this.navService.initRoute = state.url;
      this.router.navigateByUrl('')

      return false;
    }

  }
}
