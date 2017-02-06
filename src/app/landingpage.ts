import {Component, Inject} from '@angular/core';
import {AuthService} from "./services/auth.service";
import {Router} from "@angular/router";

@Component({
  moduleId: module.id,
  selector: 'app',
  template: `
      <div class="barFix">    
        <div id="main" class="auth">
          <div class="welcome" style="padding:10px;font-size:14px;">    
            <p>
                <b>TellUsWho is a social networking survey tool that enables researchers to study the issues being faced by current mobile social matching systems which aim to bring people together in the physical world. This is part of a bigger research initiative that aims to extend our understanding of opportunistic social matching systems that by recommend interesting or relevant people nearby when the opportunity arises. <br><br>
                Participants of this study will be asked to first fill out an extensive personal profile and then install a mobile matching app prototype. This app presents users with (initially hypothetical) match recommendations with interesting or relevant people nearby using data collected in TellUsWho and collect valuable feedback on people’s context-dependent match preferences.<br>
                TellUsWho is currently piloted and not yet open to the public. If you want to learn more about our NSF-funded research project go to connectionslab.org</b>
            
           </p>
            <button (click)="signup()" id="navigator" style="margin-left:500px">Start</button><br>
            <a  style="margin-left:500px" (click)="router.navigateByUrl('login')">Already registered? Login</a>
          </div>
        </div>
      </div>
      `,
})
export class LandingPage {
  phone: string;
  constructor(private authService: AuthService, private router: Router) {
    this.router = router;
  }
  signup(){
    // if(this.phone!=undefined && this.phone.length >= 9){
      this.router.navigateByUrl('signup')
    //} 
     
  }
  // hideError(){
  //   this.showError = false;
  // }
  // keyupHandler(e){
  //   if(e.keyCode == 13) {
  //     this.loginWithApi(this.email, this.password);
  //   }
  // }
  // login(){
  //   this.authService.loginWithApi(this.email, this.password);
  // }
}
