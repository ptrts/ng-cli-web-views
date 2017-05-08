import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router';
import {CookieService} from 'angular2-cookie/core';
import {OurCheckboxComponent} from './checkbox/checkbox.component';
import {ErrorComponent} from './error/error.component';
import {HomeComponent} from './home/home.component';
import {MainComponent} from './main/main.component';
import {RangeSliderComponent} from './range-slider/range-slider.component';
import {RegistrationStep1Component} from './registration/step-1/registration-step-1.component';
import {OurBackend} from './server/backend/our-backend';
import {SessionStatusComponent} from './server/backend/session-status/session-status.component';
import {OurServerApi} from './server/our-server-api';
import {DecimalGroupsSeparatorPipe} from './utils/decimal-groups-separator.pipe';
import {TextMaskModule} from 'angular2-text-mask';
import {ReactiveFormComponent} from './reactive-form/reactive-form.component';
import {DateTextMaskService} from './date-text-mask.service';
import {DefaultEmptyCheckerDirective} from './default-empty-checker.directive';
import {DateEmptyCheckerDirective} from './date-empty-checker.directive';
import {PhoneTextMaskService} from './phone-text-mask.service';
import {PhoneEmptyCheckerDirective} from './phone-empty-checker.directive';
import { DateValidator } from './date-validator.directive';

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
    TextMaskModule
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
    ReactiveFormComponent,
    DefaultEmptyCheckerDirective,
    DateEmptyCheckerDirective,
    PhoneEmptyCheckerDirective,
    DateValidator
  ],
  providers: [
    CookieService,
    OurBackend,
    OurServerApi,
    DateTextMaskService,
    PhoneTextMaskService
  ],
  bootstrap: [MainComponent]
})
export class AppModule {
}
