import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {DefaultTextMaskModule} from '../../../_modules/default-text-mask/default-text-mask.module';
import {DateTextMaskModule} from '../../../_modules/date-text-mask/date-text-mask.module';
import {RegistrationStep3Component} from './registration-step-3.component';
import {Route} from '@angular/router';
import {RegistrationStep3CanActivateGuard} from './registration-step-3-can-activate.guard';
import {ValidationMessageComponentModule} from '../../../common/forms/validation/validation-message-component/validation-message.component';
import {EmptyCheckerModule} from '../../../_modules/empty-checker/empty-checker.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DefaultTextMaskModule,
    DateTextMaskModule,
    EmptyCheckerModule,
    ValidationMessageComponentModule,
  ],
  declarations: [
    RegistrationStep3Component,
  ],
  exports: [
    RegistrationStep3Component,
  ],
  providers: [
    RegistrationStep3CanActivateGuard,
  ]
})
export class RegistrationStep3Module {

  static readonly ROUTE: Route = {
    path: 'reg3',
    component: RegistrationStep3Component,
    canActivate: [RegistrationStep3CanActivateGuard]
  };
}
