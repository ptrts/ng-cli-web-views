import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {RegistrationStep1Component} from './registration-step-1.component';
import {Route} from '@angular/router';
import {RegistrationStep1CanActivateGuard} from './registration-step-1-can-activate.guard';
import {ValidationMessageComponentModule} from '../../../common/forms/validation/validation-message-component/validation-message.component';
import {DefaultTextMaskModule} from '../../../_modules/default-text-mask/default-text-mask.module';
import {DateTextMaskModule} from '../../../_modules/date-text-mask/date-text-mask.module';
import {CheckboxModule} from '../../../_modules/checkbox/checkbox.module';
import {EmptyCheckerModule} from '../../../_modules/empty-checker/empty-checker.module';
import {PhoneTextMaskModule} from '../../../_modules/phone-text-mask/phone-text-mask.module';

export const REGISTRATION_STEP_1_ROUTE: Route = {
  path: 'reg1',
  component: RegistrationStep1Component,
  canActivate: [RegistrationStep1CanActivateGuard]
};

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DefaultTextMaskModule,
    DateTextMaskModule,
    PhoneTextMaskModule,
    CheckboxModule,
    EmptyCheckerModule,
    ValidationMessageComponentModule,
  ],
  declarations: [
    RegistrationStep1Component
  ],
  exports: [
    RegistrationStep1Component
  ],
  providers: [
    RegistrationStep1CanActivateGuard
  ]
})
export class RegistrationStep1Module {
}
