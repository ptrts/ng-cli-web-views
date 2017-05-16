import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {AddressFormGroup, RegistrationStep2Component} from './registration-step-2.component';
import {DefaultTextMaskModule} from '../../../_modules/default-text-mask/default-text-mask.module';
import {Route} from '@angular/router';
import {RegistrationStep2CanActivateGuard} from './registration-step-2-can-activate.guard';
import {ValidationMessageComponentModule} from '../../../common/forms/validation/validation-message-component/validation-message.component';
import {EmptyCheckerModule} from '../../../_modules/empty-checker/empty-checker.module';

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

  static readonly ROUTE: Route = {
    path: 'reg2',
    component: RegistrationStep2Component,
    canActivate: [RegistrationStep2CanActivateGuard]
  };
}
