import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router';
import {CookieService} from 'angular2-cookie/core';
import {CacheModule} from '../../common/cache/cache.module';
import {ModalModule} from '../../common/components/modal/modal.module';
import {ValidationMessageComponentModule} from '../../common/forms/validation/validation-message-component/validation-message.component';
import {AccessRestrictedModule} from '../../pages/access-denied/access-restricted.module';
import {ErrorModule} from '../../pages/error/error.module';
import {HomeModule} from '../../pages/home/home.module';
import {LoginModule} from '../../pages/login/login.module';
import {MainComponent} from './main.component';
import {OurBackend} from '../../server/backend/our-backend';
import {OurServerApi} from '../../server/our-server-api';
import {RegistrationStep1Module} from '../../pages/registration/step-1/registration-step-1.module';
import {RegistrationStep2Module} from '../../pages/registration/step-2/registration-step-2.module';
import {RegistrationStep3Module} from '../../pages/registration/step-3/registration-step-3.module';
import {ProfileModule} from '../../pages/profile/profile.module';

const ROUTES: Routes = [
  HomeModule.ROUTE,
  LoginModule.ROUTE,
  RegistrationStep1Module.ROUTE,
  RegistrationStep2Module.ROUTE,
  RegistrationStep3Module.ROUTE,
  ProfileModule.ROUTE,
  ErrorModule.ROUTE,
  AccessRestrictedModule.ROUTE,
  {
    path: '',
    pathMatch: 'full',
    redirectTo: HomeModule.ROUTE.path
  },
  {
    path: '**',
    redirectTo: ErrorModule.ROUTE.path
  }
];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(ROUTES),
    ValidationMessageComponentModule,
    CacheModule,
    ModalModule,
    AccessRestrictedModule,
    HomeModule,
    ErrorModule,
    LoginModule,
    RegistrationStep1Module,
    RegistrationStep2Module,
    RegistrationStep3Module,
    ProfileModule,
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
