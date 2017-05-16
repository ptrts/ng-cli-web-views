import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {EnumRadioGroupComponent} from './components/enum-radio-group/enum-radio-group.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    EnumRadioGroupComponent
  ],
  exports: [
    EnumRadioGroupComponent
  ]
})
export class DebugModule { }
