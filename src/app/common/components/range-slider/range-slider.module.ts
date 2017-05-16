import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RangeSliderComponent} from './range-slider.component';
import {AppCommonsModule} from '../../module/app-commons.module';

@NgModule({
  imports: [
    CommonModule,
    AppCommonsModule
  ],
  declarations: [
    RangeSliderComponent
  ],
  exports: [
    RangeSliderComponent
  ]
})
export class RangeSliderModule { }
