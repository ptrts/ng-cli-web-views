import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {OurCheckboxComponent} from './checkbox.component';
import {AppCheckboxRequiredValidator} from './checkbox-required-validator.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    OurCheckboxComponent,
    AppCheckboxRequiredValidator
  ],
  exports: [
    OurCheckboxComponent,
    AppCheckboxRequiredValidator
  ]
})
export class CheckboxModule { }
