import {Injectable} from '@angular/core';
import {conformToMask} from 'angular2-text-mask';

@Injectable()
export class PhoneTextMaskService {

  readonly conf = {
    mask: [
      '(',
      /\d/,
      /\d/,
      /\d/,
      ')',
      ' ',
      /\d/,
      /\d/,
      /\d/,
      '-',
      /\d/,
      /\d/,
      '-',
      /\d/,
      /\d/,
    ],
    showMask: true
  };

  private emptyInputValue: string;

  constructor() {
    this.emptyInputValue = this.conform('');
  }

  private conform(value: string) {
    return conformToMask(value, this.conf.mask, {}).conformedValue;
  }

  fromInputValue(inputValue: string) {
    return inputValue.replace(/^\d/, '');
  }

  toInputValue(value: string) {
    return this.conform(value);
  }

  isEmpty(inputValue: string) {
    return inputValue == this.emptyInputValue || inputValue == '';
  }
}
