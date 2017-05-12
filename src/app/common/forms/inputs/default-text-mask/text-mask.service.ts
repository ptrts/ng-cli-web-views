import {Injectable} from '@angular/core';
import {conformToMask} from 'angular2-text-mask';

@Injectable()
export class DefaultTextMaskService {

  constructor() {}

  private conform(value: string, conf: any) {
    return conformToMask(value, conf.mask, {}).conformedValue;
  }

  isEmpty(inputValue: string, conf: any) {
    return inputValue === this.conform('', conf) || inputValue === '';
  }
}
