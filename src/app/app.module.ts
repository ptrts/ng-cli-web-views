import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router';
import {CookieService} from 'angular2-cookie/core';
import {TextMaskModule} from 'angular2-text-mask';
import * as moment from 'moment';
import {CacheModule} from './common/cache/cache.module';
import {ModalModule} from './common/components/modal/modal.module';
import {RangeSliderComponent} from './common/components/range-slider/range-slider.component';
import {AppCheckboxRequiredValidator} from './common/forms/inputs/checkbox/checkbox-required-validator.directive';
import {OurCheckboxComponent} from './common/forms/inputs/checkbox/checkbox.component';
import {DateEmptyCheckerDirective} from './common/forms/inputs/date/date-empty-checker.directive';
import {DateTextMaskService} from './common/forms/inputs/date/date-text-mask.service';
import {DateValidatorDirective} from './common/forms/inputs/date/date-validator.directive';
import {PhoneEmptyCheckerDirective} from './common/forms/inputs/phone/phone-empty-checker.directive';
import {PhoneTextMaskService} from './common/forms/inputs/phone/phone-text-mask.service';
import {PhoneValidatorDirective} from './common/forms/inputs/phone/phone-validator.directive';
import {DefaultEmptyCheckerDirective} from './common/forms/inputs/text/default-empty-checker.directive';
import {EnumRadioGroupComponent} from './common/forms/radio/enum-radio-group.component';
import {ValidationMessageComponentModule} from './common/forms/validation/validation-message-component/validation-message.component';
import {DecimalGroupsSeparatorPipe} from './common/utils/decimal-groups-separator.pipe';
import {AccessRestrictedComponent} from './pages/access-denied/access-restricted.component';
import {ErrorComponent} from './pages/error/error.component';
import {HomeComponent} from './pages/home/home.component';
import {MainComponent} from './pages/main/main.component';
import {RegistrationStep1CanActivateGuard} from './pages/registration/step-1/registration-step-1-can-activate.guard';
import {RegistrationStep1Component} from './pages/registration/step-1/registration-step-1.component';
import {RegistrationStep2CanActivateGuard} from './pages/registration/step-2/registration-step-2-can-activate.guard';
import {RegistrationStep2Component} from './pages/registration/step-2/registration-step-2.component';
import {RegistrationStep3CanActivateGuard} from './pages/registration/step-3/registration-step-3-can-activate.guard';
import {RegistrationStep3Component} from './pages/registration/step-3/registration-step-3.component';
import {OurBackend} from './server/backend/our-backend';
import {OurServerApi} from './server/our-server-api';
import {ProfileComponent} from './pages/profile/profile.component';
import {ProfileCanActivateGuard} from './pages/profile/profile-can-activate.guard';
import {DefaultTextMaskService} from './common/forms/inputs/default-text-mask/text-mask.service';
import {DefaultTextMaskEmptyCheckerDirective} from './common/forms/inputs/default-text-mask/text-mask-empty-checker.directive';
import {DefaultTextMaskValidatorDirective} from './common/forms/inputs/default-text-mask/text-mask-validator.directive';

const ROUTES: Routes = [
  {
    path: 'home',
    component: HomeComponent
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
  {
    path: 'restricted',
    component: AccessRestrictedComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
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
  ],
  declarations: [
    HomeComponent,
    RangeSliderComponent,
    DecimalGroupsSeparatorPipe,
    RegistrationStep1Component,
    RegistrationStep2Component,
    RegistrationStep3Component,
    MainComponent,
    ErrorComponent,
    OurCheckboxComponent,
    DefaultEmptyCheckerDirective,
    DefaultTextMaskEmptyCheckerDirective,
    DateEmptyCheckerDirective,
    PhoneEmptyCheckerDirective,
    DateValidatorDirective,
    DefaultTextMaskValidatorDirective,
    EnumRadioGroupComponent,
    AccessRestrictedComponent,
    PhoneValidatorDirective,
    AppCheckboxRequiredValidator,
    ProfileComponent,
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
  ],
  bootstrap: [MainComponent]
})
export class AppModule {
}

console.log(`
=========================================================================
moment.utc([1980, 12 - 1, 31]).toDate()            = ${moment.utc([1980, 12 - 1, 31]).toDate()}
moment.utc([1980, 12 - 1, 31]).utc().toDate()      = ${moment.utc([1980, 12 - 1, 31]).utc().toDate()}
moment.utc([1980, 12 - 1, 31]).utc(true).toDate()  = ${moment.utc([1980, 12 - 1, 31]).utc(true).toDate()}
moment.utc([1980, 12 - 1, 31]).utc(false).toDate() = ${moment.utc([1980, 12 - 1, 31]).utc(false).toDate()}

moment([1980, 12 - 1, 31]).toDate()            = ${moment([1980, 12 - 1, 31]).toDate()}
moment([1980, 12 - 1, 31]).utc().toDate()      = ${moment([1980, 12 - 1, 31]).utc().toDate()}
moment([1980, 12 - 1, 31]).utc(true).toDate()  = ${moment([1980, 12 - 1, 31]).utc(true).toDate()}
moment([1980, 12 - 1, 31]).utc(false).toDate() = ${moment([1980, 12 - 1, 31]).utc(false).toDate()}

moment([1980, 12 - 1, 31]).utcOffset(3, true).toDate() = ${moment([1980, 12 - 1, 31]).utcOffset(3, true).toDate()}
=========================================================================
`);
