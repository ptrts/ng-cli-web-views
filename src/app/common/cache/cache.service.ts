import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {CacheService} from 'ng2-cache';

@Injectable()
export class OurCacheService {

  constructor(private cacheService: CacheService) { }

  getCachedObservable<T>(key: string, maxAgeSeconds: number, getObservableMethod: (...any) => Observable<T>, thisArg: any, ...argArray: any[]) {

    console.log('thisArg = ' + thisArg);

    // Сначала пытаемся взять значение из кеша
    let cachedValue: T = this.cacheService.get(key);
    if (cachedValue !== null) {
      return Observable.of(cachedValue);
    }

    console.log('thisArg = ' + thisArg);

    let observableFromMethod = getObservableMethod.call(thisArg, ...argArray);

    console.log('thisArg = ' + thisArg);

    return observableFromMethod
      .do(valueFromObservable => {
        // Значение, которое вылезет из Observable мы закешируем
        this.cacheService.set(key, valueFromObservable, {maxAge: maxAgeSeconds});
      });
  }

  getCached<T>(key: string, maxAgeSeconds: any, getMethod: (...any) => T, thisArg: any, ...argArray: any[]) {

    // Сначала пытаемся взять значение из кеша
    let cachedValue: T = this.cacheService.get(key);
    if (cachedValue !== null) {

      console.log('Закешировано = ' + cachedValue);

      return cachedValue;
    }

    console.log('Ничего не закешировано, вызываем метод');

    let valueFromMethod = getMethod.call(thisArg, ...argArray);

    console.log('Метод вернул = ' + valueFromMethod);

    this.cacheService.set(key, valueFromMethod, {maxAge: maxAgeSeconds});

    return valueFromMethod;
  }
}
