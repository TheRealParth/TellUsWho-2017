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
export class NoAuthGuard implements CanActivate {
  constructor(private navService: NavigatorService, private authService: AuthService, private router: Router){
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log(this.authService.authenticated)
    if (this.authService.authenticated ) {
      console.log('noauth garb')
      this.router.navigateByUrl(['/sense-of-community'])
      return false;
    } else {

      // Store the attempted URL for redirecting
      // this.authService.redirectUrl = state.url;
      // Navigate to the login page
      // this.navService.initRoute = state.url;
      return true;
    }

  }
}
