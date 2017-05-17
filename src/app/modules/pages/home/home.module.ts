import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeComponent} from './home.component';
import {Route} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {AppCommonsModule} from '../../global-services/common/app-commons.module';
import {RangeSliderModule} from '../../page-elements/range-slider/range-slider.module';
import {DebugModule} from '../../page-elements/debug/debug.module';

export const HOME_ROUTE: Route = {
  path: 'home',
  component: HomeComponent
};

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppCommonsModule,
    RangeSliderModule,
    DebugModule,
  ],
  declarations: [
    HomeComponent,
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule {
}
