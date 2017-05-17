import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AccessRestrictedComponent} from './access-restricted.component';
import {Route} from '@angular/router';

export const ACCESS_RESTRICTED_ROUTE: Route = {
  path: 'restricted',
    component: AccessRestrictedComponent
};

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    AccessRestrictedComponent
  ],
  exports: [
    AccessRestrictedComponent
  ]
})
export class AccessRestrictedModule {
}
