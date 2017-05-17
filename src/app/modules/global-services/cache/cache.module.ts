import {NgModule} from '@angular/core';
import {CacheMemoryStorage, CacheService, CacheStorageAbstract} from 'ng2-cache';
import {OurCacheService} from './cache.service';

@NgModule({
  providers: [
    {
      provide: CacheStorageAbstract,
      useClass: CacheMemoryStorage
    },
    CacheService,
    OurCacheService
  ]
})
export class CacheModule {
}
