import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
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

const ROUTES: Routes = [
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
    OurCheckboxComponent
  ],
  providers: [
    CookieService,
    OurBackend,
    OurServerApi
  ],
  bootstrap: [MainComponent]
})
export class AppModule {
}
