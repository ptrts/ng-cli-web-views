import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProfileComponent} from './profile.component';
import {ProfileCanActivateGuard} from './profile-can-activate.guard';
import {Route} from '@angular/router';

export const PROFILE_ROUTE: Route = {
  path: 'profile',
  component: ProfileComponent,
  canActivate: [ProfileCanActivateGuard]
};

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ProfileComponent,
  ],
  providers: [
    ProfileCanActivateGuard,
  ]
})
export class ProfileModule {
}
