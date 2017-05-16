import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router';
import {CookieService} from 'angular2-cookie/core';
import {TextMaskModule} from 'angular2-text-mask';
import {CacheModule} from './common/cache/cache.module';
import {ModalModule} from './common/components/modal/modal.module';
import {DefaultEmptyCheckerWorker} from './common/forms/empty-checker/default-empty-checker-worker.directive';
import {EmptyCheckerGroup} from './common/forms/empty-checker/group-empty-checker.directive';
import {LeafEmptyChecker} from './common/forms/empty-checker/leaf-empty-checker.directive';
import {AppCheckboxRequiredValidator} from './common/forms/inputs/checkbox/checkbox-required-validator.directive';
import {OurCheckboxComponent} from './common/forms/inputs/checkbox/checkbox.component';
import {DateTextMaskService} from './common/forms/inputs/date/date-text-mask.service';
import {DateValidator} from './common/forms/inputs/date/date-validator.directive';
import {TextMaskEmptyCheckerWorker} from './common/forms/inputs/default-text-mask/text-mask-empty-checker-worker.directive';
import {DefaultTextMaskValidator} from './common/forms/inputs/default-text-mask/text-mask-validator.directive';
import {DefaultTextMaskService} from './common/forms/inputs/default-text-mask/text-mask.service';
import {PhoneTextMaskService} from './common/forms/inputs/phone/phone-text-mask.service';
import {PhoneValidator} from './common/forms/inputs/phone/phone-validator.directive';
import {TextEmptyCheckerWorker} from './common/forms/inputs/text/default-empty-checker-worker.directive';
import {ValidationMessageComponentModule} from './common/forms/validation/validation-message-component/validation-message.component';
import {ErrorComponent} from './pages/error/error.component';
import {LoginCanActivateGuard} from './pages/login/login-can-activate.guard';
import {LoginComponent} from './pages/login/login.component';
import {MainComponent} from './pages/main/main.component';
import {ProfileCanActivateGuard} from './pages/profile/profile-can-activate.guard';
import {ProfileComponent} from './pages/profile/profile.component';
import {RegistrationStep1CanActivateGuard} from './pages/registration/step-1/registration-step-1-can-activate.guard';
import {
  RegistrationStep1Component,
  VerificationCodeDirective
} from './pages/registration/step-1/registration-step-1.component';
import {RegistrationStep2CanActivateGuard} from './pages/registration/step-2/registration-step-2-can-activate.guard';
import {AddressFormGroup, RegistrationStep2Component} from './pages/registration/step-2/registration-step-2.component';
import {RegistrationStep3CanActivateGuard} from './pages/registration/step-3/registration-step-3-can-activate.guard';
import {RegistrationStep3Component} from './pages/registration/step-3/registration-step-3.component';
import {OurBackend} from './server/backend/our-backend';
import {OurServerApi} from './server/our-server-api';
import {AccessRestrictedModule} from './pages/access-denied/access-restricted.module';
import {HomeModule} from './pages/home/home.module';

const ROUTES: Routes = [
  HomeModule.ROUTE,
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginCanActivateGuard]
  },
  {
    path: 'reg1',
    component: RegistrationStep1Component,
    canActivate: [RegistrationStep1CanActivateGuard]
  },
  {
    path: 'reg2',
    component: RegistrationStep2Component,
    canActivate: [RegistrationStep2CanActivateGuard]
  },
  {
    path: 'reg3',
    component: RegistrationStep3Component,
    canActivate: [RegistrationStep3CanActivateGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [ProfileCanActivateGuard]
  },
  {
    path: 'error',
    component: ErrorComponent
  },
  AccessRestrictedModule.ROUTE,
  {
    path: '',
    pathMatch: 'full',
    redirectTo: HomeModule.ROUTE.path
  },
  {
    path: '**',
    redirectTo: 'error'
  }
];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(ROUTES),
    TextMaskModule,
    ValidationMessageComponentModule,
    CacheModule,
    ModalModule,
    AccessRestrictedModule,
    HomeModule
  ],
  declarations: [
    RegistrationStep1Component,
    RegistrationStep2Component,
    RegistrationStep3Component,
    MainComponent,
    ErrorComponent,
    OurCheckboxComponent,
    DefaultEmptyCheckerWorker,
    TextEmptyCheckerWorker,
    TextMaskEmptyCheckerWorker,
    DateValidator,
    DefaultTextMaskValidator,
    PhoneValidator,
    AppCheckboxRequiredValidator,
    ProfileComponent,
    LeafEmptyChecker,
    EmptyCheckerGroup,
    AddressFormGroup,
    LoginComponent,
    VerificationCodeDirective
  ],
  providers: [
    CookieService,
    OurBackend,
    OurServerApi,
    DefaultTextMaskService,
    DateTextMaskService,
    PhoneTextMaskService,
    RegistrationStep1CanActivateGuard,
    RegistrationStep2CanActivateGuard,
    RegistrationStep3CanActivateGuard,
    ProfileCanActivateGuard,
    LoginCanActivateGuard,
  ],
  bootstrap: [MainComponent]
})
export class AppModule {
}
