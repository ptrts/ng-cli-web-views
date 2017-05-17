import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {RegistrationStep3Component} from './registration-step-3.component';
import {Route} from '@angular/router';
import {RegistrationStep3CanActivateGuard} from './registration-step-3-can-activate.guard';
import {DefaultTextMaskModule} from '../../../page-elements/text-mask/default/default-text-mask.module';
import {DateTextMaskModule} from '../../../page-elements/text-mask/date/date-text-mask.module';
import {EmptyCheckerModule} from '../../../page-elements/empty-checker/empty-checker.module';
import {ValidationMessageComponentModule} from '../../../page-elements/validation-message-component/validation-message.component';

export const REGISTRATION_STEP_3_ROUTE: Route = {
  path: 'reg3',
  component: RegistrationStep3Component,
  canActivate: [RegistrationStep3CanActivateGuard]
};

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
}
