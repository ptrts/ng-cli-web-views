import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {Route} from '@angular/router';
import {LoginCanActivateGuard} from './login-can-activate.guard';
import {LoginComponent} from './login.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ValidationMessageComponentModule} from '../../common/forms/validation/validation-message-component/validation-message.component';
import {DefaultTextMaskModule} from '../../_modules/default-text-mask/default-text-mask.module';
import {EmptyCheckerModule} from '../../_modules/empty-checker/empty-checker.module';
import {PhoneTextMaskModule} from '../../_modules/phone-text-mask/phone-text-mask.module';

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

 static readonly ROUTE: Route = {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginCanActivateGuard]
  };
}
