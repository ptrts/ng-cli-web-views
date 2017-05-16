import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeComponent} from './home.component';
import {Route} from '@angular/router';
import {RangeSliderModule} from '../../common/components/range-slider/range-slider.module';
import {AppCommonsModule} from '../../common/module/app-commons.module';
import {DebugModule} from '../../debug/debug.module';
import {FormsModule} from '@angular/forms';

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

  static readonly ROUTE: Route = {
    path: 'home',
    component: HomeComponent
  };
}
