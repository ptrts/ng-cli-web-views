import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router';
import {CookieService} from 'angular2-cookie/core';
import {CacheModule} from './modules/global-services/cache/cache.module';
import {ModalModule} from './modules/global-services/modal/modal.module';
import {ACCESS_RESTRICTED_ROUTE, AccessRestrictedModule} from './modules/pages/access-denied/access-restricted.module';
import {ERROR_ROUTE, ErrorModule} from './modules/pages/error/error.module';
import {HOME_ROUTE, HomeModule} from './modules/pages/home/home.module';
import {LOGIN_ROUTE, LoginModule} from './modules/pages/login/login.module';
import {PROFILE_ROUTE, ProfileModule} from './modules/pages/profile/profile.module';
import {
  REGISTRATION_STEP_1_ROUTE,
  RegistrationStep1Module
} from './modules/pages/registration/step-1/registration-step-1.module';
import {
  REGISTRATION_STEP_2_ROUTE,
  RegistrationStep2Module
} from './modules/pages/registration/step-2/registration-step-2.module';
import {
  REGISTRATION_STEP_3_ROUTE,
  RegistrationStep3Module
} from './modules/pages/registration/step-3/registration-step-3.module';
import {OurBackend} from './server/backend/our-backend';
import {OurServerApi} from './server/our-server-api';
import {MainComponent} from './main.component';

const ROUTES: Routes = [
  HOME_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_STEP_1_ROUTE,
  REGISTRATION_STEP_2_ROUTE,
  REGISTRATION_STEP_3_ROUTE,
  PROFILE_ROUTE,
  ERROR_ROUTE,
  ACCESS_RESTRICTED_ROUTE,
  {
    path: '',
    pathMatch: 'full',
    redirectTo: HOME_ROUTE.path
  },
  {
    path: '**',
    redirectTo: ERROR_ROUTE.path
  }
];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    CacheModule,
    ModalModule,

    // Страницы
    HomeModule,
    RegistrationStep1Module,
    RegistrationStep2Module,
    RegistrationStep3Module,
    ProfileModule,
    LoginModule,
    AccessRestrictedModule,
    ErrorModule,
  ],
  declarations: [
    MainComponent,
  ],
  providers: [
    CookieService,
    OurBackend,
    OurServerApi,
  ],
  bootstrap: [MainComponent]
})
export class AppModule {
}
