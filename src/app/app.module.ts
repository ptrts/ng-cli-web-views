import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router';
import {CookieService} from 'angular2-cookie/core';
import {OurCheckboxComponent} from './common/forms/inputs/checkbox/checkbox.component';
import {ErrorComponent} from './pages/error/error.component';
import {HomeComponent} from './pages/home/home.component';
import {MainComponent} from './pages/main/main.component';
import {RangeSliderComponent} from './common/components/range-slider/range-slider.component';
import {RegistrationStep1Component} from './pages/registration/step-1/registration-step-1.component';
import {OurBackend} from './server/backend/our-backend';
import {SessionStatusComponent} from './server/backend/session-status/session-status.component';
import {OurServerApi} from './server/our-server-api';
import {DecimalGroupsSeparatorPipe} from './common/utils/decimal-groups-separator.pipe';
import {TextMaskModule} from 'angular2-text-mask';
import {DateTextMaskService} from './common/forms/inputs/date/date-text-mask.service';
import {DefaultEmptyCheckerDirective} from './common/forms/inputs/text/default-empty-checker.directive';
import {DateEmptyCheckerDirective} from './common/forms/inputs/date/date-empty-checker.directive';
import {PhoneTextMaskService} from './common/forms/inputs/phone/phone-text-mask.service';
import {PhoneEmptyCheckerDirective} from './common/forms/inputs/phone/phone-empty-checker.directive';
import {ValidationMessageService} from './common/forms/validation/validation-message.service';
import {DateValidatorDirective} from './common/forms/inputs/date/date-validator.directive';
import {ValidationMessageComponentModule} from './common/forms/validation/validation-message-component/validation-message.component';

const ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: RegistrationStep1Component
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'reg1',
    component: RegistrationStep1Component
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: '**',
    component: ErrorComponent
  }
];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(ROUTES),
    TextMaskModule,
    ValidationMessageComponentModule
  ],
  declarations: [
    HomeComponent,
    RangeSliderComponent,
    DecimalGroupsSeparatorPipe,
    SessionStatusComponent,
    RegistrationStep1Component,
    MainComponent,
    ErrorComponent,
    OurCheckboxComponent,
    DefaultEmptyCheckerDirective,
    DateEmptyCheckerDirective,
    PhoneEmptyCheckerDirective,
    DateValidatorDirective,
  ],
  providers: [
    CookieService,
    OurBackend,
    OurServerApi,
    DateTextMaskService,
    PhoneTextMaskService,
    ValidationMessageService,
  ],
  bootstrap: [MainComponent]
})
export class AppModule {
}
