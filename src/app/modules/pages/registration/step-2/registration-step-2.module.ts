import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {AddressFormGroup, RegistrationStep2Component} from './registration-step-2.component';
import {Route} from '@angular/router';
import {RegistrationStep2CanActivateGuard} from './registration-step-2-can-activate.guard';
import {DefaultTextMaskModule} from '../../../page-elements/text-mask/default/default-text-mask.module';
import {EmptyCheckerModule} from '../../../page-elements/empty-checker/empty-checker.module';
import {ValidationMessageComponentModule} from '../../../page-elements/validation-message-component/validation-message.component';

export const REGISTRATION_STEP_2_ROUTE: Route = {
  path: 'reg2',
  component: RegistrationStep2Component,
  canActivate: [RegistrationStep2CanActivateGuard]
};

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DefaultTextMaskModule,
    EmptyCheckerModule,
    ValidationMessageComponentModule,
  ],
  declarations: [
    RegistrationStep2Component,
    AddressFormGroup
  ],
  exports: [
    RegistrationStep2Component
  ],
  providers: [
    RegistrationStep2CanActivateGuard,
  ]
})
export class RegistrationStep2Module {
}
