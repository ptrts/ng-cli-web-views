import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RangeSliderComponent} from './range-slider.component';
import {AppCommonsModule} from '../../global-services/common/app-commons.module';

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
