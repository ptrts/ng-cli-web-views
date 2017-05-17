import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PhoneTextMaskValidator} from './phone-text-mask-validator.directive';
import {PhoneTextMaskService} from './phone-text-mask.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    PhoneTextMaskValidator,
  ],
  exports: [
    PhoneTextMaskValidator,
  ],
  providers: [
    PhoneTextMaskService
  ]
})
export class PhoneTextMaskModule { }
