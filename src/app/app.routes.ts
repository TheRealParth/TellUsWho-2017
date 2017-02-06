import { Routes } from '@angular/router';
import { HomeComponent } from './home';
import { AboutComponent } from './about';
import { NoContentComponent } from './no-content';

import { DataResolver } from './app.resolver';
import { WebpackAsyncRoute } from '@angularclass/webpack-toolkit';
import { RouterConfig } from '@angular/router';
import { NoContent } from './no-content';

import { DataResolver } from './app.resolver';
import {BackgroundInfoComponent} from "./basicInfo/backgroundInfo.component";
import {SchoolAndWorkComponent} from "./basicInfo/schoolAndWork.component";
import {SociabilityComponent} from "./basicInfo/sociability.component";
import {SenseOfCommunityComponent} from "./basicInfo/senseOfCommunity.component";
import {WellbeingComponent} from "./basicInfo/wellbeing.component";
import {InterestsComponent} from "./interests/interests.component";
import {ExpertiseComponent} from "./interests/levelOfExpertise.component";
import {PassionComponent} from "./interests/levelOfPassion.component";
import {WillingToTeachComponent} from "./interests/willingToTeach.component";
import {LookingForOthersComponent} from "./interests/lookingForOthers.component";
import {PlacesComponent} from "./interests/places.component";
import {AuthGuard} from "./services/authguard-service";
import {LandingPage} from "./landingpage";
import {Login} from "./auth/login";
import {SignUp} from "./auth/signup";
import {Forgot} from "./auth/forgot";
import {Routey} from './models/routey.enum.ts';
import {NoAuthGuard} from "./services/no-authguard-service";
import {GroupComponent} from "./interests/group.component";
import {GroupMethodComponent} from "./interests/groupMethod.component";
import {ProfileComponent} from "./profile/profile";
import {SocialComponent} from "./social/social.component";

export const ROUTES: Routes = [
  {
    path: Routey.name(Routey.LandingPage),
    component: LandingPage,
    canActivate: [NoAuthGuard]
  },
  {
    path: Routey.name(Routey.BackgroundInfo),
    component: BackgroundInfoComponent ,
    canActivate: [AuthGuard],
  },
  {
    path: Routey.name(Routey.Profile),
    component: ProfileComponent ,
    canActivate: [AuthGuard],
  },
  {
    path: Routey.name(Routey.SchoolAndWork),
    component: SchoolAndWorkComponent,
    canActivate: [AuthGuard]
  },
  {
    path: Routey.name(Routey.Sociability),
    component: SociabilityComponent,
    canActivate: [AuthGuard]
  },
  {
    path: Routey.name(Routey.SenseOfCommunity),
    component: SenseOfCommunityComponent,
    canActivate: [AuthGuard]
  },
  {
    path: Routey.name(Routey.Wellbeing),
    component: WellbeingComponent,
    canActivate: [AuthGuard]
  },
  {
    path: Routey.name(Routey.Interests),
    component: InterestsComponent,
    canActivate: [AuthGuard]
  },

  {
    path: Routey.name(Routey.Passion),
    component: PassionComponent,
    canActivate: [AuthGuard]
  },
  {
    path: Routey.name(Routey.Expertise),
    component: ExpertiseComponent,
    canActivate: [AuthGuard]
  },
  {
    path: Routey.name(Routey.WillingToTeach),
    component: WillingToTeachComponent,
    canActivate: [AuthGuard]
  },
  {
    path: Routey.name(Routey.Group),
    component: GroupComponent,
    canActivate: [AuthGuard]
  },
  {
    path: Routey.name(Routey.GroupMethod),
    component: GroupMethodComponent,
    canActivate: [AuthGuard]
  },
  {
    path: Routey.name(Routey.Places),
    component: PlacesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: Routey.name(Routey.LookingForOthers),
    component: LookingForOthersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: Routey.name(Routey.Social),
    component: SocialComponent,
    canActivate: [AuthGuard]
  },
  {
    path: Routey.name(Routey.BackgroundInfo),
    component: PlacesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: Routey.name(Routey.Login),
    component: Login,
    canActivate: [NoAuthGuard]
  },
  {
    path: Routey.name(Routey.Signup),
    component: SignUp,
    canActivate: [NoAuthGuard]
  },
  {
    path: Routey.name(Routey.Forgot),
    component: Forgot,
    canActivate: [NoAuthGuard]
  },
  { path: '',
    redirectTo: 'welcome',
    pathMatch: 'full',
    canActivate: [NoAuthGuard],
  },


  { path: '**',    component: NoContent },
];




// Es6PromiseLoader and AsyncRoutes interfaces are defined in custom-typings
