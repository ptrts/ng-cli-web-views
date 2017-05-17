import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {Route} from '@angular/router';
import {LoginCanActivateGuard} from './login-can-activate.guard';
import {LoginComponent} from './login.component';
import {ReactiveFormsModule} from '@angular/forms';
import {DefaultTextMaskModule} from '../../page-elements/text-mask/default/default-text-mask.module';
import {PhoneTextMaskModule} from '../../page-elements/text-mask/phone/phone-text-mask.module';
import {EmptyCheckerModule} from '../../page-elements/empty-checker/empty-checker.module';
import {ValidationMessageComponentModule} from '../../page-elements/validation-message-component/validation-message.component';

export const LOGIN_ROUTE: Route = {
  path: 'login',
  component: LoginComponent,
  canActivate: [LoginCanActivateGuard]
};

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DefaultTextMaskModule,
    PhoneTextMaskModule,
    EmptyCheckerModule,
    ValidationMessageComponentModule,
  ],
  declarations: [
    LoginComponent,
  ],
  exports: [
    LoginComponent,
  ],
  providers: [
    LoginCanActivateGuard,
  ]
})
export class LoginModule {
}
