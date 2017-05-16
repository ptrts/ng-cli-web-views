import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ErrorComponent} from './error.component';
import {Route} from '@angular/router';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ErrorComponent
  ],
  exports: [
    ErrorComponent
  ]
})
export class ErrorModule {
  static readonly ROUTE: Route = {
    path: 'error',
    component: ErrorComponent
  };
}
