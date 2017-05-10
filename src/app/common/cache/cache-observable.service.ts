import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {CacheService} from 'ng2-cache';

@Injectable()
export class CacheObservableService {

  constructor(private cacheService: CacheService) { }

  getCached<T>(key: string, maxAgeSeconds: number, getObservableMethod: (...any) => Observable<T>, thisArg?: any) {

    // Сначала пытаемся взять значение из кеша
    let cachedValue: T = this.cacheService.get(key);
    if (cachedValue !== null) {
      return Observable.of(cachedValue);
    }

    return getObservableMethod(thisArg)
      .do(valueFromObservable => {
        // Значение, которое вылезет из Observable мы закешируем
        this.cacheService.set(key, valueFromObservable, {maxAge: maxAgeSeconds});
      });
  }
}
