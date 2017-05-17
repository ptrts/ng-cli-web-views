import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DateTextMaskService} from './date-text-mask.service';
import {DateTextMaskValidator} from './date-text-mask-validator.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DateTextMaskValidator
  ],
  exports: [
    DateTextMaskValidator
  ],
  providers: [
    DateTextMaskService
  ]
})
export class DateTextMaskModule { }
