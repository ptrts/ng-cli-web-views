import {NgModule} from '@angular/core';
import {CacheMemoryStorage, CacheService, CacheStorageAbstract} from 'ng2-cache';
import {CacheObservableService} from './cache-observable.service';

@NgModule({
  providers: [
    {
      provide: CacheStorageAbstract,
      useClass: CacheMemoryStorage
    },
    CacheService,
    CacheObservableService
  ]
})
export class CacheModule {
}
