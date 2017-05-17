import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {Route} from '@angular/router';
import {CheckboxModule} from '../../../page-elements/checkbox/checkbox.module';
import {EmptyCheckerModule} from '../../../page-elements/empty-checker/empty-checker.module';
import {DateTextMaskModule} from '../../../page-elements/text-mask/date/date-text-mask.module';
import {DefaultTextMaskModule} from '../../../page-elements/text-mask/default/default-text-mask.module';
import {PhoneTextMaskModule} from '../../../page-elements/text-mask/phone/phone-text-mask.module';
import {ValidationMessageComponentModule} from '../../../page-elements/validation-message-component/validation-message.component';
import {RegistrationStep1CanActivateGuard} from './registration-step-1-can-activate.guard';
import {RegistrationStep1Component} from './registration-step-1.component';

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
