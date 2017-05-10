import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router';
import {CookieService} from 'angular2-cookie/core';
import {TextMaskModule} from 'angular2-text-mask';
import {CacheModule} from './common/cache/cache.module';
import {RangeSliderComponent} from './common/components/range-slider/range-slider.component';
import {OurCheckboxComponent} from './common/forms/inputs/checkbox/checkbox.component';
import {DateEmptyCheckerDirective} from './common/forms/inputs/date/date-empty-checker.directive';
import {DateTextMaskService} from './common/forms/inputs/date/date-text-mask.service';
import {DateValidatorDirective} from './common/forms/inputs/date/date-validator.directive';
import {PhoneEmptyCheckerDirective} from './common/forms/inputs/phone/phone-empty-checker.directive';
import {PhoneTextMaskService} from './common/forms/inputs/phone/phone-text-mask.service';
import {DefaultEmptyCheckerDirective} from './common/forms/inputs/text/default-empty-checker.directive';
import {EnumRadioGroupComponent} from './common/forms/radio/enum-radio-group.component';
import {ValidationMessageComponentModule} from './common/forms/validation/validation-message-component/validation-message.component';
import {ValidationMessageService} from './common/forms/validation/validation-message.service';
import {DecimalGroupsSeparatorPipe} from './common/utils/decimal-groups-separator.pipe';
import {ErrorComponent} from './pages/error/error.component';
import {HomeComponent} from './pages/home/home.component';
import {MainComponent} from './pages/main/main.component';
import {RegistrationStep1Component} from './pages/registration/step-1/registration-step-1.component';
import {OurBackend} from './server/backend/our-backend';
import {OurServerApi} from './server/our-server-api';
import {RegistrationStep1CanActivateGuard} from './pages/registration/step-1/registration-step-1-can-activate.guard';

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
    path: 'error',
    component: ErrorComponent
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
    CacheModule
  ],
  declarations: [
    HomeComponent,
    RangeSliderComponent,
    DecimalGroupsSeparatorPipe,
    RegistrationStep1Component,
    MainComponent,
    ErrorComponent,
    OurCheckboxComponent,
    DefaultEmptyCheckerDirective,
    DateEmptyCheckerDirective,
    PhoneEmptyCheckerDirective,
    DateValidatorDirective,
    EnumRadioGroupComponent,
  ],
  providers: [
    CookieService,
    OurBackend,
    OurServerApi,
    DateTextMaskService,
    PhoneTextMaskService,
    ValidationMessageService,
    RegistrationStep1CanActivateGuard,
  ],
  bootstrap: [MainComponent]
})
export class AppModule {
}
