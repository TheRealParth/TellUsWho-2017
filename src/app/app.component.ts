import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import { AppState } from './app.service';
import {AngularFire, AngularFireAuth, FirebaseAuth} from 'angularfire2';
import {AuthService} from "./services/auth.service";
import { NavigatorService} from "./services/navigator.service";
import {TopNav} from "./UI/topnav";
import {MiniProfile} from "./UI/mini-profile.component";
import {Router} from "@angular/router";
import {MiniProfileService} from "./services/mini-profile.service";
import {ProfileService} from "./services/profile.service";

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  directives: [TopNav, MiniProfile],
  providers: [MiniProfileService],
  template: `
<div *ngIf="!authService.authenticated" id="noauth-topbar">
  <h1>TellUsWho</h1>
</div>
<span  *ngIf="appState.get('terms')" id="overlay"  class="terms">
<div id="form-header"><h1> Consent Form </h1></div>
<div id="form-body">
    <p>Thank you for participating in our research study. Please read below statement carefully</p>
    <p><b>DURATION:</b><br>This survey will take about 30 minutes to complete.</p>
    <p><b>PROCEDURE:</b><br>During this survey, the following will be asked:</p>
        <ol>
            <li>Register with your NJIT UCID and password. We will not store your password but use it to retrieve your name, birthday, etc…??? from NJIT.</li>
            <li>Basic  information, including demographics, personality and well being questionnaires, school/work information</li>
            <li>Personal interests and activities relating to sports, food & drinks, music, books, movies, religion and politics</li>
            <li>Follow-up questions revolving around understanding more about previously entered personal interests and social activities with respect to meeting new people.</li>
        </ol>
        <p>You must not reveal any criminal or illegal information during the study and are not protected by privilege.<br>
        The collected information will be only reviewed by the researchers conducting the study and that no third party entity will have access.</p>
        <p><b>RISKS/DISCOMFORTS:</b><br>
        I understand that the study described involves no known risk and/or discomforts.  There may be risks and discomforts that are not yet known.  I fully recognize that there are risks that I may be exposed to by volunteering in this study which are inherent in participating in any study; I understand that I am not covered by NJIT’s insurance policy for any injury or loss I might sustain in the course of participating in the study.</p>
        <p><b>CONFIDENTIALITY:</b><br>
        I understand confidential is not the same as anonymous.  Confidential means that my name will not be disclosed if there exists a documented linkage between my identity and my responses as recorded in the research records.  Every effort will be made to maintain the confidentiality of my study records.  If the findings from the study are published, I will not be identified by name.  My identity will remain confidential unless disclosure is required by law.</p>
        <p><b>PAYMENT FOR PARTICIPATION:</b><br>
        I have been told that I will receive $20.00 compensation for my participation in this study.</p>
        <p><b>RIGHT TO REFUSE OR WITHDRAW:</b><br>
        I understand that my participation is voluntary and I may refuse to participate, or may discontinue my participation at any time with no adverse consequence.  I also understand that the investigator has the right to withdraw me from the study at any time.</p>
        <p><b>INDIVIDUAL TO CONTACT:</b><br>
        If I have any questions about my treatment or research procedures, I understand that I should contact the principal investigator at</p>
        <table class="contact-table">
            <tr>
                <td style="padding:0 20px">Dr. Quentin Jones<br>
                    Department of Information Systems, NJIT<br>
                    University Heights, Newark NJ 07102<br>
                    Office: 5600 GITC<br>
                    732-221-6502<br>
                    qjones@njit.edu
                </td>
                <td style="padding:0 20px"> Julia Mayer<br>
                    Department of Information Systems, NJIT<br>
                    University Heights, Newark NJ 07102<br>
                    Office: 5600 GITC<br>
                    757-585-4219<br>
                    jam45@njit.edu
                </td>
            </tr>
        </table><br>
        <p>If I have any addition questions about my rights as a research subject, I may contact:<br>
        Judith Sheft, IRB Chair<br>
        New Jersey Institute of Technology<br>
        323 Martin Luther King Boulevard<br>
        Newark, NJ  07102<br>
        (973) 596-5825<br>
        sheft@njit.edu / irb@njit.edu</p>
        <p><b>CONSENT TO PARTICIPATE</b><br>
        I have read this entire form, or it has been read to me, and I understand it completely.  All of my questions regarding this form or this study have been answered to my complete satisfaction. </p>
</div>
<span (click)="appState.set('terms', false); appState.set('researchOverview', true);" id="navigator" style="margin-left:48%;">Continue</span>
</span>
<span  *ngIf="appState.get('researchOverview')" id="overlay"  class="research">
<div id="form-header"><h1> Research Overview</h1></div>
<div id="form-body">
<p>Your participation in TellUsWho will be done in four stages:</p>
<div>
<ol>
    <li>Scientific surveys to better understand how you feel about connecting with others on campus</li>
    <li>Profile creation for matching</li>
    <li>Answering questions about your contacts and who you do activities with so we do not match you with people you already know and help you coordinate with people you do know</li>
    <li>Use our mobile app to help you find other people on campus and coordinate with your friends</li>
</ol>
</div>
</div>
<span (click)="appState.set('researchOverview', false)" id="navigator" style="margin-left:48%;">Start</span>
</span>

<span  *ngIf="appState.get('isLoading')" id="loader"  class="loader">
<!-- By Sam Herbert (@sherb), for everyone. More @ http://goo.gl/7AJzbL -->
<div style="height: 100%; padding:20%;">
<svg width="100" height="100" viewBox="-1 -1 40 40" xmlns="http://www.w3.org/2000/svg" stroke="#4EADEF">
    <g fill="none" fill-rule="evenodd">
        <g transform="translate(1 1)" stroke-width="3">
            <circle stroke-opacity=".5" cx="18" cy="18" r="18"/>
            <path d="M36 18c0-9.94-8.06-18-18-18">
                <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0 18 18"
                    to="360 18 18"
                    dur="1s"
                    repeatCount="indefinite"/>
            </path>
        </g>
    </g>
</svg>
</div>
</span>

<div *ngIf="authService.authenticated" [class.blurry]="appState.get().isLoading" id="topbar">
    <nav ></nav>
    <div class="user-info">
    {{authService.email}}
    <a (click)="authService.logout()">Logout</a>
</div>
</div>
<div [class.blurry]="appState.get().isLoading">
<router-outlet></router-outlet>
<mini-profile *ngIf='navi.profileBuilder && authService.authenticated'></mini-profile>
</div>

  `,

})

export class AppComponent {
  constructor( private navi: NavigatorService, private appState: AppState, private authService: AuthService)
  {
    navi.naviDone.subscribe(thing=>{if(thing){
      this.appState.set('isLoading', false);
  }});
    this.appState.set('showModal', false);
    this.appState.set('terms', false);
    this.appState.set('researchOverview', false);
  }
  ngOnInit(){

  }
}

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
