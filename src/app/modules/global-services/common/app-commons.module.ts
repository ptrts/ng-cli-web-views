import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DecimalGroupsSeparatorPipe} from './pipes/decimal-groups-separator.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DecimalGroupsSeparatorPipe
  ],
  exports: [
    DecimalGroupsSeparatorPipe
  ]
})
export class AppCommonsModule { }
